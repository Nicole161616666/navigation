document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get(['nav_url', 'default_category'], (result) => {
        document.getElementById('nav-url').value = result.nav_url || 'http://localhost:8000/index.html';
        document.getElementById('default-category').value = result.default_category || '未分类';
    });
});

function saveOptions() {
    const navUrl = document.getElementById('nav-url').value.trim();
    const defaultCategory = document.getElementById('default-category').value.trim();
    
    chrome.storage.local.set({
        nav_url: navUrl,
        default_category: defaultCategory
    }, () => {
        const status = document.getElementById('status');
        status.classList.add('show');
        setTimeout(() => {
            status.classList.remove('show');
        }, 2000);
    });
}