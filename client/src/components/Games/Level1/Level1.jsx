import React, { useEffect } from 'react';
import { HiOutlineChevronLeft } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Canvas, CodeView, Commands } from '../../Elements';
import '../style.css';
import { colorAction, colorTypeAction } from '../../../state/actionSlice';
import { setLogout } from '../../../state/authSlice';

function Level1() {
  const dispatch = useDispatch();
  const EngineOutput = useSelector((state) => state.action.EngineOutput);
  const GameAnswer = [{ name: 'move', value: 'move' }];
  const navigate = useNavigate();

  useEffect(() => {});
  const handleExit = () => {
    dispatch(setLogout());
    navigate('/');
  };
  const handleColor = () => {
    console.log('hit');
    dispatch(colorAction());
  };
  const handleColorType = (text) => {
    dispatch(colorTypeAction(text));
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
          <button type="button" onClick={() => handleColorType('blue')}>
            blue
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
        <Canvas EngineOutput={GameAnswer} GameAnswer={GameAnswer} />
        <Canvas EngineOutput={EngineOutput} GameAnswer={GameAnswer} />
      </div>
    </div>
  );
}

export default Level1;
