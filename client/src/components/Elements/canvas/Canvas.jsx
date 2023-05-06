import React, { useEffect, useRef } from 'react';
import {
  BallMovement,
  DropBox,
  checkAnswer,
  WallCollision,
  checkMode,
} from '../../../utils';
import img2 from '../../../assets/img2.png';
import './style.css';

// eslint-disable-next-line react/prop-types, react/function-component-definition
const Canvas = ({ EngineOutput, GameAnswer }) => {
  const CanvasRef = useRef(null);
  console.log(EngineOutput);
  // Canvas Variables
  // eslint-disable-next-line prefer-const
  let dropBox = [];
  // eslint-disable-next-line prefer-const
  let varObj = {
    x: 100,
    y: 100,
    dx: 50,
    dy: 50,
    color: 'blue',
    mode: 0,
    checker: true,
  };
  // eslint-disable-next-line prefer-const
  let mode = ['straight', 'up', 'back', 'down'];

  const handleEngineOutput = (obj, index) => {
    console.log(`loop name: ${obj.name}`);
    console.log(`loop value: ${obj.value}`);
    checkMode(varObj, dropBox, obj.name, obj.value, mode);
    WallCollision(varObj, mode[varObj.mode]);
    checkAnswer(varObj, GameAnswer, obj.name, obj.value, index);
  };
  if (varObj.checker === true) {
    console.log('correct');
  } else {
    console.log('fail');
  }
  console.log(`color: ${varObj.color}`);
  console.log(`x: ${varObj.x}`);
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
        BallMovement(ctx, varObj.x, varObj.y, varObj.color, 20);
      } else {
        BallMovement(ctx, varObj.x, varObj.y, 'blue', 20);
      }
      dropBox.forEach((item) => {
        DropBox(ctx, item.x, item.y);
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
