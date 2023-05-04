import React from 'react';
import { useSelector } from 'react-redux';
import { Canvas, CodeView, Commands } from '../../Elements';
import '../style.css';

function Level1() {
  const EngineOutput = useSelector((state) => state.action.EngineOutput);
  const GameAnswer = [{ name: 'move', value: 'move' }];
  return (
    <div className="game-page-container">
      <div className="Buttons-Codespace--Actions">
        <div className="Buttons-Codespace">
          <CodeView EngineOutput={EngineOutput} />
          <Commands />
        </div>
        <div className="actions">
          <button>Color()</button>
          <button>blue</button>
          <button>red</button>
          <button>Green</button>
        </div>
      </div>
      <div className="canvasout">
        <Canvas EngineOutput={EngineOutput} GameAnswer={GameAnswer} />
        <Canvas EngineOutput={GameAnswer} GameAnswer={GameAnswer} />
      </div>
    </div>
  );
}

export default Level1;
