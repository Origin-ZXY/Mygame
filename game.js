const BOARD_SIZE = 9;
const FINISH_TIME = 53;
const INCOME_SPOTS = new Set([5, 11, 17, 23, 29, 35, 41, 47, 53]);
const LEATHER_SPOTS = new Set([20, 26, 32, 38, 44]);
const LEATHER_PATCH = {
  id: "leather",
  name: "皮革补丁",
  cost: 0,
  time: 0,
  income: 0,
  color: "#8a5d3b",
  shape: [[0, 0]],
};

const PATCHES = [
  { id: "p01", name: "小布条", cost: 2, time: 1, income: 0, color: "#69a7f7", shape: [[0, 0], [1, 0]] },
  { id: "p02", name: "小弯角", cost: 1, time: 3, income: 0, color: "#f08d6c", shape: [[0, 0], [0, 1], [1, 1]] },
  { id: "p03", name: "短桥", cost: 2, time: 2, income: 0, color: "#5fbfc2", shape: [[0, 0], [1, 0], [2, 0]] },
  { id: "p04", name: "方巾", cost: 3, time: 2, income: 0, color: "#f1c84c", shape: [[0, 0], [1, 0], [0, 1], [1, 1]] },
  { id: "p05", name: "长条", cost: 2, time: 3, income: 0, color: "#8eb85b", shape: [[0, 0], [1, 0], [2, 0], [3, 0]] },
  { id: "p06", name: "阶梯四", cost: 3, time: 2, income: 0, color: "#64b883", shape: [[0, 0], [1, 0], [1, 1], [2, 1]] },
  { id: "p07", name: "钩形四", cost: 3, time: 3, income: 1, color: "#9b87f5", shape: [[0, 0], [0, 1], [0, 2], [1, 2]] },
  { id: "p08", name: "斜带", cost: 2, time: 2, income: 0, color: "#52a3a6", shape: [[0, 0], [1, 0], [1, 1], [2, 1]] },
  { id: "p09", name: "T形布", cost: 4, time: 2, income: 0, color: "#d79ce3", shape: [[0, 0], [1, 0], [2, 0], [1, 1]] },
  { id: "p10", name: "十字", cost: 5, time: 3, income: 1, color: "#df6f8f", shape: [[1, 0], [0, 1], [1, 1], [2, 1], [1, 2]] },
  { id: "p11", name: "大L", cost: 5, time: 4, income: 1, color: "#e29b3c", shape: [[0, 0], [0, 1], [0, 2], [1, 2], [2, 2]] },
  { id: "p12", name: "凸字", cost: 4, time: 2, income: 0, color: "#c96b5c", shape: [[1, 0], [0, 1], [1, 1], [2, 1], [1, 2]] },
  { id: "p13", name: "门框", cost: 5, time: 4, income: 1, color: "#78a4d4", shape: [[0, 0], [1, 0], [2, 0], [0, 1], [2, 1]] },
  { id: "p14", name: "宽带", cost: 7, time: 6, income: 2, color: "#e8b351", shape: [[0, 0], [1, 0], [2, 0], [3, 0], [1, 1], [2, 1]] },
  { id: "p15", name: "大块", cost: 6, time: 5, income: 2, color: "#b77ad8", shape: [[0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1]] },
  { id: "p16", name: "长靴", cost: 6, time: 3, income: 1, color: "#56b6a7", shape: [[0, 0], [0, 1], [1, 1], [2, 1], [2, 2], [3, 2]] },
  { id: "p17", name: "楼梯", cost: 5, time: 4, income: 1, color: "#d97070", shape: [[0, 0], [1, 0], [1, 1], [2, 1], [2, 2], [3, 2]] },
  { id: "p18", name: "双角", cost: 4, time: 3, income: 0, color: "#87b95f", shape: [[0, 0], [2, 0], [0, 1], [1, 1], [2, 1]] },
  { id: "p19", name: "短T", cost: 3, time: 4, income: 1, color: "#ef8f5f", shape: [[0, 0], [1, 0], [2, 0], [1, 1], [1, 2]] },
  { id: "p20", name: "免费十字", cost: 0, time: 3, income: 0, color: "#6f95d6", shape: [[0, 0], [2, 0], [1, 1], [0, 2], [2, 2]] },
  { id: "p21", name: "大十字", cost: 7, time: 6, income: 2, color: "#ba6fad", shape: [[1, 0], [0, 1], [1, 1], [2, 1], [1, 2], [1, 3]] },
  { id: "p22", name: "长L五", cost: 7, time: 2, income: 2, color: "#5caed1", shape: [[0, 0], [0, 1], [0, 2], [0, 3], [1, 3]] },
  { id: "p23", name: "U形", cost: 6, time: 5, income: 1, color: "#dbbd4e", shape: [[0, 0], [2, 0], [0, 1], [1, 1], [2, 1], [0, 2], [2, 2]] },
  { id: "p24", name: "S形五", cost: 4, time: 6, income: 1, color: "#61bd84", shape: [[1, 0], [2, 0], [0, 1], [1, 1], [0, 2]] },
  { id: "p25", name: "P形", cost: 5, time: 5, income: 2, color: "#d387b9", shape: [[0, 0], [1, 0], [0, 1], [1, 1], [0, 2]] },
  { id: "p26", name: "高墙", cost: 3, time: 6, income: 1, color: "#79a06a", shape: [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]] },
  { id: "p27", name: "大钩", cost: 8, time: 6, income: 2, color: "#cf7662", shape: [[0, 0], [0, 1], [0, 2], [0, 3], [1, 3], [2, 3]] },
  { id: "p28", name: "宽靴", cost: 10, time: 5, income: 3, color: "#6aa0b8", shape: [[0, 0], [1, 0], [0, 1], [1, 1], [2, 1], [2, 2], [3, 2]] },
  { id: "p29", name: "斧形", cost: 7, time: 4, income: 2, color: "#d1a25b", shape: [[0, 0], [1, 0], [2, 0], [1, 1], [1, 2], [2, 2]] },
  { id: "p30", name: "风车", cost: 8, time: 6, income: 2, color: "#a77ad1", shape: [[1, 0], [2, 0], [0, 1], [1, 1], [2, 1], [1, 2], [0, 2]] },
  { id: "p31", name: "大阶梯", cost: 7, time: 4, income: 1, color: "#67b58f", shape: [[0, 0], [1, 0], [1, 1], [2, 1], [2, 2], [3, 2], [3, 3]] },
  { id: "p32", name: "巨块", cost: 10, time: 6, income: 3, color: "#d86583", shape: [[0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1], [0, 2], [1, 2]] },
  { id: "p33", name: "长蛇", cost: 4, time: 4, income: 1, color: "#4fb0b8", shape: [[0, 0], [1, 0], [1, 1], [2, 1], [2, 2], [3, 2]] },
];

