// js/common.js

const SITE = {
    name: 'ethan_648ha的博客',
    footer: '© 2026 · GitHub Pages 搭建',
    postsDir: 'posts/',            // 文章 HTML 所在目录
    postsJson: 'posts/posts.json'  // 文章清单
};

// 渲染首页文章列表
async function renderPosts() {
    const listEl = document.querySelector('.post-list');
    if (!listEl) return;   // 文章页没有这个元素，直接跳过

    try {
        const res = await fetch(SITE.postsJson);
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const data = await res.json();

        // 按日期倒序（新的在上面）
        const posts = data.posts.sort((a, b) => b.date.localeCompare(a.date));

        listEl.innerHTML = posts.map(p => `
            <li>
                <a href="${SITE.postsDir}${p.file}">${p.title}</a>
                <span class="date">${p.date}</span>
            </li>
        `).join('');

    } catch (err) {
        listEl.innerHTML = '<li>文章列表加载失败，请检查 posts/posts.json</li>';
        console.error('加载文章列表失败：', err);
    }
}

document.addEventListener('DOMContentLoaded', function() {

    // 0. 渲染文章列表（仅首页）
    renderPosts();

    // 1. 设置标题
    const titleEl = document.querySelector('title');
    if (titleEl) {
        const currentTitle = titleEl.textContent;
        if (currentTitle === SITE.name || currentTitle === '首页') {
            titleEl.textContent = SITE.name;
        } else if (!currentTitle.includes(SITE.name)) {
            titleEl.textContent = currentTitle + ' - ' + SITE.name;
        }
    }

    // 2. 设置页脚
    const footerEl = document.querySelector('footer p:last-child');
    if (footerEl) {
        footerEl.textContent = SITE.footer;
    }

    // 3. 设置"返回首页"链接
    const backLink = document.querySelector('.back-link');
    if (backLink) {
        const path = window.location.pathname;
        if (path.includes('/posts/')) {
            backLink.href = '../index.html';
        }
    }
});