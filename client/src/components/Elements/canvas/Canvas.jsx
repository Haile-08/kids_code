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
  // Canvas Variables
  // eslint-disable-next-line prefer-const
  let dropBox = [];
  // eslint-disable-next-line prefer-const
  let ObjVar = {
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
    checkMode(dropBox, ObjVar, obj.name, obj.value, mode);
    WallCollision(ObjVar, mode[ObjVar.mode]);
    checkAnswer(ObjVar, GameAnswer, obj.name, obj.value, index);
  };
  if (ObjVar.checker === true) {
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
      const index = EngineOutput.length - 1;
      if (index >= 0) {
        BallMovement(ctx, ObjVar.x, ObjVar.y, ObjVar.color, 20);
      } else {
        BallMovement(ctx, ObjVar.x, ObjVar.y, 'blue', 20);
      }
      dropBox.forEach((item) => {
        DropBox(ctx, item.x, item.y);
      });
      requestAnimationFrame(render);
    };
    render();
  }, [EngineOutput]);

  return (
    <div className="canvas">
      <canvas width="600" height="400" ref={CanvasRef} />
    </div>
  );
};

export default Canvas;