const players = {
  blue: makePlayer("蓝方"),
  red: makePlayer("红方"),
};

let current = "blue";
let selected = null;
let orientedShape = [];
let patchCircle = [];
let neutralIndex = 0;
let gameOver = false;
let logMessages = [];
let leatherAvailable = {};
let pendingLeather = null;
let bonusClaimedBy = null;
let finishOrder = [];

const nodes = {
  blueBoard: document.querySelector("#blueBoard"),
  redBoard: document.querySelector("#redBoard"),
  patchList: document.querySelector("#patchList"),
  selectedPreview: document.querySelector("#selectedPreview"),
  selectedMeta: document.querySelector("#selectedMeta"),
  statusText: document.querySelector("#statusText"),
  logList: document.querySelector("#logList"),
  timeTrack: document.querySelector("#timeTrack"),
  rotateBtn: document.querySelector("#rotateBtn"),
  flipBtn: document.querySelector("#flipBtn"),
  passBtn: document.querySelector("#passBtn"),
  newGameBtn: document.querySelector("#newGameBtn"),
  onlineStatus: document.querySelector("#onlineStatus"),
  createRoomBtn: document.querySelector("#createRoomBtn"),
  joinRoomBtn: document.querySelector("#joinRoomBtn"),
  copyInviteBtn: document.querySelector("#copyInviteBtn"),
  roomCodeInput: document.querySelector("#roomCodeInput"),
  inviteLink: document.querySelector("#inviteLink"),
};

