// scenes.js — the six morning-market stalls.
// Each scene draws itself on a 560x400 canvas. When `right` is true the
// picture is drawn with that scene's differences applied: an item missing,
// a colour swapped, or a number changed. Every difference has an x, y and
// radius in the same 560x400 space, so a click on either panel can be
// checked against the same list.
import { circle, ellipse, rect, roundRect, poly, star, text, sky, ground, awning, table, sun, cloud, bird, basket, priceTag } from './draw.js';

function fruitDraw(ctx, right) {
  sky(ctx, '#7ec8f7', '#dff6ff');
  if (!right) sun(ctx, 70, 60, '#ffd93b');
  cloud(ctx, 400, 50);
  if (!right) bird(ctx, 480, 70);
  awning(ctx, ['#e63946', '#ffffff']);
  text(ctx, 'BUAH SEGAR', 280, 92, 26, '#ffffff');
  table(ctx, '#c98f4e');
  // fruit piles on the table, left to right
  if (!right) { circle(ctx, 120, 205, 24, '#e63946', '#231303'); circle(ctx, 120, 205, 8, '#ff8fa3'); }
  circle(ctx, 210, 205, 24, right ? '#7ec850' : '#ff8c00', '#231303');
  if (!right) { ellipse(ctx, 300, 200, 26, 12, '#ffd93b', '#231303'); ellipse(ctx, 300, 214, 24, 10, '#ffe66d', '#231303'); }
  poly(ctx, [[380, 230], [400, 180], [440, 180], [460, 230]], right ? '#ffd93b' : '#e63946', '#231303');
  poly(ctx, [[400, 180], [420, 150], [440, 180]], '#2a9d8f', '#231303');
  circle(ctx, 480, 195, 12, right ? '#7ec850' : '#9b5de5', '#231303');
  circle(ctx, 498, 210, 12, right ? '#7ec850' : '#9b5de5', '#231303');
  circle(ctx, 462, 212, 12, right ? '#7ec850' : '#9b5de5', '#231303');
  basket(ctx, 60, 240, 90, '#b08968');
  basket(ctx, 420, 240, 90, '#b08968');
  circle(ctx, 90, 232, 12, '#e63946', '#231303');
  circle(ctx, 115, 232, 12, '#ff8c00', '#231303');
  circle(ctx, 460, 232, 12, '#7ec850', '#231303');
  circle(ctx, 485, 232, 12, '#e63946', '#231303');
  ground(ctx, '#7ec850');
  rect(ctx, 0, 330, 560, 6, '#5aa843');
  priceTag(ctx, 280, 300, right ? '7K' : '5K', '#e63946');
  text(ctx, 'Apel  •  Jeruk  •  Pisang  •  Semangka', 280, 362, 18, '#231303');
}

function coffeeDraw(ctx, right) {
  sky(ctx, '#f7c873', '#fff1d6');
  sun(ctx, 80, 60, right ? '#ff8c00' : '#ffd93b');
  cloud(ctx, 380, 48);
  if (!right) bird(ctx, 470, 66);
  awning(ctx, ['#6b4423', '#fff1d6']);
  text(ctx, 'KOPI PAGI', 280, 92, 26, '#ffffff');
  table(ctx, '#8b5a2b');
  // coffee pot
  poly(ctx, [[285, 160], [315, 160], [325, 230], [275, 230]], right ? '#2a9d8f' : '#6b4423', '#231303');
  rect(ctx, 315, 180, 22, 10, '#231303');
  if (!right) { circle(ctx, 140, 205, 20, '#ffffff', '#231303'); ellipse(ctx, 140, 192, 14, 6, '#6b4423'); }
  circle(ctx, 210, 205, 20, '#ffffff', '#231303');
  ellipse(ctx, 210, 192, 14, 6, '#6b4423');
  if (!right) {
    ctx.strokeStyle = '#b0b0b0'; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(210, 178); ctx.quadraticCurveTo(200, 160, 210, 144); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(224, 178); ctx.quadraticCurveTo(234, 160, 224, 144); ctx.stroke();
  }
  if (!right) { poly(ctx, [[380, 230], [410, 190], [440, 230]], '#ffe66d', '#231303'); circle(ctx, 410, 186, 8, '#e63946'); }
  circle(ctx, 480, 210, 16, '#c0c0c0', '#231303');
  rect(ctx, 492, 196, 6, 28, '#c0c0c0');
  // coffee beans scattered on the table
  ellipse(ctx, 90, 240, 10, 7, '#4a2c14');
  ellipse(ctx, 170, 242, 10, 7, '#4a2c14');
  ellipse(ctx, 250, 242, 10, 7, '#4a2c14');
  ellipse(ctx, 340, 242, 10, 7, '#4a2c14');
  ellipse(ctx, 520, 242, 10, 7, '#4a2c14');
  basket(ctx, 60, 240, 80, '#b08968');
  ground(ctx, '#d9a066');
  rect(ctx, 0, 330, 560, 6, '#b07a45');
  priceTag(ctx, 280, 300, right ? '10K' : '8K', '#6b4423');
  text(ctx, 'Kopi tubruk  •  Gula aren  •  Kue lapis', 280, 362, 18, '#231303');
}

