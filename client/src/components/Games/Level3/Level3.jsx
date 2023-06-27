import React from 'react';
import { HiOutlineChevronLeft } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Canvas, CodeView, Commands } from '../../Elements';
import Answer from '../../../Data/Data';
import { QuestionsList } from '../../../Data/Data';
import '../style.css';
import {
  resetCode,
  moveAction,
  turnAction,
  dropAction,
  modalOff,
  modalOn,
} from '../../../state/actionSlice';
import { selectEngineOutput } from '../../../state/actionSlice';
import { motion } from 'framer-motion';


function Level3() {
  const dispatch = useDispatch();
  const EngineOutput = useSelector(selectEngineOutput);
  const GameAnswer = Answer.level3;
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

  const handleMovementType = () => {
    dispatch(moveAction());
  };
  const handleTurnType = () => {
    dispatch(turnAction());
  };
  const handleDropType = () => {
    dispatch(dropAction());
  };
  const handleModal = () => {
    dispatch(resetCode());
    dispatch(modalOff());
    console.log('i was here');
    navigate('/quiz', { state: { data: QuestionsList.quiz3, level: 4 } });
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
        <div className="actions-sm-size">
          <button type="button" onClick={() => handleMovementType()}>
            move
          </button>
          <button type="button" onClick={() => handleTurnType()}>
            turnleft
          </button>
          <button type="button" onClick={() => handleDropType()}>
            dropBox
          </button>
        </div>
      </div>
      <div className="canvasout">
        <Canvas EngineOutput={EngineOutput} GameAnswer={EngineOutput} />
        <Canvas EngineOutput={GameAnswer} GameAnswer={GameAnswer} />
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

export default Level3;
