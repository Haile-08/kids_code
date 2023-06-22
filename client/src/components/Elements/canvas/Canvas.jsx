import React, { useEffect, useRef } from 'react';
import {
  BallMovement,
  DropBox,
  WallCollision,
  checkMode,
  DrawLine,
} from '../../../utils';
import img2 from '../../../assets/img2.png';
import './style.css';

// eslint-disable-next-line react/prop-types, react/function-component-definition
const Canvas = ({ EngineOutput, GameAnswer, setCorrect }) => {
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
  };
  let color = 'green';
  // eslint-disable-next-line prefer-const
  let mode = ['straight', 'up', 'back', 'down'];

  const handleEngineOutput = (obj, index) => {
    color = checkMode(varObj, dropBox, obj.name, obj.value, mode);
    WallCollision(varObj, mode[varObj.mode]);
    drawLine.push({ x: varObj.x, y: varObj.y, mode: varObj.mode });
  };

  //compare the two array
  function checkAnswer(arr1, arr2) {
    if (arr1.length === arr2.length) {
      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i].name !== arr2[i].name || arr1[i].value !== arr2[i].value) {
          return false;
        }
      }
      return true;
    } else {
      return false;
    }
  }
  if (checkAnswer(EngineOutput, GameAnswer)) {
    setCorrect(1);
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
        BallMovement(ctx, varObj.x, varObj.y, color, varObj.mode);
      } else {
        BallMovement(ctx, varObj.x, varObj.y, 'green', varObj.mode);
      }
      dropBox.forEach((item) => {
        DropBox(ctx, item.x, item.y);
      });
      drawLine.forEach((item) => {
        DrawLine(ctx, item.x, item.y, item.mode);
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