const online = {
  client: null,
  channel: null,
  clientId: makeClientId(),
  roomCode: "",
  role: "local",
  connected: false,
  configured: false,
  applyingRemote: false,
  version: 0,
};

function makePlayer(label) {
  return {
    label,
    buttons: 5,
    time: 0,
    income: 0,
    bonus7x7: false,
    board: Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(null)),
  };
}

function startGame(options = {}) {
  const shouldPublish = options.publish ?? isOnlineGame();
  players.blue = makePlayer("蓝方");
  players.red = makePlayer("红方");
  current = "blue";
  selected = null;
  orientedShape = [];
  patchCircle = shuffle(PATCHES);
  neutralIndex = findInitialNeutralIndex(patchCircle);
  leatherAvailable = Object.fromEntries([...LEATHER_SPOTS].map((spot) => [spot, true]));
  pendingLeather = null;
  bonusClaimedBy = null;
  finishOrder = [];
  gameOver = false;
  document.body.classList.remove("game-over");
  logMessages = [];
  buildBoards();
  renderAll();
  log("新局开始：33 块常规布料围成一圈，中立标记后的 3 块可购买。");
  if (shouldPublish) publishState("new-game");
}

function buildBoards() {
  for (const id of ["blue", "red"]) {
    const boardNode = nodes[`${id}Board`];
    boardNode.innerHTML = "";
    for (let y = 0; y < BOARD_SIZE; y += 1) {
      for (let x = 0; x < BOARD_SIZE; x += 1) {
        const cell = document.createElement("button");
        cell.type = "button";
        cell.className = "cell";
        cell.dataset.x = x;
        cell.dataset.y = y;
        cell.addEventListener("mouseenter", () => previewPlacement(id, x, y));
        cell.addEventListener("mouseleave", clearPreview);
        cell.addEventListener("click", () => placeSelectedPatch(id, x, y));
        boardNode.append(cell);
      }
    }
  }
}

function renderAll() {
  renderBoards();
  renderPatches();
  renderTrack();
  renderSelected();
  renderStats();
  renderLog();
  renderOnlineStatus();
}

function renderBoards() {
  for (const id of ["blue", "red"]) {
    const cells = nodes[`${id}Board`].children;
    for (let y = 0; y < BOARD_SIZE; y += 1) {
      for (let x = 0; x < BOARD_SIZE; x += 1) {
        const cell = cells[y * BOARD_SIZE + x];
        const fill = players[id].board[y][x];
        cell.className = fill ? "cell filled" : "cell";
        cell.style.background = fill || "";
      }
    }
  }
}

function renderPatches() {
  const available = getAvailablePatchIndexes();
  nodes.patchList.innerHTML = "";
  patchCircle.forEach((patch, index) => {
    const isAvailable = available.includes(index);
    const isSelected = selected?.type === "market" && selected.index === index;
    const card = document.createElement("button");
    card.type = "button";
    card.className = [
      "patch-card",
      isAvailable ? "available" : "",
      isSelected ? "selected" : "",
      index === normalizeMarketIndex(neutralIndex) ? "neutral" : "",
    ].filter(Boolean).join(" ");
    card.disabled =
      gameOver ||
      Boolean(pendingLeather) ||
      !canTakeTurn() ||
      !isAvailable ||
      players[current].buttons < patch.cost;
    card.append(makeMiniGrid(patch.shape, patch.color));
    card.insertAdjacentHTML(
      "beforeend",
      `<span class="patch-name">${patch.name}</span><span class="patch-meta">#${index + 1} · 花费 ${patch.cost} · 时间 ${patch.time} · 收入 +${patch.income}</span>`,
    );
    card.addEventListener("click", () => selectMarketPatch(index));
    nodes.patchList.append(card);
  });
}

