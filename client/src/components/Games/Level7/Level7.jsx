import React from 'react';
import { HiOutlineChevronLeft } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Canvas, CodeView, Commands } from '../../Elements';
import Answer from '../../../Data/Data';
import { QuestionsList } from '../../../Data/Data';
import '../style.css';
import {
  variableAction,
  colorAction,
  colorTypeAction,
  resetCode,
  operatorsAction,
  loopAction,
  closeBlockAction,
  numberAction,
  moveAction,
  turnAction,
  modalOff,
  modalOn,
} from '../../../state/actionSlice';
import { selectEngineOutput } from '../../../state/actionSlice';
import { motion } from 'framer-motion';

function Level7() {
  const dispatch = useDispatch();
  const EngineOutput = useSelector(selectEngineOutput);
  const GameAnswer = Answer.level7;
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
  const handleVariable = (text) => {
    dispatch(variableAction(text));
  };

  const handleOperators = (text) => {
    dispatch(operatorsAction(text));
  };

  const handleLoops = (text) => {
    dispatch(loopAction(text));
  };

  const handleCloseBlock = (text) => {
    dispatch(closeBlockAction(text));
  };
  const handleMovementType = () => {
    dispatch(moveAction());
  };
  const handleNumber = (event) => {
    console.log(event.target.value);
    dispatch(numberAction(event.target.value));
  };
  const handleTurnType = () => {
    dispatch(turnAction());
  };
  const handleModal = () => {
    dispatch(resetCode());
    dispatch(modalOff());
    console.log('i was here');
    navigate('/quiz', { state: { data: QuestionsList.quiz7, level: 7 } });
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
        <div className="actions-bg-size">
          <button type="button" onClick={() => handleColor()}>
            Color()
          </button>
          <button type="button" onClick={() => handleVariable('var1')}>
            var1
          </button>
          <button type="button" onClick={() => handleVariable('var2')}>
            var2
          </button>
          <button type="button" onClick={() => handleLoops('while')}>
            while
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
          <button type="button" onClick={() => handleColorType('yellow')}>
            yellow
          </button>
          <button type="button" onClick={() => handleOperators('++')}>
            ++
          </button>
          <button type="button" onClick={() => handleOperators('--')}>
            --
          </button>
          <button type="button" onClick={() => handleCloseBlock('}')}>
            {'}'}
          </button>
          <button type="button" onClick={() => handleMovementType()}>
            move
          </button>
          <button type="button" onClick={() => handleTurnType()}>
            turnleft
          </button>
          <select id="option" onChange={(e) => handleNumber(e)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
      </div>
      <div className="canvasout">
        <Canvas EngineOutput={EngineOutput} GameAnswer={GameAnswer} />
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

export default Level7;