function flowerDraw(ctx, right) {
  sky(ctx, '#a8e6cf', '#f3ffe8');
  sun(ctx, 480, 60, '#ffd93b');
  cloud(ctx, 90, 50);
  if (!right) { poly(ctx, [[300, 90], [330, 60], [360, 90]], '#ff6b9d'); circle(ctx, 330, 66, 10, '#ff6b9d'); }
  awning(ctx, ['#ff6b9d', '#ffffff']);
  text(ctx, 'BUNGA SEGAR', 280, 92, 26, '#ffffff');
  table(ctx, '#7ec850');
  // pots with flowers
  const pots = [
    { x: 100, pot: '#e63946', bloom: '#e63946' },
    { x: 200, pot: '#2a9d8f', bloom: '#ffd93b' },
    { x: 300, pot: '#f4a261', bloom: right ? '#7ec850' : '#ff6b9d' },
    { x: 400, pot: '#9b5de5', bloom: right ? '#ff6b9d' : '#9b5de5' },
    { x: 495, pot: '#e63946', bloom: right ? '#e63946' : '#ff8c00' },
  ];
  for (const p of pots) {
    if (p.x === 200 && right) continue; // sunflower missing on the right
    const potColor = p.x === 100 && right ? '#2a9d8f' : p.pot; // first pot changes colour
    rect(ctx, p.x - 8, 170, 16, 60, '#2a9d8f');
    for (let i = 0; i < 5; i++) {
      const a = (i * Math.PI * 2) / 5;
      circle(ctx, p.x + Math.cos(a) * 16, 158 + Math.sin(a) * 16, 12, p.bloom, '#231303');
    }
    circle(ctx, p.x, 158, 12, '#ffe66d', '#231303');
    poly(ctx, [[p.x - 32, 232], [p.x + 32, 232], [p.x + 24, 268], [p.x - 24, 268]], potColor, '#231303');
  }
  if (!right) { circle(ctx, 150, 300, 10, '#ff6b9d'); circle(ctx, 165, 295, 10, '#ffe66d'); }
  basket(ctx, 430, 300, 80, '#b08968');
  ground(ctx, '#7ec850');
  rect(ctx, 0, 330, 560, 6, '#5aa843');
  priceTag(ctx, 280, 300, right ? '15K' : '12K', '#e63946');
  text(ctx, 'Mawar  •  Melati  •  Anggrek  •  Matahari', 280, 362, 18, '#231303');
}

