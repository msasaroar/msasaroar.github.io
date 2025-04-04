document.addEventListener('DOMContentLoaded', async () => {
    const tabList = document.getElementById('tabList');
    const minInterval = document.getElementById('minInterval');
    const maxInterval = document.getElementById('maxInterval');
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const statusText = document.getElementById('statusText');
    const refreshCount = document.getElementById('refreshCount');
    const nextRefresh = document.getElementById('nextRefresh');
  
    // ট্যাব লিস্ট লোড করুন
    const tabs = await chrome.tabs.query({});
    tabs.forEach(tab => {
      const option = document.createElement('option');
      option.value = tab.id;
      option.text = tab.title.length > 30 ? tab.title.substring(0, 30) + '...' : tab.title;
      tabList.appendChild(option);
    });
  
    // স্টোরেজ থেকে স্ট্যাটাস লোড করুন
    const { isRunning, count } = await chrome.storage.local.get(['isRunning', 'count']);
    statusText.textContent = isRunning ? 'চালু' : 'বন্ধ';
    refreshCount.textContent = count || 0;
  
    // শুরু বাটন ক্লিক ইভেন্ট
    startBtn.addEventListener('click', async () => {
      const tabId = parseInt(tabList.value);
      const min = parseInt(minInterval.value);
      const max = parseInt(maxInterval.value);
  
      if (min >= max) {
        alert('সর্বোচ্চ বিরতি সর্বনিম্ন বিরতির চেয়ে বেশি হতে হবে');
        return;
      }
  
      await chrome.storage.local.set({
        isRunning: true,
        tabId,
        minInterval: min,
        maxInterval: max,
        count: 0
      });
  
      statusText.textContent = 'চালু';
      refreshCount.textContent = '0';
  
      chrome.runtime.sendMessage({ action: 'start', tabId, min, max });
    });
  
    // বন্ধ বাটন ক্লিক ইভেন্ট
    stopBtn.addEventListener('click', async () => {
      await chrome.storage.local.set({ isRunning: false });
      statusText.textContent = 'বন্ধ';
      chrome.runtime.sendMessage({ action: 'stop' });
    });
  
    // স্ট্যাটাস আপডেটের জন্য লিসেনার
    chrome.storage.onChanged.addListener((changes, namespace) => {
      if (changes.count) {
        refreshCount.textContent = changes.count.newValue;
      }
      if (changes.nextRefreshTime) {
        const timeLeft = Math.round((changes.nextRefreshTime.newValue - Date.now()) / 1000);
        nextRefresh.textContent = `${timeLeft} সেকেন্ড`;
      }
    });
  });