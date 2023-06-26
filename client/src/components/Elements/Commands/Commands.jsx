import React from 'react';
import './style.css';
import { useDispatch } from 'react-redux';
import { resetCode, runCode, undoCode } from '../../../state/actionSlice';
import run from '../../../assets/play.png';
import reset from '../../../assets/reset.png';
import undo from '../../../assets/undo.png';

function Commands() {
  const dispatch = useDispatch();

  const handleRun = () => {
    dispatch(runCode());
  };
  const handleReset = () => {
    dispatch(resetCode());
  };
  const handleUndo = () => {
    dispatch(undoCode());
  };
  return (
    <div className="Commands">
      <div className="Run_code">
        <button
          onClick={() => {
            handleRun();
          }}
          type="button"
        >
          <img src={run} alt="run" />
        </button>
      </div>

      <div className="Reset_Code">
        <button
          onClick={() => {
            handleReset();
          }}
          type="button"
        >
          <img src={reset} alt="reset" />
        </button>
      </div>

      <div className="Undo_Code">
        <button
          onClick={() => {
            handleUndo();
          }}
          type="button"
        >
          <img src={undo} alt="undo" />
        </button>
      </div>
    </div>
  );
}

export default Commands;
