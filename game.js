const BOARD_SIZE = 9;
const FINISH_TIME = 34;
const INCOME_SPOTS = new Set([5, 11, 17, 23, 29, 34]);

const PATCHES = [
  { name: "短桥", cost: 2, time: 2, income: 0, color: "#69a7f7", shape: [[0, 0], [1, 0], [2, 0]] },
  { name: "弯角", cost: 3, time: 3, income: 1, color: "#f08d6c", shape: [[0, 0], [0, 1], [1, 1], [2, 1]] },
  { name: "阶梯", cost: 4, time: 4, income: 1, color: "#64b883", shape: [[0, 0], [1, 0], [1, 1], [2, 1], [2, 2]] },
  { name: "十字", cost: 5, time: 5, income: 2, color: "#d79ce3", shape: [[1, 0], [0, 1], [1, 1], [2, 1], [1, 2]] },
  { name: "长条", cost: 2, time: 4, income: 0, color: "#5fbfc2", shape: [[0, 0], [1, 0], [2, 0], [3, 0]] },
  { name: "方巾", cost: 3, time: 2, income: 1, color: "#f1c84c", shape: [[0, 0], [1, 0], [0, 1], [1, 1]] },
  { name: "钩形", cost: 4, time: 3, income: 1, color: "#9b87f5", shape: [[0, 0], [0, 1], [0, 2], [1, 2]] },
  { name: "大靴", cost: 6, time: 5, income: 2, color: "#df6f8f", shape: [[0, 0], [0, 1], [1, 1], [2, 1], [2, 2], [3, 2]] },
  { name: "小角", cost: 1, time: 1, income: 0, color: "#8eb85b", shape: [[0, 0], [1, 0], [0, 1]] },
  { name: "门框", cost: 5, time: 4, income: 2, color: "#e29b3c", shape: [[0, 0], [1, 0], [2, 0], [0, 1], [2, 1]] },
  { name: "斜带", cost: 3, time: 3, income: 1, color: "#52a3a6", shape: [[0, 0], [1, 0], [1, 1], [2, 1]] },
  { name: "大块", cost: 7, time: 6, income: 3, color: "#c96b5c", shape: [[0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1]] },
];

const players = {
  blue: makePlayer("蓝方"),
  red: makePlayer("红方"),
};

let current = "blue";
let selectedIndex = null;
let orientedShape = [];
let remainingPatches = [];
let gameOver = false;

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
  newGameBtn: document.querySelector("#newGameBtn"),
};

function makePlayer(label) {
  return {
    label,
    buttons: 5,
    time: 0,
    income: 1,
    board: Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(null)),
  };
}

function startGame() {
  players.blue = makePlayer("蓝方");
  players.red = makePlayer("红方");
  current = "blue";
  selectedIndex = null;
  orientedShape = [];
  remainingPatches = shuffle(PATCHES).slice(0, 10);
  gameOver = false;
  document.body.classList.remove("game-over");
  nodes.logList.innerHTML = "";
  buildBoards();
  renderAll();
  log("新局开始，蓝方先手。");
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
        cell.addEventListener("click", () => placePatch(id, x, y));
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
  nodes.patchList.innerHTML = "";
  remainingPatches.forEach((patch, index) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = `patch-card${index === selectedIndex ? " selected" : ""}`;
    card.disabled = gameOver || players[current].buttons < patch.cost;
    card.append(makeMiniGrid(patch.shape, patch.color));
    card.insertAdjacentHTML(
      "beforeend",
      `<span class="patch-name">${patch.name}</span><span class="patch-meta">花费 ${patch.cost} · 时间 ${patch.time} · 收入 +${patch.income}</span>`,
    );
    card.addEventListener("click", () => selectPatch(index));
    nodes.patchList.append(card);
  });
}

function renderSelected() {
  nodes.selectedPreview.innerHTML = "";
  if (selectedIndex === null) {
    nodes.selectedMeta.textContent = "请选择一块布料。";
    return;
  }
  const patch = remainingPatches[selectedIndex];
  nodes.selectedPreview.append(makeMiniGrid(orientedShape, patch.color, true));
  nodes.selectedMeta.textContent = `${patch.name}：花费 ${patch.cost} 纽扣，推进 ${patch.time} 格，收入 +${patch.income}。`;
}

function renderTrack() {
  nodes.timeTrack.innerHTML = "";
  for (let i = 0; i <= FINISH_TIME; i += 1) {
    const cell = document.createElement("div");
    cell.className = `track-cell${INCOME_SPOTS.has(i) ? " income" : ""}`;
    cell.textContent = i;
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
    document.querySelector(`#${id}Score`).textContent = scorePlayer(players[id]);
    document.querySelector(`#${id}Panel`).classList.toggle("active", current === id && !gameOver);
    document.querySelector(`#${id}Turn`).textContent = current === id && !gameOver ? "回合中" : "等待";
  }
}

