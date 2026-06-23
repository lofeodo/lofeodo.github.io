const CANVAS_WIDTH = 60;
const MAX_AMP = 28;
const FREQ = 0.018;

const leftCanvas = document.createElement('canvas');
const rightCanvas = document.createElement('canvas');

for (const c of [leftCanvas, rightCanvas]) {
  c.style.position = 'fixed';
  c.style.top = '0';
  c.style.width = CANVAS_WIDTH + 'px';
  c.style.zIndex = '7';
  c.style.pointerEvents = 'none';
  document.body.appendChild(c);
}

let leftX = 0;
let rightX = 0;

function updatePositions() {
  const topLeft = document.querySelector('.page .top-left');
  const topRight = document.querySelector('.page .top-right');
  if (!topLeft || !topRight) return;

  const lRect = topLeft.getBoundingClientRect();
  const rRect = topRight.getBoundingClientRect();
  leftX = lRect.right;
  rightX = rRect.left;

  const dpr = window.devicePixelRatio || 1;
  const h = window.innerHeight;

  for (const c of [leftCanvas, rightCanvas]) {
    c.width = CANVAS_WIDTH * dpr;
    c.height = h * dpr;
    c.style.height = h + 'px';
  }

  leftCanvas.style.left = (leftX - CANVAS_WIDTH / 2) + 'px';
  rightCanvas.style.left = (rightX - CANVAS_WIDTH / 2) + 'px';
}

window.addEventListener('resize', updatePositions);
window.addEventListener('load', updatePositions);
updatePositions();

let prevScrollY = window.scrollY;
let scrollVelocity = 0;

window.addEventListener('scroll', () => {
  scrollVelocity = window.scrollY - prevScrollY;
  prevScrollY = window.scrollY;
}, { passive: true });

let amplitude = 0;
let phase = 0;

function drawLine(ctx, canvasW, canvasH, amp, ph, direction) {
  const dpr = window.devicePixelRatio || 1;
  ctx.clearRect(0, 0, canvasW, canvasH);

  const cx = (canvasW / 2);
  ctx.beginPath();
  ctx.strokeStyle = 'white';
  ctx.lineWidth = 1.5 * dpr;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

  for (let py = 0; py <= canvasH; py += 2) {
    const x = cx + direction * amp * dpr * Math.sin(FREQ * (py / dpr) + ph);
    if (py === 0) ctx.moveTo(x, py);
    else ctx.lineTo(x, py);
  }

  ctx.stroke();
}

function animate() {
  scrollVelocity *= 0.82;
  const targetAmp = Math.min(Math.abs(scrollVelocity) * 1.8, MAX_AMP);
  amplitude += (targetAmp - amplitude) * 0.12;
  phase += 0.08 + amplitude * 0.008;

  const dpr = window.devicePixelRatio || 1;
  const lCtx = leftCanvas.getContext('2d');
  const rCtx = rightCanvas.getContext('2d');

  drawLine(lCtx, leftCanvas.width, leftCanvas.height, amplitude, phase, 1);
  drawLine(rCtx, rightCanvas.width, rightCanvas.height, amplitude, phase, -1);

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