function fishDraw(ctx, right) {
  sky(ctx, '#4aa8dd', '#cfeeff');
  sun(ctx, 90, 60, '#ffd93b');
  cloud(ctx, 400, 50);
  if (!right) bird(ctx, 480, 70);
  if (!right) bird(ctx, 430, 90);
  awning(ctx, ['#2a9d8f', '#ffffff']);
  text(ctx, 'IKAN SEGAR', 280, 92, 26, '#ffffff');
  table(ctx, '#bfe8ff');
  // fish lying on ice
  const fishes = [
    { x: 110, c: '#4aa8dd' },
    { x: 200, c: '#c0c0c0' },
    { x: 290, c: right ? '#4aa8dd' : '#ff8c00' },
    { x: 380, c: '#4aa8dd' },
    { x: 465, c: '#ff6b9d' },
  ];
  for (const f of fishes) {
    if (f.x === 380 && right) continue; // one blue fish missing on the right
    const fy = f.x === 200 && right ? 232 : 210; // silver fish slides down on the right
    ellipse(ctx, f.x, fy, 34, 14, f.c, '#231303');
    poly(ctx, [[f.x + 30, fy], [f.x + 48, fy - 14], [f.x + 48, fy + 14]], f.c, '#231303');
    circle(ctx, f.x - 20, fy - 4, 4, '#231303');
  }
  // crab
  if (!right) {
    circle(ctx, 90, 300, 16, '#e63946', '#231303');
    circle(ctx, 74, 286, 7, '#e63946', '#231303');
    circle(ctx, 106, 286, 7, '#e63946', '#231303');
  }
  star(ctx, 520, 300, 16, right ? '#7ec850' : '#ff8c00');
  // buckets
  poly(ctx, [[180, 300], [230, 300], [224, 340], [186, 340]], '#e63946', '#231303');
  poly(ctx, [[300, 300], [350, 300], [344, 340], [306, 340]], right ? '#2a9d8f' : '#f4a261', '#231303');
  ground(ctx, '#e8d8a8');
  rect(ctx, 0, 330, 560, 6, '#c9b078');
  priceTag(ctx, 280, 300, right ? '25K' : '20K', '#2a9d8f');
  text(ctx, 'Ikan laut  •  Udang  •  Kepiting  •  Cumi', 280, 362, 18, '#231303');
}

function fabricDraw(ctx, right) {
  sky(ctx, '#ffd6e8', '#fff6fa');
  sun(ctx, 480, 60, '#ffd93b');
  cloud(ctx, 90, 50);
  if (!right) bird(ctx, 130, 70);
  awning(ctx, ['#9b5de5', '#ffffff']);
  text(ctx, 'KAIN BATIK', 280, 92, 26, '#ffffff');
  table(ctx, '#f4a261');
  // rolls of cloth standing on the table
  const rolls = [
    { x: 100, c: '#e63946', stripe: true },
    { x: 185, c: '#2a9d8f', stripe: false },
    { x: 270, c: '#ffd93b', stripe: true },
    { x: 355, c: '#4aa8dd', stripe: false },
    { x: 445, c: right ? '#2a9d8f' : '#7ec850', stripe: true },
  ];
  for (const r of rolls) {
    if (r.x === 185 && right) continue; // teal roll missing on the right
    const striped = r.stripe && !(right && r.x === 100); // red roll loses its stripes
    roundRect(ctx, r.x - 28, 150, 56, 96, 10, r.c, '#231303');
    if (striped) {
      ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 6;
      ctx.beginPath(); ctx.moveTo(r.x - 28, 180); ctx.lineTo(r.x + 28, 180); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(r.x - 28, 215); ctx.lineTo(r.x + 28, 215); ctx.stroke();
    } else {
      circle(ctx, r.x - 12, 180, 6, '#ffffff');
      circle(ctx, r.x + 12, 205, 6, '#ffffff');
      circle(ctx, r.x - 12, 228, 6, '#ffffff');
    }
  }
  // scissors on the table
  if (!right) {
    circle(ctx, 510, 300, 10, '#c0c0c0', '#231303');
    circle(ctx, 530, 300, 10, '#c0c0c0', '#231303');
    poly(ctx, [[510, 295], [470, 270], [478, 282]], '#c0c0c0', '#231303');
  }
  // buttons
  circle(ctx, 90, 300, 9, '#e63946', '#231303');
  circle(ctx, 115, 300, 9, '#ffd93b', '#231303');
  circle(ctx, 140, 300, 9, right ? '#e63946' : '#2a9d8f', '#231303');
  basket(ctx, 200, 300, 90, '#b08968');
  ground(ctx, '#e8b4d9');
  rect(ctx, 0, 330, 560, 6, '#c98bb8');
  priceTag(ctx, 280, 300, right ? '30K' : '25K', '#9b5de5');
  text(ctx, 'Batik  •  Katun  •  Sutra  •  Selendang', 280, 362, 18, '#231303');
}

