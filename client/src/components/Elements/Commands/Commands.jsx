import React from 'react';
import './style.css';
import { useDispatch } from 'react-redux';
import { resetCode, runCode, undoCode } from '../../../state/actionSlice';

function Commands() {
  const dispatch = useDispatch();

  const handleRun = () => {
    dispatch(runCode());
  };
  const handleReste = () => {
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
          Run
        </button>
      </div>

      <div className="Reset_Code">
        <button
          onClick={() => {
            handleReste();
          }}
          type="button"
        >
          Reset
        </button>
      </div>

      <div className="Undo_Code">
        <button
          onClick={() => {
            handleUndo();
          }}
          type="button"
        >
          undo
        </button>
      </div>
    </div>
  );
}

export default Commands;
