import React from 'react';
import { useSelector } from 'react-redux';
import Canvas from '../../Elements/canvas/Canvas';
import CodeView from '../../Elements/CodeView/CodeView';
import Commands from '../../Elements/Commands/Commands';

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
        <div className="actions">sdgsdag</div>
      </div>
      <Canvas EngineOutput={EngineOutput} GameAnswer={GameAnswer} />
      <Canvas EngineOutput={GameAnswer} GameAnswer={GameAnswer} />
    </div>
  );
}

export default Level1;