function selectPatch(index) {
  if (gameOver) return;
  const patch = remainingPatches[index];
  if (players[current].buttons < patch.cost) {
    log(`${players[current].label} 纽扣不足，不能选择 ${patch.name}。`);
    return;
  }
  selectedIndex = index;
  orientedShape = normalize(patch.shape);
  clearPreview();
  renderAll();
}

function placePatch(boardId, x, y) {
  if (gameOver || boardId !== current || selectedIndex === null) return;
  const player = players[current];
  const patch = remainingPatches[selectedIndex];
  if (!canPlace(player, orientedShape, x, y)) {
    log(`${player.label} 不能把 ${patch.name} 放在这里。`);
    return;
  }

  for (const [dx, dy] of orientedShape) {
    player.board[y + dy][x + dx] = patch.color;
  }
  player.buttons -= patch.cost;
  player.income += patch.income;
  advanceTime(player, patch.time);
  log(`${player.label} 放置 ${patch.name}，花费 ${patch.cost}，推进 ${patch.time}。`);
  remainingPatches.splice(selectedIndex, 1);
  selectedIndex = null;
  orientedShape = [];

  if (isGameDone()) {
    finishGame();
    return;
  }

  chooseNextPlayer();
  ensurePlayableTurn();
  renderAll();
}

function advanceTime(player, steps) {
  const start = player.time;
  player.time = Math.min(FINISH_TIME, player.time + steps);
  for (let spot = start + 1; spot <= player.time; spot += 1) {
    if (INCOME_SPOTS.has(spot)) {
      player.buttons += player.income;
      log(`${player.label} 到达收入点，获得 ${player.income} 纽扣。`);
    }
  }
}

function chooseNextPlayer() {
  if (players.blue.time === players.red.time) {
    current = current === "blue" ? "red" : "blue";
  } else {
    current = players.blue.time < players.red.time ? "blue" : "red";
  }
  nodes.statusText.textContent = `${players[current].label} 行动：选择布料并放到自己的拼布板。`;
}

function ensurePlayableTurn() {
  let guard = 0;
  while (!gameOver && !canCurrentPlayerAct() && guard < 4) {
    const player = players[current];
    const gain = Math.max(1, Math.min(3, FINISH_TIME - player.time));
    player.buttons += gain;
    advanceTime(player, 1);
    log(`${player.label} 无法购买布料，整理边角料获得 ${gain} 纽扣并前进 1。`);
    if (isGameDone()) {
      finishGame();
      return;
    }
    chooseNextPlayer();
    guard += 1;
  }
}

function canCurrentPlayerAct() {
  const player = players[current];
  return remainingPatches.some((patch) => player.buttons >= patch.cost && hasPlacement(player, patch.shape));
}

function hasPlacement(player, shape) {
  const variants = uniqueVariants(shape);
  return variants.some((variant) => {
    for (let y = 0; y < BOARD_SIZE; y += 1) {
      for (let x = 0; x < BOARD_SIZE; x += 1) {
        if (canPlace(player, variant, x, y)) return true;
      }
    }
    return false;
  });
}

function previewPlacement(boardId, x, y) {
  clearPreview();
  if (gameOver || boardId !== current || selectedIndex === null) return;
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

function rotateSelected() {
  if (selectedIndex === null || gameOver) return;
  orientedShape = normalize(orientedShape.map(([x, y]) => [y, -x]));
  renderSelected();
}

function flipSelected() {
  if (selectedIndex === null || gameOver) return;
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

function uniqueVariants(shape) {
  const variants = [];
  let currentShape = normalize(shape);
  for (let i = 0; i < 4; i += 1) {
    variants.push(currentShape);
    variants.push(normalize(currentShape.map(([x, y]) => [-x, y])));
    currentShape = normalize(currentShape.map(([x, y]) => [y, -x]));
  }
  const seen = new Set();
  return variants.filter((variant) => {
    const key = JSON.stringify(variant);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function scorePlayer(player) {
  const empty = player.board.flat().filter((cell) => !cell).length;
  return player.buttons + player.income * 2 - empty;
}

function isGameDone() {
  return remainingPatches.length === 0 || (players.blue.time >= FINISH_TIME && players.red.time >= FINISH_TIME);
}

function finishGame() {
  gameOver = true;
  document.body.classList.add("game-over");
  const blueScore = scorePlayer(players.blue);
  const redScore = scorePlayer(players.red);
  const result = blueScore === redScore ? "平局" : blueScore > redScore ? "蓝方获胜" : "红方获胜";
  nodes.statusText.textContent = `${result}：蓝方 ${blueScore}，红方 ${redScore}。`;
  log(`终局计分：蓝方 ${blueScore}，红方 ${redScore}，${result}。`);
  renderAll();
}

function log(message) {
  const item = document.createElement("li");
  item.textContent = message;
  nodes.logList.prepend(item);
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

nodes.rotateBtn.addEventListener("click", rotateSelected);
nodes.flipBtn.addEventListener("click", flipSelected);
nodes.newGameBtn.addEventListener("click", startGame);

startGame();
