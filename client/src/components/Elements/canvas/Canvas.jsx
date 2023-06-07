import React, { useEffect, useRef } from 'react';
import {
  BallMovement,
  DropBox,
  checkAnswer,
  WallCollision,
  checkMode,
  DrawLine,
} from '../../../utils';
import img2 from '../../../assets/img2.png';
import './style.css';

// eslint-disable-next-line react/prop-types, react/function-component-definition
const Canvas = ({ EngineOutput, GameAnswer }) => {
  const CanvasRef = useRef(null);
  // console.log('engine out put ' + EngineOutput);
  // Canvas Variables
  // eslint-disable-next-line prefer-const
  let dropBox = [];
  let drawLine = [];
  // eslint-disable-next-line prefer-const
  let varObj = {
    x: 100,
    y: 100,
    dx: 50,
    dy: 50,
    mode: 0,
    checker: true,
  };
  let color = 'green';
  // eslint-disable-next-line prefer-const
  let mode = ['straight', 'up', 'back', 'down'];

  const handleEngineOutput = (obj, index) => {
    console.log(`loop name: ${obj.name}`);
    console.log(`loop value: ${obj.value}`);
    color = checkMode(varObj, dropBox, obj.name, obj.value, mode);
    WallCollision(varObj, mode[varObj.mode]);
    checkAnswer(varObj, GameAnswer, obj.name, obj.value, index);
    drawLine.push({ x: varObj.x, y: varObj.y });
  };
  if (varObj.checker === true) {
    console.log('correct');
  } else {
    console.log('fail');
  }
  // eslint-disable-next-line react/prop-types
  EngineOutput.forEach(handleEngineOutput);

  useEffect(() => {
    const render = () => {
      const canvas = CanvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const image = new Image();
      image.src = img2;
      ctx.drawImage(image, 0, 0, 600, 400);
      // eslint-disable-next-line react/prop-types
      const index = EngineOutput.length - 1;
      if (index >= 0) {
        console.log(color);
        BallMovement(ctx, varObj.x, varObj.y, color, varObj.mode);
      } else {
        BallMovement(ctx, varObj.x, varObj.y, 'green', varObj.mode);
      }
      dropBox.forEach((item) => {
        DropBox(ctx, item.x, item.y);
      });
      drawLine.forEach((item) => {
        DrawLine(ctx, item.x, item.y);
      });
      requestAnimationFrame(render);
    };
    render();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [EngineOutput]);

  return (
    <div className="canvas">
      <canvas width="600" height="400" ref={CanvasRef} />
    </div>
  );
};

export default Canvas;