function renderSelected() {
  nodes.selectedPreview.innerHTML = "";
  if (!selected) {
    if (pendingLeather?.playerId === current) {
      nodes.selectedMeta.textContent = "先把获得的 1x1 皮革补丁放到自己的拼布板。";
    } else {
      nodes.selectedMeta.textContent = canTakeTurn()
        ? "请选择中立标记后顺时针 3 块之一，或前进拿纽扣。"
        : "等待对方操作。";
    }
    return;
  }

  nodes.selectedPreview.append(makeMiniGrid(orientedShape, selected.patch.color, true));
  if (selected.type === "leather") {
    nodes.selectedMeta.textContent = `皮革补丁：免费 1x1，剩余 ${pendingLeather?.count || 1} 块待放置。`;
    return;
  }
  const patch = selected.patch;
  nodes.selectedMeta.textContent = `${patch.name}：花费 ${patch.cost} 纽扣，推进 ${patch.time} 格，板上收入 +${patch.income}。`;
}

function renderTrack() {
  nodes.timeTrack.innerHTML = "";
  for (let i = 0; i <= FINISH_TIME; i += 1) {
    const cell = document.createElement("div");
    cell.className = [
      "track-cell",
      INCOME_SPOTS.has(i) ? "income" : "",
      leatherAvailable[i] ? "leather" : "",
      i === FINISH_TIME ? "finish" : "",
    ].filter(Boolean).join(" ");
    cell.textContent = leatherAvailable[i] ? `${i}◆` : i;
    for (const id of ["blue", "red"]) {
      if (players[id].time === i) {
        const marker = document.createElement("span");
        marker.className = `marker ${id}`;
        cell.append(marker);
      }
    }
    nodes.timeTrack.append(cell);
  }
}

function renderStats() {
  for (const id of ["blue", "red"]) {
    document.querySelector(`#${id}Buttons`).textContent = players[id].buttons;
    document.querySelector(`#${id}Time`).textContent = players[id].time;
    document.querySelector(`#${id}Income`).textContent = players[id].income;
    document.querySelector(`#${id}Bonus`).textContent = players[id].bonus7x7 ? "是" : "否";
    document.querySelector(`#${id}Score`).textContent = scorePlayer(players[id]);
    document.querySelector(`#${id}Panel`).classList.toggle("active", current === id && !gameOver);
    document.querySelector(`#${id}Turn`).textContent = current === id && !gameOver ? "回合中" : "等待";
  }
  nodes.passBtn.disabled = gameOver || Boolean(pendingLeather) || !canTakeTurn() || players[current].time >= FINISH_TIME;
}

function renderLog() {
  nodes.logList.innerHTML = "";
  for (const message of logMessages.slice(0, 28)) {
    const item = document.createElement("li");
    item.textContent = message;
    nodes.logList.append(item);
  }
}

function renderOnlineStatus() {
  if (!online.configured) {
    nodes.onlineStatus.textContent = "本地同屏模式，配置 Supabase 后可联机。";
    nodes.createRoomBtn.disabled = true;
    nodes.joinRoomBtn.disabled = true;
    nodes.copyInviteBtn.disabled = true;
    nodes.inviteLink.textContent = "需要在 config.js 填入 supabaseUrl 和 supabaseKey。";
    return;
  }

  nodes.createRoomBtn.disabled = false;
  nodes.joinRoomBtn.disabled = false;
  nodes.copyInviteBtn.disabled = !online.roomCode;
  if (!isOnlineGame()) {
    nodes.onlineStatus.textContent = "本地同屏模式，可创建或加入联机房间。";
    nodes.inviteLink.textContent = "";
    return;
  }

  const roleText = online.role === "blue" ? "蓝方" : online.role === "red" ? "红方" : "观战";
  const connectionText = online.connected ? "已连接" : "连接中";
  nodes.onlineStatus.textContent = `房间 ${online.roomCode} · ${roleText} · ${connectionText}`;
  nodes.inviteLink.textContent = online.role === "blue" ? makeInviteLink() : "";
}

function selectMarketPatch(index) {
  if (gameOver || pendingLeather || !canTakeTurn()) return;
  const patch = patchCircle[index];
  if (!getAvailablePatchIndexes().includes(index)) {
    log("只能购买中立标记后顺时针的 3 块布料。");
    return;
  }
  if (players[current].buttons < patch.cost) {
    log(`${players[current].label} 纽扣不足，不能选择 ${patch.name}。`);
    return;
  }
  selected = { type: "market", index, patch };
  orientedShape = normalize(patch.shape);
  clearPreview();
  renderAll();
}

