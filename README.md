# 拼布对决

一个可以直接在浏览器运行的双人网页小游戏。玩家轮流购买布料、旋转或翻转形状，并放到自己的 9x9 拼布板上。游戏会根据纽扣、收入和空格惩罚计算终局分数。

## 本地运行

直接用浏览器打开 `index.html` 即可。

## 部署到 GitHub Pages

1. 打开 GitHub 仓库 `Origin-ZXY/Mygame`。
2. 上传本目录下的所有文件：
   - `index.html`
   - `styles.css`
   - `game.js`
   - `.nojekyll`
   - `README.md`
3. 进入仓库的 `Settings -> Pages`。
4. 在 `Build and deployment` 中选择：
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
5. 保存后等待部署完成。

部署完成后的访问地址通常是：

```text
https://origin-zxy.github.io/Mygame/
```

如果改用用户主页仓库 `Origin-ZXY.github.io`，则访问地址是：

```text
https://origin-zxy.github.io/
```