function toyDraw(ctx, right) {
  sky(ctx, '#8fd8ff', '#fff3b0');
  sun(ctx, 70, 60, '#ffd93b');
  cloud(ctx, 420, 50);
  if (!right) bird(ctx, 480, 80);
  awning(ctx, ['#ffd93b', '#e63946']);
  text(ctx, 'MAINAN ANAK', 280, 92, 26, '#231303');
  table(ctx, '#f4a261');
  // balloons
  const balloons = [
    { x: 110, c: '#e63946' },
    { x: 170, c: right ? '#e63946' : '#2a9d8f' },
    { x: 230, c: '#ffd93b' },
  ];
  for (const b of balloons) {
    if (b.x === 230 && right) continue; // yellow balloon missing on the right
    ellipse(ctx, b.x, 170, 22, 28, b.c, '#231303');
    ctx.strokeStyle = '#231303'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(b.x, 198); ctx.lineTo(b.x, 240); ctx.stroke();
  }
  // kite
  if (!right) {
    poly(ctx, [[330, 150], [370, 180], [330, 215], [295, 180]], '#ff6b9d', '#231303');
    ctx.strokeStyle = '#231303'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(330, 215); ctx.lineTo(330, 250); ctx.stroke();
  }
  // teddy bear
  circle(ctx, 440, 200, 26, '#b08968', '#231303');
  circle(ctx, 420, 178, 10, '#b08968', '#231303');
  circle(ctx, 460, 178, 10, '#b08968', '#231303');
  circle(ctx, 432, 196, 4, '#231303');
  circle(ctx, 448, 196, 4, '#231303');
  ellipse(ctx, 440, 208, 8, 5, '#231303');
  if (right) circle(ctx, 460, 178, 10, '#e63946', '#231303'); // teddy's ear turns red
  // ball and blocks on the table
  circle(ctx, 300, 300, 22, '#ffffff', '#231303');
  ctx.strokeStyle = '#e63946'; ctx.lineWidth = 6;
  ctx.beginPath(); ctx.arc(300, 300, 22, -0.6, 0.6); ctx.stroke();
  rect(ctx, 350, 282, 34, 34, '#2a9d8f', '#231303');
  text(ctx, right ? 'B' : 'A', 367, 300, 22, '#ffffff');
  rect(ctx, 392, 282, 34, 34, '#ffd93b', '#231303');
  text(ctx, 'C', 409, 300, 22, '#231303');
  // toy car
  roundRect(ctx, 70, 296, 90, 26, 10, '#e63946', '#231303');
  circle(ctx, 92, 324, 10, '#231303');
  circle(ctx, 138, 324, 10, '#231303');
  if (right) circle(ctx, 138, 324, 10, '#ffd93b', '#231303'); // wheel turns yellow
  ground(ctx, '#7ec850');
  rect(ctx, 0, 330, 560, 6, '#5aa843');
  priceTag(ctx, 280, 300, right ? '18K' : '15K', '#e63946');
  text(ctx, 'Balon  •  Layang-layang  •  Boneka  •  Mobil', 280, 362, 17, '#231303');
}

