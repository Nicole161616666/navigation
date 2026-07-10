chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: 'add-to-nav',
        title: '添加到资源中心',
        contexts: ['page', 'link'],
        documentUrlPatterns: ['<all_urls>']
    });

    chrome.contextMenus.create({
        id: 'add-to-nav-direct',
        title: '添加到资源中心（直接保存）',
        contexts: ['page', 'link'],
        documentUrlPatterns: ['<all_urls>']
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    const url = info.linkUrl || tab.url;
    const title = info.linkText || tab.title;
    
    if (info.menuItemId === 'add-to-nav') {
        chrome.storage.local.get('nav_url', (result) => {
            const navUrl = result.nav_url || 'http://localhost:8000/index.html';
            openNavWithParams(navUrl, url, title);
        });
    } else if (info.menuItemId === 'add-to-nav-direct') {
        saveDirectly(url, title);
    }
});

function openNavWithParams(navUrl, url, title) {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const fullUrl = `${navUrl}?action=add&url=${encodedUrl}&title=${encodedTitle}`;
    
    chrome.tabs.create({ url: fullUrl });
}

function saveDirectly(url, title) {
    const newLink = {
        id: Date.now().toString(36) + Math.random().toString(36).substr(2),
        title: title || url,
        url: url,
        categoryId: '6',
        tags: [],
        favorite: false,
        createdAt: Date.now(),
        visitCount: 0,
        history: []
    };
    
    chrome.storage.local.get('team_nav_data', (result) => {
        let data = result.team_nav_data || { links: [], categories: [] };
        
        data.links.push(newLink);
        
        chrome.storage.local.set({ team_nav_data: data }, () => {
            showNotification('已添加到资源中心');
        });
    });
}

function showNotification(message) {
    chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/icon48.png',
        title: '资源中心导航',
        message: message
    });
}