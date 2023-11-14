const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const threePIByTwo = (3 * Math.PI) / 2;

const canvasBg = "#1C1C28";

const hourActiveColor = "#39D98A",
  minuteActiveColor = "#FF4837",
  secondActiveColor = "#3E7BFA";

const hourInactiveColor = "#3C4043",
  minuteInactiveColor = "#2E3134",
  secondInactiveColor = "#282A2D";

const timerBg = "#282A2D";

function init() {
  canvas.width = document.documentElement.clientWidth - 35;
  canvas.height = document.documentElement.clientHeight - 45;

  window.requestAnimationFrame(draw);
}

function draw() {
  const centerX = canvas.width / 2,
    centerY = canvas.height / 2;

  const date = new Date();

  let hr = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();
  let ms = date.getMilliseconds();

  const millisecondsInHour = 60 * 60 * 1000;
  const millisecondsInMinute = 60 * 1000;
  const millisecondsInSecond = 1000;

  const radH =
    0.000008333 *
    (hr * millisecondsInHour +
      min * millisecondsInMinute +
      sec * millisecondsInSecond +
      ms);
  const radM =
    0.0001 * (min * millisecondsInMinute + sec * millisecondsInSecond + ms);
  const radS = 0.006 * (sec * millisecondsInSecond + ms);

  drawRect(0, 0, canvas.width, canvas.height, canvasBg);

  drawCircle(
    centerX,
    centerY,
    110,
    0,
    360,
    false,
    hourInactiveColor,
    "stroke",
    90
  );
  drawCircle(
    centerX,
    centerY,
    110,
    threePIByTwo,
    rad(radH) + threePIByTwo,
    false,
    hourActiveColor,
    "stroke",
    90
  );

  drawCircle(
    centerX,
    centerY,
    180,
    0,
    360,
    false,
    minuteInactiveColor,
    "stroke",
    50
  );
  drawCircle(
    centerX,
    centerY,
    180,
    threePIByTwo,
    rad(radM) + threePIByTwo,
    false,
    minuteActiveColor,
    "stroke",
    50
  );

  drawCircle(
    centerX,
    centerY,
    220,
    0,
    360,
    false,
    secondInactiveColor,
    "stroke",
    30
  );
  drawCircle(
    centerX,
    centerY,
    220,
    threePIByTwo,
    rad(radS) + threePIByTwo,
    false,
    secondActiveColor,
    "stroke",
    30
  );

  drawCircle(centerX, centerY, 90, 0, 360, false, timerBg, "fill", "50");
  drawText(
    `${hr.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`,
    canvas.width / 2 - 60,
    canvas.height / 2 + 15,
    "#fff",
    "45px"
  );

  window.requestAnimationFrame(draw);
}

init();

function rad(deg) {
  return (Math.PI / 180) * deg;
}

function drawText(text, x, y, color, size) {
  ctx.font = `${size} "Poppins"`;
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
}

function drawRect(x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

function drawArc(x, y, radius, start, end, clockwise) {
  ctx.beginPath();
  ctx.arc(x, y, radius, start, end, clockwise);
}

function drawCircle(
  x,
  y,
  radius,
  start,
  end,
  clockwise,
  color,
  type,
  thickness
) {
  switch (type) {
    case "fill":
      ctx.fillStyle = color;
      drawArc(x, y, radius, start, end, clockwise);
      ctx.fill();
      break;
    case "stroke":
      ctx.strokeStyle = color;
      ctx.lineWidth = thickness;
      drawArc(x, y, radius, start, end, clockwise);
      ctx.stroke();
      break;
  }
}
