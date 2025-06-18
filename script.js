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

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawBullets();
  requestAnimationFrame(gameLoop);
}

gameLoop();