function placeSelectedPatch(boardId, x, y) {
  if (gameOver || boardId !== current || !selected || !canTakeTurn()) return;
  const player = players[current];
  const patch = selected.patch;
  if (!canPlace(player, orientedShape, x, y)) {
    log(`${player.label} 不能把 ${patch.name} 放在这里。`);
    return;
  }

  fillBoard(player, orientedShape, x, y, patch.color);
  if (selected.type === "market") {
    buySelectedMarketPatch();
  } else {
    placeLeatherPatch();
  }
}

function buySelectedMarketPatch() {
  const activePlayerId = current;
  const player = players[activePlayerId];
  const patch = selected.patch;
  const chosenIndex = selected.index;

  player.buttons -= patch.cost;
  player.income += patch.income;
  patchCircle.splice(chosenIndex, 1);
  neutralIndex = patchCircle.length ? chosenIndex % patchCircle.length : 0;
  log(`${player.label} 购买并放置 ${patch.name}，花费 ${patch.cost}，推进 ${patch.time}。`);
  selected = null;
  orientedShape = [];
  checkSevenBySeven(activePlayerId);
  advanceTime(activePlayerId, patch.time);
  finishAction(activePlayerId, "move");
}

function placeLeatherPatch() {
  const playerId = current;
  log(`${players[playerId].label} 放置 1x1 皮革补丁。`);
  checkSevenBySeven(playerId);
  pendingLeather.count -= 1;
  if (pendingLeather.count > 0 && hasAnyEmpty(players[playerId])) {
    selected = { type: "leather", patch: LEATHER_PATCH };
    orientedShape = normalize(LEATHER_PATCH.shape);
    renderAll();
    publishState("leather-partial");
    return;
  }

  pendingLeather = null;
  selected = null;
  orientedShape = [];
  finishAction(playerId, "leather");
}

function passTurn() {
  if (gameOver || pendingLeather || !canTakeTurn() || players[current].time >= FINISH_TIME) return;
  const activePlayerId = current;
  const opponentId = otherPlayer(activePlayerId);
  const player = players[activePlayerId];
  let target = Math.min(FINISH_TIME, players[opponentId].time + 1);
  if (target <= player.time) target = Math.min(FINISH_TIME, player.time + 1);
  const gain = Math.max(0, target - player.time);
  player.buttons += gain;
  log(`${player.label} 前进 ${gain} 格，获得 ${gain} 纽扣。`);
  advanceTime(activePlayerId, gain);
  finishAction(activePlayerId, "pass");
}

function finishAction(activePlayerId, reason) {
  if (pendingLeather) {
    current = pendingLeather.playerId;
    selected = { type: "leather", patch: LEATHER_PATCH };
    orientedShape = normalize(LEATHER_PATCH.shape);
    nodes.statusText.textContent = `${players[current].label} 获得皮革补丁，必须立即放置。`;
    renderAll();
    publishState(`${reason}-leather`);
    return;
  }

  if (isGameDone()) {
    finishGame();
  } else {
    chooseNextPlayer(activePlayerId);
  }
  renderAll();
  publishState(reason);
}

function advanceTime(playerId, steps) {
  const player = players[playerId];
  const start = player.time;
  player.time = Math.min(FINISH_TIME, player.time + steps);
  if (player.time >= FINISH_TIME && !finishOrder.includes(playerId)) {
    finishOrder.push(playerId);
  }

  for (let spot = start + 1; spot <= player.time; spot += 1) {
    if (INCOME_SPOTS.has(spot)) {
      player.buttons += player.income;
      log(`${player.label} 到达收入点，获得 ${player.income} 纽扣。`);
    }
    if (leatherAvailable[spot]) {
      leatherAvailable[spot] = false;
      if (hasAnyEmpty(player)) {
        pendingLeather = pendingLeather || { playerId, count: 0 };
        pendingLeather.count += 1;
        log(`${player.label} 取得一个 1x1 皮革补丁。`);
      }
    }
  }
}

