# 拼布对决

一个可以直接在浏览器运行的双人网页小游戏。玩家轮流购买布料、旋转或翻转形状，并放到自己的 9x9 拼布板上。游戏会根据纽扣、收入和空格惩罚计算终局分数。

## 当前规则实现

这个版本按《Patchwork》的核心流程实现：

- 33 块常规布料随机围成市场。
- 只能购买中立标记后顺时针的 3 块布料。
- 可选择“前进拿纽扣”替代购买。
- 时间轴决定谁行动，落后者继续行动，平手时后到者在上方并继续行动。
- 收入点会按拼布板上的纽扣图标发放收入。
- 时间轴上有 5 个 1x1 皮革补丁。
- 首位完成 7x7 无空格区域的玩家获得 7 分奖励。
- 终局分数为剩余纽扣 + 7x7 奖励 - 每个空格 2 分。

网页中的布料颜色、名称和数值是为这个项目自制的数字化数据，不复刻实体版图像。

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
