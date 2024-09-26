# project-nextjs-profile

<div align="center">
  <img alt="Logo" src="https://raw.githubusercontent.com/ardeman/project-nextjs-profile/main/src/app/apple-touch-icon.png" width="100" />
</div>

<p align="center">
  <a href="https://ardeman.com/" target="_blank">Ardeman</a>'s personal website built with <a href="https://nextjs.org/" target="_blank">Next.js</a> and <a href="https://tailwindcss.com/" target="_blank">Tailwind CSS</a>, deployed with <a href="https://github.com/features/actions" target="_blank">GitHub Actions</a> on <a href="https://pages.github.com/" target="_blank">GitHub Pages</a>
</p>

<p align="center">
  <a href="https://github.com/ardeman/project-nextjs-profile/actions/workflows/nextjs.yml" target="_blank">
    <img src="https://github.com/ardeman/project-nextjs-profile/actions/workflows/nextjs.yml/badge.svg?branch=main" alt="Deploy Next.js site to Pages" />
  </a>
</p>

![demo-dark](https://raw.githubusercontent.com/ardeman/project-nextjs-profile/main/public/images/profile/demo-dark.png)
![demo-light](https://raw.githubusercontent.com/ardeman/project-nextjs-profile/main/public/images/profile/demo-light.png)

## 🍴 Forking this repo

You can fork this repo. Please give me proper credit by linking back to [ardeman.com](https://ardeman.com/). Thanks!

## 🎛️ Installation & Set Up

Prerequisites:

- Node 20+
- pnpm 8.10.5+

To set up the app execute the following commands.

```bash
git clone https://github.com/ardeman/project-nextjs-profile.git
cd project-nextjs-profile
pnpm install
```

To runs the app in the development mode:

```bash
pnpm dev
```

Then, open [http://localhost:3000](http://localhost:3000) to view it in the browser.

To install husky git hooks:

```bash
pnpm prepare

```

To lint code base:

```bash
pnpm lint
```

To format code base:

```bash
pnpm format
```

To generate an optimized version of the application for production:

```bash
pnpm build
```

To tart the Node.js server:

```bash
pnpm start
```

### Implementing Data from LinkedIn

The web is using imported data from linkedin placed in: `public/linkedin/`
You can download the data from your <https://www.linkedin.com/mypreferences/d/download-my-data>

## 🎨 Color Reference

| Color          | Hex                                                                |
| -------------- | ------------------------------------------------------------------ |
| gray-900       | ![#111827](https://via.placeholder.com/10/111827?text=+) `#111827` |
| red-600        | ![#dc2626](https://via.placeholder.com/10/dc2626?text=+) `#dc2626` |
| red-700        | ![#b91c1c](https://via.placeholder.com/10/b91c1c?text=+) `#b91c1c` |
| red-900        | ![#7f1d1d](https://via.placeholder.com/10/7f1d1d?text=+) `#7f1d1d` |
| sky-400        | ![#38bdf8](https://via.placeholder.com/10/38bdf8?text=+) `#38bdf8` |
| sky-900        | ![#0c4a6e](https://via.placeholder.com/10/0c4a6e?text=+) `#0c4a6e` |
| slate-100      | ![#f1f5f9](https://via.placeholder.com/10/f1f5f9?text=+) `#f1f5f9` |
| slate-200      | ![#e2e8f0](https://via.placeholder.com/10/e2e8f0?text=+) `#e2e8f0` |
| slate-400      | ![#94a3b8](https://via.placeholder.com/10/94a3b8?text=+) `#94a3b8` |
| slate-500      | ![#64748b](https://via.placeholder.com/10/64748b?text=+) `#64748b` |
| slate-600      | ![#475569](https://via.placeholder.com/10/475569?text=+) `#475569` |
| slate-900      | ![#0f172a](https://via.placeholder.com/10/0f172a?text=+) `#0f172a` |
| stone-900      | ![#1c1917](https://via.placeholder.com/10/1c1917?text=+) `#1c1917` |
| white          | ![#ffffff](https://via.placeholder.com/10/ffffff?text=+) `#ffffff` |