function chooseNextPlayer(activePlayerId) {
  if (players.blue.time >= FINISH_TIME && players.red.time < FINISH_TIME) {
    current = "red";
  } else if (players.red.time >= FINISH_TIME && players.blue.time < FINISH_TIME) {
    current = "blue";
  } else if (players.blue.time === players.red.time) {
    current = activePlayerId;
  } else {
    current = players.blue.time < players.red.time ? "blue" : "red";
  }
  nodes.statusText.textContent = `${players[current].label} 行动：购买可用布料，或前进拿纽扣。`;
}

function canTakeTurn() {
  if (!isOnlineGame()) return true;
  return online.connected && online.role === current;
}

function getAvailablePatchIndexes() {
  if (!patchCircle.length) return [];
  const count = Math.min(3, patchCircle.length);
  return Array.from({ length: count }, (_, offset) => normalizeMarketIndex(neutralIndex + offset));
}

function previewPlacement(boardId, x, y) {
  clearPreview();
  if (gameOver || boardId !== current || !selected || !canTakeTurn()) return;
  const player = players[current];
  const valid = canPlace(player, orientedShape, x, y);
  const cells = nodes[`${boardId}Board`].children;
  for (const [dx, dy] of orientedShape) {
    const px = x + dx;
    const py = y + dy;
    if (px >= 0 && py >= 0 && px < BOARD_SIZE && py < BOARD_SIZE) {
      cells[py * BOARD_SIZE + px].classList.add(valid ? "preview-ok" : "preview-bad");
    }
  }
}

function clearPreview() {
  document.querySelectorAll(".preview-ok, .preview-bad").forEach((cell) => {
    cell.classList.remove("preview-ok", "preview-bad");
  });
}

function canPlace(player, shape, x, y) {
  return shape.every(([dx, dy]) => {
    const px = x + dx;
    const py = y + dy;
    return px >= 0 && py >= 0 && px < BOARD_SIZE && py < BOARD_SIZE && !player.board[py][px];
  });
}

function fillBoard(player, shape, x, y, color) {
  for (const [dx, dy] of shape) {
    player.board[y + dy][x + dx] = color;
  }
}

function rotateSelected() {
  if (!selected || gameOver || !canTakeTurn()) return;
  orientedShape = normalize(orientedShape.map(([x, y]) => [y, -x]));
  renderSelected();
}

function flipSelected() {
  if (!selected || gameOver || !canTakeTurn()) return;
  orientedShape = normalize(orientedShape.map(([x, y]) => [-x, y]));
  renderSelected();
}

function makeMiniGrid(shape, color, large = false) {
  const normalized = normalize(shape);
  const width = Math.max(...normalized.map(([x]) => x)) + 1;
  const height = Math.max(...normalized.map(([, y]) => y)) + 1;
  const wrap = document.createElement("div");
  wrap.className = large ? "selected-preview" : "mini-grid";
  wrap.style.gridTemplateColumns = `repeat(${width}, auto)`;
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const cell = document.createElement("span");
      const on = normalized.some(([sx, sy]) => sx === x && sy === y);
      cell.className = `mini-cell${on ? " on" : ""}`;
      if (on) cell.style.background = color;
      wrap.append(cell);
    }
  }
  return wrap;
}

function normalize(shape) {
  const minX = Math.min(...shape.map(([x]) => x));
  const minY = Math.min(...shape.map(([, y]) => y));
  return shape
    .map(([x, y]) => [x - minX, y - minY])
    .sort((a, b) => a[1] - b[1] || a[0] - b[0]);
}

function scorePlayer(player) {
  const empty = player.board.flat().filter((cell) => !cell).length;
  return player.buttons + (player.bonus7x7 ? 7 : 0) - empty * 2;
}

function isGameDone() {
  return players.blue.time >= FINISH_TIME && players.red.time >= FINISH_TIME;
}

