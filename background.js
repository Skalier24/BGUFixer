chrome.downloads.onDeterminingFilename.addListener((downloadItem, suggest) => {
  
  try {
    const originalBrokenString = downloadItem.filename;
    
    const decodedName = decodeFromCp1251(originalBrokenString); // Эту функцию нужно будет написать или найти

    const extension = originalBrokenString.substring(originalBrokenString.lastIndexOf('.'));
    const finalName = decodedName.substring(0, decodedName.lastIndexOf('.')) + extension;

    suggest({ filename: finalName, conflictAction: 'uniquify' });

  } catch (e) {
    console.error("Failed to decode filename:", e);
    suggest();
  }

  return true; 
});

function decodeFromCp1251(brokenString) {
    const bytes = new Uint8Array(brokenString.length);
    for (let i = 0; i < brokenString.length; i++) {
        bytes[i] = brokenString.charCodeAt(i);
    }
    const decoder = new TextDecoder('windows-1251'); 
    return decoder.decode(bytes);
}