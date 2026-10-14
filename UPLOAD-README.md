# ReState 主页 — 上传说明

这个文件夹就是**最终要上线的全部内容**，纯静态、无需构建、无任何外部请求。
字体（Caveat / Patrick Hand / Inter）、图表库（Chart.js）、手绘线库（rough.js）都已经放在 `vendor/` 里，
所以断网、公司内网、国内网络都能完整显示，不依赖 Google Fonts 和 CDN。

想改内容或改样式，看上一层目录 `restate-page/README.md`；改完后重新生成这个文件夹（见本文最后一节）。

---

## 1. 这里有什么

```
.nojekyll          告诉 GitHub Pages「原样提供文件」，不要用 Jekyll 处理（必须保留）
index.html         页面本体，所有文字都在这里
style.css          基础布局
theme-sketch.css   火柴人手绘风：纸张、颜色、字体、黑板标题
intro.css          开场动画样式和时间轴
data.js            所有数字、表格、案例
main.js            图表和交互
sketch.js          手绘边框 + 火柴人 + 鼠标火柴人
intro.js           开场动画
assets/            图片（论文插图、案例图、机器人图标）
vendor/            第三方库和字体 + 各自的许可证
```

总大小约 4.9 MB，其中图片约 4.3 MB。

---

## 2. 上线（公开版，永久免费）

页面是公开版，不需要匿名。两种免费且永久的方式，选一个就行，也可以都开。

### 方式 A：GitHub Pages（推荐，和参考站 OpenGame 一样）

仓库 `restate-page` 里的文件已经上传好了，只差两步：

1. 进仓库 **Settings** → **General**，拉到最底下 **Danger Zone** → **Change repository visibility** → 改成 **Public**。
   （GitHub Pages 的免费版要求仓库是公开的。）
2. 进 **Settings** → 左侧 **Pages**：
   - Source 选 **Deploy from a branch**
   - Branch 选 `main`，目录选 **`/ (root)`**，点 **Save**
3. 等 1–2 分钟，访问 `https://<你的用户名>.github.io/restate-page/`。

以后要改页面：在 GitHub 网页上 **Add file → Upload files** 上传同名文件覆盖，几分钟后自动更新。

本页面所有路径都是相对路径，放在 `/restate-page/` 这种子目录下也能正常显示，不需要像 OpenGame 那样配 `basePath` 或 GitHub Actions。

### 方式 B：Cloudflare Pages（国内访问通常更稳）

1. 登录 Cloudflare → 左侧 **Compute** → **Workers & Pages** → **Create** → 切到 **Pages** 标签 → **Upload assets**（不要选 Connect to Git）。
2. 项目名填一个短名字，比如 `restate-mllm`（**注意：之后改不了，会直接成为网址**）。
3. 把本文件夹**里面的内容**全选（Ctrl+A，11 项）拖进去，部署。
4. 得到 `https://restate-mllm.pages.dev`。
5. 以后要改：进这个项目点 **Create new deployment**，重新拖一次文件。

> 如果你之前建的是 **Worker**（网址形如 `xxx.<账号名>.workers.dev`），能用，但网址里带账号名，不好记也不好看。建议按上面重建一个 Pages 项目。

### 方式 C：自己的域名（可选）

买个域名后，在 GitHub Pages 的 **Settings → Pages → Custom domain**，或 Cloudflare Pages 的 **Custom domains** 里绑定。

---

## 5. 上线前的检查清单

- [x] noindex 已删除，搜索引擎和 Google Scholar 可以收录；`<head>` 里已有 `citation_*` 标签（Scholar 靠它识别论文页）
- [x] Code 按钮已指向 `https://github.com/YuChuang1205/ReState`
- [ ] **Paper 按钮还是占位**：arXiv 上线后，在 `index.html` 搜 `data-todo` 换掉 `href="#"`；同时把 `<head>` 里注释掉的 `citation_pdf_url` 打开填上 PDF 地址
- [ ] **BibTeX**：`index.html` 搜 `bib-code`，论文接收后把 `journal = {arXiv preprint}` 改成正式出处
- [ ] **图片文件名大小写**：GitHub 的服务器区分大小写，Windows 不区分。替换图片时文件名必须和代码里完全一致（`fig1.jpg` 不能写成 `Fig1.JPG`）。
- [ ] **不要上传**上一层目录里的 `restate-page/`（开发版）、`restate-page_bak_*`（备份）和预览截图。
- [ ] 这份 `UPLOAD-README.md` 是给你自己看的，上线后可以从仓库里删掉。

---

## 6. 改完内容后怎么重新生成这个文件夹

在 `restate-page/` 里改完并自测通过后，把下面这些文件复制过来覆盖即可：

- 8 个根文件：`index.html`、`style.css`、`theme-sketch.css`、`intro.css`、`data.js`、`main.js`、`sketch.js`、`intro.js`
- 改动过的 `assets/` 图片
- `vendor/`（只有换字体或升级库时才需要）

`.nojekyll` 保持不动。本文件夹**不包含** `README.md`（开发文档）和 `logo.png`（切图用的原图），不需要上传它们。