function finishGame() {
  gameOver = true;
  document.body.classList.add("game-over");
  const blueScore = scorePlayer(players.blue);
  const redScore = scorePlayer(players.red);
  let result = "平局";
  if (blueScore !== redScore) {
    result = blueScore > redScore ? "蓝方获胜" : "红方获胜";
  } else if (finishOrder.length) {
    result = `${players[finishOrder[0]].label}因先到终点获胜`;
  }
  nodes.statusText.textContent = `${result}：蓝方 ${blueScore}，红方 ${redScore}。`;
  log(`终局计分：纽扣 + 7x7奖励 - 空格x2。蓝方 ${blueScore}，红方 ${redScore}。`);
}

function checkSevenBySeven(playerId) {
  if (bonusClaimedBy) return;
  const player = players[playerId];
  for (let top = 0; top <= BOARD_SIZE - 7; top += 1) {
    for (let left = 0; left <= BOARD_SIZE - 7; left += 1) {
      let complete = true;
      for (let y = top; y < top + 7; y += 1) {
        for (let x = left; x < left + 7; x += 1) {
          if (!player.board[y][x]) complete = false;
        }
      }
      if (complete) {
        player.bonus7x7 = true;
        bonusClaimedBy = playerId;
        log(`${player.label} 首先完成 7x7 区域，获得 7 分奖励。`);
        return;
      }
    }
  }
}

function hasAnyEmpty(player) {
  return player.board.some((row) => row.some((cell) => !cell));
}

