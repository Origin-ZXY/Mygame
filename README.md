# 拼布对决

一个可以直接在浏览器运行的双人网页小游戏。玩家轮流购买布料、旋转或翻转形状，并放到自己的 9x9 拼布板上。游戏会根据纽扣、收入和空格惩罚计算终局分数。

## 联机模式

联机版使用 Supabase Realtime 同步房间状态。GitHub Pages 仍然负责托管网页，Supabase 负责两台设备之间的实时消息。

1. 创建一个 Supabase 项目。
2. 在项目的 API/Connect 页面复制：
   - Project URL
   - Publishable key 或 anon key
3. 打开 `config.js`，填入：

```js
window.PATCHWORK_ONLINE_CONFIG = {
  supabaseUrl: "https://你的项目.supabase.co",
  supabaseKey: "你的 publishable 或 anon key",
};
```

4. 重新部署到 GitHub Pages。
5. 蓝方点击“创建房间”，复制邀请链接给红方。

这个版本使用公共 Realtime Broadcast 房间，适合小游戏演示；房间码不是隐私凭证。

## 本地运行

直接用浏览器打开 `index.html` 即可。

## 部署到 GitHub Pages

1. 打开 GitHub 仓库 `Origin-ZXY/Mygame`。
2. 上传本目录下的所有文件：
   - `index.html`
   - `styles.css`
   - `game.js`
   - `config.js`
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
