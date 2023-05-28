/* eslint-disable import/named */
/* eslint-disable quotes */
/* eslint-disable import/named */
/* eslint-disable import/no-duplicates */
/* eslint-disable prettier/prettier */
/* eslint-disable react/function-component-definition */

import React from 'react';
import { HiOutlineChevronLeft } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Canvas, CodeView, Commands } from '../../Elements';
import '../style.css';
import {
  variableAction,
  colorAction,
  colorTypeAction,
  resetCode,
  operatorsAction,
  loopAction,
} from '../../../state/actionSlice';
import { selectEngineOutput } from '../../../state/actionSlice';

function Level3() {
  const dispatch = useDispatch();
  const EngineOutput = useSelector(selectEngineOutput);
  const GameAnswer = [
    { name: 'move', value: 'move' },
    { name: 'move', value: 'move' },
    { name: 'move', value: 'move' },
    { name: 'move', value: 'move' },
  ];
  const navigate = useNavigate();

  const handleExit = () => {
    dispatch(resetCode());
    navigate('/main');
  };
  const handleColor = () => {
    dispatch(colorAction());
  };
  const handleColorType = (text) => {
    dispatch(colorTypeAction(text));
  };
  const handleVariable = (text) => {
    dispatch(variableAction(text));
  };

  const handleOperators = (text) => {
    dispatch(operatorsAction(text));
  };

  const handleLoops = (text) => {
    dispatch(loopAction(text));
  };
  return (
    <div className="game-page-container">
      <div className="exit">
        <div className="exitbtn" onClick={handleExit}>
          <HiOutlineChevronLeft />
        </div>
      </div>
      <div className="Buttons-Codespace--Actions">
        <div className="Buttons-Codespace">
          <CodeView />
          <Commands />
        </div>
        <div className="actions">
          <button type="button" onClick={() => handleColor()}>
            Color()
          </button>
          <button type="button" onClick={() => handleVariable('var1')}>
            var1
          </button>
          <button type="button" onClick={() => handleVariable('var2')}>
            var2
          </button>
          <button type="button" onClick={() => handleLoops('for')}>
            for
          </button>
          <button type="button" onClick={() => handleLoops('while')}>
            while
          </button>
          <button type="button" onClick={() => handleOperators('=')}>
            =
          </button>
          <button type="button" onClick={() => handleOperators('>')}>
            {`>`}
          </button>
          <button type="button" onClick={() => handleOperators('<')}>
            {`<`}
          </button>
          <button type="button" onClick={() => handleColorType('red')}>
            red
          </button>
          <button type="button" onClick={() => handleColorType('green')}>
            Green
          </button>
        </div>
      </div>
      <div className="canvasout">
        <Canvas EngineOutput={EngineOutput} GameAnswer={GameAnswer} />
        <Canvas EngineOutput={EngineOutput} GameAnswer={GameAnswer} />
      </div>
    </div>
  );
}

export default Level3;