const state = {
  points: 200,
  multiplier: 0,
  radius: 120,
  dash: new Array(40).fill().map((_, i) => i * 2)
};

function _getSequence(points, multiplier) {
  const sequence = [];
  for (let i = 0; i < points; i++) {
    sequence.push([i / points, ((i * multiplier) % points) / points]);
  }
  return sequence;
}

function _getAngles(points, sequence) {
  return sequence.map(segment => segment.map(point => point * 2 * Math.PI));
}

function getRadius(r) {
  return Math.random() * r;
}

function _getLines(radius, angles) {
  return angles.map(segment =>
    segment.map(angle => [radius * Math.cos(angle), radius * Math.sin(angle)])
  );
}

function drawLines(ctx, { points, multiplier, radius }) {
  const sequence = _getSequence(points, multiplier);
  const angles = _getAngles(points, sequence);
  const lines = _getLines(radius, angles);

  lines.forEach(([start, end], i) => {
    ctx.strokeStyle = `hsl(${((angles[i][0] + angles[i][1]) / Math.PI) *
      180}, 100%, 60%)`;
    ctx.beginPath();
    ctx.moveTo(...start);
    ctx.lineTo(...end);
    ctx.stroke();
  });
}

function reset(ctx) {
  const { width, height } = ctx.canvas;
  ctx.clearRect(-width / 2, -height / 2, width, height);
}

const cvs = document.createElement("canvas");
const ctx = cvs.getContext("2d");

cvs.width = 250;
cvs.height = 250;

ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2);
ctx.lineWidth = 1.2;
ctx.globalCompositeOperation = "lighten";

document.body.appendChild(cvs);

requestAnimationFrame(function anim(timestamp) {
  state.multiplier += 0.01;
  const dash = state.dash.map(x => {
    return x * (((1 + Math.sin(timestamp / 1000)) / 2) * 0.8 + 0.2);
  });
  ctx.setLineDash(dash);
  reset(ctx);
  drawLines(ctx, state);

  requestAnimationFrame(anim);
});
