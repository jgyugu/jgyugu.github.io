// js/common.js

// 当前页面是否在 posts/ 目录下
const IN_POSTS = window.location.pathname.includes('/posts/');
// 相对根目录的前缀：首页是 './'，文章页是 '../'
const ROOT = IN_POSTS ? '../' : './';

const SITE = {
    name: 'ethan_648ha的博客',
    footer: '© 2026 · GitHub Pages 搭建',
    github: 'https://github.com/jgyugu/jgyugu.github.io',  // ← 换成你的仓库地址
    postsDir: 'posts/',            // 文章 HTML 所在目录
    postsJson: 'posts/posts.json'  // 文章清单
};

// GitHub mark 图标（内联 SVG，不依赖外部资源）
const GITHUB_ICON = `
<svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
</svg>`;

// 注入 favicon（若 HTML 里没有手写）
function injectFavicon() {
    if (document.querySelector('link[rel~="icon"]')) return;
    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = ROOT + 'favicon.ico';
    link.sizes = 'any';
    document.head.appendChild(link);
}

// 渲染页脚
function renderFooter() {
    const footerEl = document.querySelector('footer');
    if (!footerEl) return;

    footerEl.innerHTML = `
        <p class="footer-inner">
            <span>${SITE.footer}</span>
            <a class="footer-icon"
               href="${SITE.github}"
               target="_blank"
               rel="noopener noreferrer"
               title="GitHub 仓库"
               aria-label="GitHub 仓库">${GITHUB_ICON}</a>
        </p>
    `;
}

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

// 尽早执行，别等 DOMContentLoaded
injectFavicon();

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

    // 2. 渲染页脚（含 GitHub 图标）
    renderFooter();

    // 3. 设置"返回首页"链接
    const backLink = document.querySelector('.back-link');
    if (backLink) {
        backLink.href = ROOT + 'index.html';
    }
});