import React from 'react';
import { HiOutlineChevronLeft } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Canvas, CodeView, Commands } from '../../Elements';
import Answer from '../../../Data/Data';
import { QuestionsList } from '../../../Data/Data';
import '../style.css';
import {
  colorAction,
  colorTypeAction,
  resetCode,
  moveAction,
  modalOff,
  modalOn,
} from '../../../state/actionSlice';
import { selectEngineOutput } from '../../../state/actionSlice';
import { motion } from 'framer-motion';

function Level1() {
  const dispatch = useDispatch();
  const EngineOutput = useSelector(selectEngineOutput);
  const GameAnswer = Answer.level1;
  const navigate = useNavigate();
  const correct = useSelector((state) => state.action.modal);

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
    dispatch(modalOn());
  }
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

  const handleMovementType = () => {
    dispatch(moveAction());
  };
  const handleModal = () => {
    dispatch(resetCode());
    dispatch(modalOff());
    console.log('i was here');
    navigate('/quiz', { state: { data: QuestionsList.quiz1, level: 2 } });
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
          <Commands EngineOutput={EngineOutput} GameAnswer={GameAnswer} />
        </div>
        <div className="actions-sm-size">
          <button type="button" onClick={() => handleColor()}>
            Color()
          </button>
          <button type="button" onClick={() => handleColorType('red')}>
            red
          </button>
          <button type="button" onClick={() => handleColorType('green')}>
            Green
          </button>
          <button type="button" onClick={() => handleColorType('yellow')}>
            yellow
          </button>
          <button type="button" onClick={() => handleMovementType()}>
            move
          </button>
        </div>
      </div>
      <div className="canvasout">
        <Canvas EngineOutput={EngineOutput} GameAnswer={GameAnswer} />
        <Canvas EngineOutput={GameAnswer} GameAnswer={EngineOutput} />
      </div>

      {correct && (
        <div className="modal">
          <div className="modal-container">
            <motion.h2
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 140 }}
            >
              {' '}
              Congratulations you have finished this level.
            </motion.h2>
            <motion.button
              className="modalBtn"
              onClick={() => handleModal()}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.2 }}
            >
              take quiz
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Level1;