function log(message) {
  logMessages.unshift(message);
  renderLog();
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function findInitialNeutralIndex(circle) {
  const smallestIndex = circle.findIndex((patch) => patch.shape.length === 2);
  return smallestIndex === -1 ? 0 : (smallestIndex + 1) % circle.length;
}

function normalizeMarketIndex(index) {
  if (!patchCircle.length) return 0;
  return ((index % patchCircle.length) + patchCircle.length) % patchCircle.length;
}

function otherPlayer(playerId) {
  return playerId === "blue" ? "red" : "blue";
}

function initOnline() {
  const config = window.PATCHWORK_ONLINE_CONFIG || {};
  online.configured = Boolean(
    window.supabase &&
      config.supabaseUrl &&
      config.supabaseKey &&
      !config.supabaseUrl.includes("YOUR_") &&
      !config.supabaseKey.includes("YOUR_"),
  );

  nodes.roomCodeInput.addEventListener("input", () => {
    nodes.roomCodeInput.value = sanitizeRoomCode(nodes.roomCodeInput.value);
  });
  nodes.createRoomBtn.addEventListener("click", createRoom);
  nodes.joinRoomBtn.addEventListener("click", () => joinRoom(nodes.roomCodeInput.value));
  nodes.copyInviteBtn.addEventListener("click", copyInviteLink);

  const params = new URLSearchParams(window.location.search);
  const room = sanitizeRoomCode(params.get("room") || "");
  const seat = params.get("seat") === "blue" ? "blue" : "red";
  if (room && online.configured) {
    nodes.roomCodeInput.value = room;
    joinRoom(room, seat);
  }
}

function createRoom() {
  const roomCode = makeRoomCode();
  nodes.roomCodeInput.value = roomCode;
  connectRoom(roomCode, "blue");
  startGame({ publish: false });
  writeRoomUrl(roomCode, "blue");
}

function joinRoom(rawCode, role = "red") {
  const roomCode = sanitizeRoomCode(rawCode);
  if (!roomCode) {
    nodes.onlineStatus.textContent = "请输入房间码。";
    return;
  }
  connectRoom(roomCode, role);
  writeRoomUrl(roomCode, role);
}

function connectRoom(roomCode, role) {
  if (!online.configured) {
    renderOnlineStatus();
    return;
  }

  if (!online.client) {
    const config = window.PATCHWORK_ONLINE_CONFIG;
    online.client = window.supabase.createClient(config.supabaseUrl, config.supabaseKey);
  }

  if (online.channel) {
    online.client.removeChannel(online.channel);
  }

  online.roomCode = roomCode;
  online.role = role;
  online.connected = false;
  online.channel = online.client.channel(`patchwork-duel:${roomCode}`, {
    config: { broadcast: { ack: true, self: false } },
  });

  online.channel
    .on("broadcast", { event: "state" }, ({ payload }) => receiveState(payload))
    .on("broadcast", { event: "request-state" }, ({ payload }) => {
      if (payload?.clientId !== online.clientId && online.role === "blue") publishState("sync");
    })
    .subscribe((status) => {
      online.connected = status === "SUBSCRIBED";
      renderOnlineStatus();
      renderPatches();
      renderSelected();
      renderStats();
      if (status === "SUBSCRIBED") {
        if (online.role === "blue") publishState("host-ready");
        if (online.role === "red") requestState();
      }
    });

  renderOnlineStatus();
}

function requestState() {
  if (!online.channel || !online.connected) return;
  online.channel.send({
    type: "broadcast",
    event: "request-state",
    payload: { clientId: online.clientId },
  });
}

function publishState(reason) {
  if (!isOnlineGame() || !online.connected || online.applyingRemote) return;
  online.version += 1;
  online.channel.send({
    type: "broadcast",
    event: "state",
    payload: {
      clientId: online.clientId,
      version: online.version,
      reason,
      state: makeSnapshot(),
    },
  });
}

function receiveState(payload) {
  if (!payload || payload.clientId === online.clientId || payload.version < online.version) return;
  online.version = payload.version;
  online.applyingRemote = true;
  applySnapshot(payload.state);
  online.applyingRemote = false;
}

function makeSnapshot() {
  return {
    current,
    players: clone(players),
    patchCircle: clone(patchCircle),
    neutralIndex,
    gameOver,
    logMessages: clone(logMessages),
    leatherAvailable: clone(leatherAvailable),
    pendingLeather: clone(pendingLeather),
    bonusClaimedBy,
    finishOrder: clone(finishOrder),
  };
}

function applySnapshot(snapshot) {
  if (!snapshot) return;
  players.blue = snapshot.players.blue;
  players.red = snapshot.players.red;
  current = snapshot.current;
  patchCircle = snapshot.patchCircle;
  neutralIndex = snapshot.neutralIndex;
  gameOver = snapshot.gameOver;
  logMessages = snapshot.logMessages || [];
  leatherAvailable = snapshot.leatherAvailable || {};
  pendingLeather = snapshot.pendingLeather || null;
  bonusClaimedBy = snapshot.bonusClaimedBy || null;
  finishOrder = snapshot.finishOrder || [];
  selected = pendingLeather?.playerId === current ? { type: "leather", patch: LEATHER_PATCH } : null;
  orientedShape = selected ? normalize(LEATHER_PATCH.shape) : [];
  document.body.classList.toggle("game-over", gameOver);
  nodes.statusText.textContent = gameOver
    ? "对局结束。"
    : `${players[current].label} 行动：购买可用布料，或前进拿纽扣。`;
  renderAll();
}

function isOnlineGame() {
  return online.role !== "local" && Boolean(online.roomCode);
}

function makeInviteLink() {
  const url = new URL(window.location.href);
  url.searchParams.set("room", online.roomCode);
  url.searchParams.set("seat", "red");
  return url.toString();
}

async function copyInviteLink() {
  const link = makeInviteLink();
  nodes.inviteLink.textContent = link;
  try {
    await navigator.clipboard.writeText(link);
    nodes.onlineStatus.textContent = `房间 ${online.roomCode} · 邀请链接已复制`;
  } catch {
    nodes.onlineStatus.textContent = `房间 ${online.roomCode} · 请手动复制下方链接`;
  }
}

function writeRoomUrl(roomCode, role) {
  const url = new URL(window.location.href);
  url.searchParams.set("room", roomCode);
  url.searchParams.set("seat", role);
  window.history.replaceState(null, "", url);
}

function sanitizeRoomCode(value) {
  return value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8);
}

function makeRoomCode() {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

function makeClientId() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

nodes.rotateBtn.addEventListener("click", rotateSelected);
nodes.flipBtn.addEventListener("click", flipSelected);
nodes.passBtn.addEventListener("click", passTurn);
nodes.newGameBtn.addEventListener("click", () => {
  if (isOnlineGame() && online.role !== "blue") {
    log("只有蓝方可以开启新局。");
    return;
  }
  startGame({ publish: isOnlineGame() });
});

buildBoards();
startGame({ publish: false });
initOnline();
renderAll();
