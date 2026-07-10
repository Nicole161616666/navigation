document.addEventListener('DOMContentLoaded', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        if (tab) {
            document.getElementById('link-title').value = tab.title || '';
            document.getElementById('link-url').value = tab.url || '';
        }
    });

    document.getElementById('link-form').addEventListener('submit', (e) => {
        e.preventDefault();
        addLink();
    });
});

function addLink() {
    const title = document.getElementById('link-title').value.trim();
    const url = document.getElementById('link-url').value.trim();
    const category = document.getElementById('link-category').value;
    const tags = document.getElementById('link-tags').value.trim();
    
    if (!title || !url) {
        alert('请填写完整信息');
        return;
    }
    
    chrome.storage.local.get('nav_url', (result) => {
        const navUrl = result.nav_url || 'http://localhost:8000/index.html';
        const encodedUrl = encodeURIComponent(url);
        const encodedTitle = encodeURIComponent(title);
        const encodedCategory = encodeURIComponent(category);
        const encodedTags = encodeURIComponent(tags);
        
        const fullUrl = `${navUrl}?action=add&url=${encodedUrl}&title=${encodedTitle}&category=${encodedCategory}&tags=${encodedTags}`;
        
        chrome.tabs.create({ url: fullUrl });
        window.close();
    });
}

function directAdd() {
    const title = document.getElementById('link-title').value.trim();
    const url = document.getElementById('link-url').value.trim();
    
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
            chrome.notifications.create({
                type: 'basic',
                iconUrl: 'icons/icon48.png',
                title: '资源中心导航',
                message: '已添加到资源中心'
            });
            window.close();
        });
    });
}

function closePopup() {
    window.close();
}