const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// ================== Jugador ==================
const player = {
  x: canvas.width / 2 - 15,
  y: canvas.height - 40,
  width: 30,
  height: 20,
  color: "lime",
  speed: 5
};

// ================== Balas ==================
let bullets = [];

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") player.x -= player.speed;
  if (e.key === "ArrowRight") player.x += player.speed;
  if (e.key === " " || e.key === "ArrowUp") {
    bullets.push({
      x: player.x + player.width / 2 - 2,
      y: player.y,
      width: 4,
      height: 10
    });
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

// ================== Enemigos ==================
const enemyRows = 4;
const enemyCols = 8;
const enemies = [];
const enemyWidth = 30;
const enemyHeight = 20;
const enemySpacing = 10;
let enemyDirection = 1;
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
      enemy.y += 10;
    });
  }
}

// ================== Colisiones ==================
function checkCollisions() {
  bullets.forEach((bullet, bIndex) => {
    enemies.forEach((enemy) => {
      if (
        enemy.alive &&
        bullet.x < enemy.x + enemy.width &&
        bullet.x + bullet.width > enemy.x &&
        bullet.y < enemy.y + enemy.height &&
        bullet.y + bullet.height > enemy.y
      ) {
        enemy.alive = false;
        bullets.splice(bIndex, 1);
        score += 10;
      }
    });
  });
}

// ================== Puntaje ==================
let score = 0;

function drawScore() {
  ctx.fillStyle = "white";
  ctx.font = "16px Arial";
  ctx.fillText("Score: " + score, 10, 20);
}

// ================== Verificar Victoria o Derrota ==================
function allEnemiesDefeated() {
  return enemies.every(enemy => !enemy.alive);
}

function checkGameOver() {
  return enemies.some(enemy =>
    enemy.alive &&
    enemy.y + enemy.height >= player.y &&
    enemy.x < player.x + player.width &&
    enemy.x + enemy.width > player.x
  );
}

let gameWon = false;
let gameOver = false;

// ================== Bucle Principal ==================
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (gameOver) {
    ctx.fillStyle = "red";
    ctx.font = "30px Arial";
    ctx.fillText("💀 ¡Perdiste!", canvas.width / 2 - 100, canvas.height / 2);
    ctx.font = "20px Arial";
    ctx.fillText("Reiniciando en 10 segundos...", canvas.width / 2 - 130, canvas.height / 2 + 40);
  } 
  else if (gameWon) {
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText("🎉 ¡Juego Completado!", canvas.width / 2 - 150, canvas.height / 2);
    ctx.font = "20px Arial";
    ctx.fillText("Reiniciando en 10 segundos...", canvas.width / 2 - 130, canvas.height / 2 + 40);
  } 
  else {
    drawPlayer();
    drawBullets();
    moveEnemies();
    drawEnemies();
    checkCollisions();
    drawScore();

    if (allEnemiesDefeated()) {
      gameWon = true;
      setTimeout(() => location.reload(), 10000);
    }

    if (checkGameOver()) {
      gameOver = true;
      setTimeout(() => location.reload(), 10000);
    }
  }

  requestAnimationFrame(gameLoop);
}

gameLoop();

