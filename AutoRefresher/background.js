let refreshInterval;
let tickInterval;
let nextRefreshTime = 0;

// টিক টিক শব্দের জন্য নোটিফিকেশন দেখানো
function playTickSound() {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'icon.png',
    title: 'টিক টিক',
    message: '5 সেকেন্ড পাস হয়েছে',
    silent: true
  });
}

// রিফ্রেশ শিডিউল করুন
function scheduleRefresh(tabId, min, max) {
  if (refreshInterval) clearInterval(refreshInterval);
  
  const interval = Math.floor(Math.random() * (max - min + 1)) + min;
  nextRefreshTime = Date.now() + interval * 1000;
  
  chrome.storage.local.set({ nextRefreshTime });
  
  console.log(`পরবর্তী রিফ্রেশ ${interval} সেকেন্ড পরে, ${new Date(nextRefreshTime).toLocaleTimeString()} সময়ে`);
  
  refreshInterval = setTimeout(() => {
    refreshTab(tabId, min, max);
  }, interval * 1000);
  
  // কাউন্টডাউন আপডেট
  setInterval(() => {
    const timeLeft = Math.round((nextRefreshTime - Date.now()) / 1000);
    if (timeLeft <= 10) {
      chrome.action.setBadgeText({ text: timeLeft.toString() });
      chrome.action.setBadgeBackgroundColor({ color: '#FF0000' });
    }
    console.log(`রিফ্রেশ হতে বাকি: ${timeLeft} সেকেন্ড`);
  }, 1000);
}

// ট্যাব রিফ্রেশ করুন
async function refreshTab(tabId, min, max) {
  try {
    await chrome.tabs.reload(tabId);
    
    const { count = 0 } = await chrome.storage.local.get('count');
    await chrome.storage.local.set({ count: count + 1 });
    
    console.log(`ট্যাব রিফ্রেশ করা হয়েছে। মোট রিফ্রেশ: ${count + 1}`);
    
    scheduleRefresh(tabId, min, max);
  } catch (error) {
    console.error('রিফ্রেশ করতে সমস্যা:', error);
    chrome.storage.local.set({ isRunning: false });
  }
}

// মেসেজ হ্যান্ডলার
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'start') {
    chrome.storage.local.set({ isRunning: true });
    scheduleRefresh(message.tabId, message.min, message.max);
    
    // টিক টিক শব্দ শুরু করুন (প্রতি 5 সেকেন্ডে)
    if (tickInterval) clearInterval(tickInterval);
    tickInterval = setInterval(playTickSound, 5000);
    
  } else if (message.action === 'stop') {
    clearInterval(refreshInterval);
    clearInterval(tickInterval);
    chrome.action.setBadgeText({ text: '' });
    chrome.storage.local.set({ isRunning: false });
  }
});

// এক্সটেনশন ইনস্টল/আপডেট হলে
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ count: 0, isRunning: false });
});

// ব্রাউজার বন্ধ হলে বা এক্সটেনশন আনইন্সটল হলে ক্লিনআপ
chrome.runtime.onSuspend.addListener(() => {
  clearInterval(refreshInterval);
  clearInterval(tickInterval);
});