$htmlDirectoryPath = "C:\Users\abir\Desktop\baba rename\html-files" # replace with your actual directory path with html files
$csvFilePath = "C:\Users\abir\Desktop\baba rename\fileList.csv"  # Replace with your actual CSV file path

# Below part does not need to be changed

# Import the CSV file that contains the old and new names
$csvData = Import-Csv -Path $csvFilePath

foreach ($row in $csvData) {
    $oldPath = Join-Path -Path $htmlDirectoryPath -ChildPath $row.old
    $newPath = Join-Path -Path $htmlDirectoryPath -ChildPath $row.new

    if (Test-Path $oldPath) {
        Rename-Item -Path $oldPath -NewName $row.new
        Write-Host "Renamed: $($row.old) => $($row.new)"
    } else {
        Write-Host "File not found: $oldPath" -ForegroundColor Red
    }
}