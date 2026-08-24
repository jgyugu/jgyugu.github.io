// js/common.js

const SITE = {
    name: 'ethan_648ha的博客',
    footer: '© 2026 · GitHub Pages 搭建',
    homeLink: '../index.html'  // 首页相对路径
};

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {

    // 1. 设置标题
    const titleEl = document.querySelector('title');
    if (titleEl) {
        const currentTitle = titleEl.textContent;
        if (currentTitle === SITE.name || currentTitle === '首页') {
            titleEl.textContent = SITE.name;
        }

        else if (!currentTitle.includes(SITE.name)) {
            titleEl.textContent = currentTitle + ' - ' + SITE.name;
        }
    }

    // 2. 设置页脚
    const footerEl = document.querySelector('footer p:last-child');
    if (footerEl) {
        footerEl.textContent = SITE.footer;
    }

    // 3. 设置"返回首页"链接（如果有）
    const backLink = document.querySelector('.back-link');
    if (backLink) {
        // 如果页面在 posts/ 目录下，返回首页是 ../index.html
        // 如果页面在根目录，返回首页是 ./index.html
        const path = window.location.pathname;
        if (path.includes('/posts/')) {
            backLink.href = '../index.html';
        }
    }
});
