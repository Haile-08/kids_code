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
<<<<<<< HEAD
import {
  VariableAction,
  colorAction,
  colorTypeAction,
} from '../../../state/actionSlice';
import { setLogout } from '../../../state/authSlice';
=======
import { colorAction, colorTypeAction } from '../../../state/actionSlice';
import { selectEngineOutput } from '../../../state/actionSlice';
>>>>>>> f0d4084f8ecff7e3d24302e8832d0c627987e76d

function Level1() {
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
    navigate('/main');
  };
  const handleColor = () => {
    dispatch(colorAction());
  };
  const handleColorType = (text) => {
    dispatch(colorTypeAction(text));
  };
  const handleVariable = (text) => {
    dispatch(VariableAction(text));
  };
  return (
    <div className="game-page-container">
      <div className="exit">
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
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
<<<<<<< HEAD
          <button type="button" onClick={() => handleVariable('color')}>
            color
          </button>
=======
>>>>>>> f0d4084f8ecff7e3d24302e8832d0c627987e76d
          <button type="button" onClick={() => handleColorType('red')}>
            red
          </button>
          <button type="button" onClick={() => handleColorType('green')}>
            Green
          </button>
          <button type="button" onClick={() => handleColorType('yellow')}>
            yellow
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

export default Level1;
