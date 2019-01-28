const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palattes = require('nice-color-palettes');

const settings = {
  dimensions: [ 2048, 2048 ]
};

const sketch = () => {

  const createGrid = () => {
    const points = [];
    const count = 40;

    for(let x=0;x<count;x++){
      for(let y=0;y<count;y++){
        const u = count<=1?0.5:x/(count-1);
        const v = count<=1?0.5:y/(count-1);
        
        points.push({
          color: random.pick(palattes),
          radius: Math.abs(0.01 + random.gaussian() * 0.01),
          position: [u, v]
        });
      }
    }

    return points;
  }


  const points = createGrid().filter(() => random.value() > 0.7);
  const margin = 300;


  return ({ context, width, height }) => {
    context.fillStyle = '#283148';
    context.fillRect(0, 0, width, height);
    console.log(points);
    points.map((obj)=>{
        const x = lerp(margin, width - margin, obj.position[0]);
        const y = lerp(margin, height - margin, obj.position[1]);

        context.beginPath();
        context.arc(x, y, obj.radius*width, Math.PI*2, false);        
        context.fillStyle = obj.color[0];
        context.lineWidth = 10;
        context.fill();
    })
  };
};

canvasSketch(sketch, settings);
