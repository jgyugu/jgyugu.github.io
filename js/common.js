// js/common.js

// 当前页面是否在 posts/ 目录下
const IN_POSTS = window.location.pathname.includes('/posts/');
// 相对根目录的前缀：首页是 './'，文章页是 '../'
const ROOT = IN_POSTS ? '../' : './';

const SITE = {
    name: 'ethan_648ha的博客',
    footer: '© 2026 · GitHub Pages 搭建',
    github: 'https://github.com/jgyugu/jgyugu.github.io',
    bilibili: 'https://space.bilibili.com/3546691672213847',
    postsDir: 'posts/',
    postsJson: 'posts/posts.json'
};

// GitHub mark
const GITHUB_ICON = `
<svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
</svg>`;

// 哔哩哔哩（小电视）
const BILIBILI_ICON = `
<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.73252 2.67094C3.33229 2.28484 3.33229 1.64373 3.73252 1.25764C4.11291 0.890684 4.71552 0.890684 5.09591 1.25764L7.21723 3.30403C7.27749 3.36218 7.32869 3.4261 7.37081 3.49407H10.5789C10.6211 3.4261 10.6723 3.36218 10.7325 3.30403L12.8538 1.25764C13.2342 0.890684 13.8368 0.890684 14.2172 1.25764C14.6175 1.64373 14.6175 2.28484 14.2172 2.67094L13.364 3.49407H14C16.2091 3.49407 18 5.28493 18 7.49407V12.9996C18 15.2087 16.2091 16.9996 14 16.9996H4C1.79086 16.9996 0 15.2087 0 12.9996V7.49406C0 5.28492 1.79086 3.49407 4 3.49407H4.58579L3.73252 2.67094ZM4 5.42343C2.89543 5.42343 2 6.31886 2 7.42343V13.0702C2 14.1748 2.89543 15.0702 4 15.0702H14C15.1046 15.0702 16 14.1748 16 13.0702V7.42343C16 6.31886 15.1046 5.42343 14 5.42343H4ZM5 9.31747C5 8.76519 5.44772 8.31747 6 8.31747C6.55228 8.31747 7 8.76519 7 9.31747V10.2115C7 10.7638 6.55228 11.2115 6 11.2115C5.44772 11.2115 5 10.7638 5 10.2115V9.31747ZM12 8.31747C11.4477 8.31747 11 8.76519 11 9.31747V10.2115C11 10.7638 11.4477 11.2115 12 11.2115C12.5523 11.2115 13 10.7638 13 10.2115V9.31747C13 8.76519 12.5523 8.31747 12 8.31747Z" fill="currentColor"/>
</svg>`;

// 页脚图标链接（要加新平台就往这里塞一条）
const FOOTER_LINKS = [
    { href: SITE.github,   title: 'GitHub 仓库', icon: GITHUB_ICON },
    { href: SITE.bilibili, title: '哔哩哔哩主页', icon: BILIBILI_ICON }
];

// 注入 favicon
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

    const icons = FOOTER_LINKS.map(l => `
        <a class="footer-icon"
           href="${l.href}"
           target="_blank"
           rel="noopener noreferrer"
           title="${l.title}"
           aria-label="${l.title}">${l.icon}</a>
    `).join('');

    footerEl.innerHTML = `
        <p class="footer-inner">
            <span>${SITE.footer}</span>
            ${icons}
        </p>
    `;
}

// 渲染首页文章列表
async function renderPosts() {
    const listEl = document.querySelector('.post-list');
    if (!listEl) return;

    try {
        const res = await fetch(SITE.postsJson);
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const data = await res.json();

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

injectFavicon();

document.addEventListener('DOMContentLoaded', function() {

    renderPosts();

    const titleEl = document.querySelector('title');
    if (titleEl) {
        const currentTitle = titleEl.textContent;
        if (currentTitle === SITE.name || currentTitle === '首页') {
            titleEl.textContent = SITE.name;
        } else if (!currentTitle.includes(SITE.name)) {
            titleEl.textContent = currentTitle + ' - ' + SITE.name;
        }
    }

    renderFooter();

    const backLink = document.querySelector('.back-link');
    if (backLink) {
        backLink.href = ROOT + 'index.html';
    }
});