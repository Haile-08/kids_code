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
import { colorAction } from '../../../state/actionSlice';
import { selectEngineOutput } from '../../../state/actionSlice';

const Level2 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleColor = () => {
    dispatch(colorAction());
  };
  const EngineOutput = useSelector(selectEngineOutput);
  return (
    <div className="game-page-container">
      <div className="exit">
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <div className="exitbtn" onClick={() => navigate('/main')}>
          <HiOutlineChevronLeft />
        </div>
      </div>
      <div className="Buttons-Codespace--Actions">
        <div className="Buttons-Codespace">
          <CodeView />
          <Commands />
        </div>
        <div className="actions">
          <button type="button" onClick={handleColor()}>
            Color()
          </button>
          <button type="button">var1</button>
          <button type="button">var2</button>
          <button type="button">red</button>
          <button type="button">blue</button>
        </div>
      </div>
      <div className="canvasout">
        <Canvas EngineOutput={EngineOutput} />
        {/* <Canvas EngineOutput={GameAnswer} GameAnswer={GameAnswer} /> */}
      </div>
    </div>
  );
};

export default Level2;
