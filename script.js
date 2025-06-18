const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Jugador
const player = {
  x: canvas.width / 2 - 15,
  y: canvas.height - 40,
  width: 30,
  height: 20,
  color: "lime",
  speed: 5
};

// Balas
let bullets = [];

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") player.x -= player.speed;
  if (e.key === "ArrowRight") player.x += player.speed;
  if (e.key === " " || e.key === "ArrowUp") {
    bullets.push({ x: player.x + player.width / 2 - 2, y: player.y, width: 4, height: 10 });
  }
});

function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawBullets() {
  ctx.fillStyle = "lime";
  bullets.forEach((b, i) => {
    b.y -= 7;
    ctx.fillRect(b.x, b.y, b.width, b.height);
    if (b.y < 0) bullets.splice(i, 1);
  });
}

// Enemigos
const enemyRows = 4;
const enemyCols = 8;
const enemies = [];
const enemyWidth = 30;
const enemyHeight = 20;
const enemySpacing = 10;
let enemyDirection = 1; // 1 = derecha, -1 = izquierda
let enemySpeed = 1;

function createEnemies() {
  for (let row = 0; row < enemyRows; row++) {
    for (let col = 0; col < enemyCols; col++) {
      enemies.push({
        x: 50 + col * (enemyWidth + enemySpacing),
        y: 50 + row * (enemyHeight + enemySpacing),
        width: enemyWidth,
        height: enemyHeight,
        alive: true
      });
    }
  }
}
createEnemies();

function drawEnemies() {
  ctx.fillStyle = "white";
  enemies.forEach((enemy) => {
    if (enemy.alive) {
      ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    }
  });
}

function moveEnemies() {
  let shouldReverse = false;
  enemies.forEach((enemy) => {
    if (!enemy.alive) return;
    enemy.x += enemyDirection * enemySpeed;

    if (enemy.x + enemy.width > canvas.width || enemy.x < 0) {
      shouldReverse = true;
    }
  });

  if (shouldReverse) {
    enemyDirection *= -1;
    enemies.forEach((enemy) => {
      enemy.y += 10; // bajan una fila
    });
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawPlayer();
  drawBullets();
  moveEnemies();
  drawEnemies();

}
