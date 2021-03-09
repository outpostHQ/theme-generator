function getImage(color) {
  const canvas = document.createElement("canvas");
  canvas.width = 16;
  canvas.height = 16;

  const ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = color;
  ctx.moveTo(2,2);
  ctx.lineTo(2,4);
  ctx.moveTo(14,2);
  ctx.lineTo(14,4);
  ctx.moveTo(2,2);
  ctx.lineTo(14,2);
  ctx.moveTo(8,2);
  ctx.lineTo(8,14);
  ctx.moveTo(6,14);
  ctx.lineTo(10,14);
  ctx.stroke();
  ctx.beginPath();
  ctx.globalCompositeOperation = "source-in";
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 16, 16);
  ctx.fill();

  return canvas.toDataURL();
}

const link = document.querySelector('link[rel="icon"]');

export function setFavIcon(color) {
  const image = getImage(color);

  link.type = 'image/x-icon';
  link.href = image;
}