export const SCENES = [
  {
    id: 'fruit', name: 'Fruit Stall', sub: 'Lapak Buah', time: 150, accent: '#e63946', draw: fruitDraw,
    diffs: [
      { x: 120, y: 205, r: 30, label: 'Missing apple' },
      { x: 210, y: 205, r: 30, label: 'Orange turned green' },
      { x: 300, y: 200, r: 30, label: 'Missing bananas' },
      { x: 420, y: 195, r: 32, label: 'Watermelon changed colour' },
      { x: 480, y: 205, r: 30, label: 'Grapes changed colour' },
      { x: 70, y: 60, r: 34, label: 'Missing sun' },
      { x: 480, y: 70, r: 26, label: 'Missing bird' },
      { x: 280, y: 300, r: 30, label: 'Price changed 5K to 7K' },
    ],
  },
  {
    id: 'coffee', name: 'Coffee Stall', sub: 'Warung Kopi', time: 140, accent: '#6b4423', draw: coffeeDraw,
    diffs: [
      { x: 140, y: 205, r: 28, label: 'Missing coffee cup' },
      { x: 215, y: 165, r: 28, label: 'Missing steam' },
      { x: 300, y: 195, r: 32, label: 'Coffee pot changed colour' },
      { x: 410, y: 205, r: 30, label: 'Missing cake slice' },
      { x: 480, y: 210, r: 26, label: 'Missing spoon' },
      { x: 80, y: 60, r: 34, label: 'Sun changed colour' },
      { x: 470, y: 66, r: 26, label: 'Missing bird' },
      { x: 280, y: 300, r: 30, label: 'Price changed 8K to 10K' },
    ],
  },
  {
    id: 'flower', name: 'Flower Stall', sub: 'Lapak Bunga', time: 140, accent: '#ff6b9d', draw: flowerDraw,
    diffs: [
      { x: 200, y: 158, r: 30, label: 'Missing sunflower' },
      { x: 300, y: 158, r: 30, label: 'Pink flower turned green' },
      { x: 330, y: 70, r: 30, label: 'Missing butterfly' },
      { x: 100, y: 232, r: 30, label: 'First pot changed colour' },
      { x: 495, y: 158, r: 30, label: 'Orange flower turned red' },
      { x: 150, y: 298, r: 24, label: 'Missing loose flowers' },
      { x: 400, y: 158, r: 30, label: 'Purple flower turned pink' },
      { x: 280, y: 300, r: 30, label: 'Price changed 12K to 15K' },
    ],
  },
  {
    id: 'fish', name: 'Fish Stall', sub: 'Lapak Ikan', time: 130, accent: '#2a9d8f', draw: fishDraw,
    diffs: [
      { x: 380, y: 210, r: 32, label: 'Missing blue fish' },
      { x: 290, y: 210, r: 32, label: 'Orange fish turned blue' },
      { x: 90, y: 300, r: 28, label: 'Missing crab' },
      { x: 520, y: 300, r: 26, label: 'Starfish changed colour' },
      { x: 325, y: 320, r: 28, label: 'Bucket changed colour' },
      { x: 480, y: 70, r: 26, label: 'Missing bird' },
      { x: 430, y: 90, r: 24, label: 'Missing second bird' },
      { x: 200, y: 210, r: 32, label: 'Silver fish slid down' },
      { x: 280, y: 300, r: 30, label: 'Price changed 20K to 25K' },
    ],
  },
  {
    id: 'fabric', name: 'Fabric Stall', sub: 'Lapak Kain', time: 130, accent: '#9b5de5', draw: fabricDraw,
    diffs: [
      { x: 185, y: 198, r: 32, label: 'Missing teal cloth roll' },
      { x: 445, y: 198, r: 32, label: 'Green roll turned teal' },
      { x: 510, y: 300, r: 28, label: 'Missing scissors' },
      { x: 140, y: 300, r: 24, label: 'Button changed colour' },
      { x: 270, y: 198, r: 32, label: 'Yellow roll lost stripes' },
      { x: 130, y: 70, r: 26, label: 'Missing bird' },
      { x: 100, y: 198, r: 32, label: 'Red roll lost its stripes' },
      { x: 280, y: 300, r: 30, label: 'Price changed 25K to 30K' },
    ],
  },
  {
    id: 'toy', name: 'Toy Stall', sub: 'Lapak Mainan', time: 120, accent: '#ffd93b', draw: toyDraw,
    diffs: [
      { x: 230, y: 170, r: 30, label: 'Missing yellow balloon' },
      { x: 170, y: 170, r: 30, label: 'Balloon changed colour' },
      { x: 330, y: 185, r: 32, label: 'Missing kite' },
      { x: 460, y: 178, r: 22, label: "Teddy's ear turned red" },
      { x: 300, y: 300, r: 28, label: 'Ball stripe missing' },
      { x: 367, y: 300, r: 26, label: 'Block letter A became B' },
      { x: 138, y: 324, r: 22, label: 'Car wheel turned yellow' },
      { x: 480, y: 80, r: 26, label: 'Missing bird' },
      { x: 280, y: 300, r: 30, label: 'Price changed 15K to 18K' },
    ],
  },
];

export function totalDifferences() {
  return SCENES.reduce((n, s) => n + s.diffs.length, 0);
}
