# 侯明宇 · 宣言俱乐部 v10

## 文件结构
- `index.html`：主页和个人主页结构
- `style.css`：视觉样式、响应式布局
- `script.js`：人物资料、宣言切换、照片相册
- `assets/`：三张初始照片

## 发布到 GitHub Pages
把 `index.html`、`style.css`、`script.js` 和整个 `assets` 文件夹放在仓库根目录；不要把它们再包在额外的子文件夹里。仓库 Settings → Pages 设置为 `Deploy from a branch`、`main`、`/(root)`。

项目站点地址一般为 `https://用户名.github.io/仓库名/`，例如本项目仓库 `111` 的地址为 `https://tby8d2yz5f-lab.github.io/111/`。

## 新增照片
1. 上传图片到 `assets/`，例如 `gurui2.jpg`。
2. 打开 `script.js`，找到对应人物的 `photos` 数组。
3. 将新路径加到数组中，例如 `photos:['./assets/gurui.jpg','./assets/gurui2.jpg']`。
4. Commit changes。

## 修改宣言
编辑 `script.js` 中对应人物的 `slogans` 数组。保存后等待 GitHub Pages 部署。

提示：本网站是朋友间娱乐用途。当前未设置登录验证；不要把它当作隐私或安全系统。
