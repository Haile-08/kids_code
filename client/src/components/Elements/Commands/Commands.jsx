import React from 'react';
import './style.css';

function Commands({ inputObj, parseCode, resetCode, undoCode }) {
  return (
    <div className="Commands">
      <div className="Run_code">
        <button
          onClick={() => {
            parseCode(inputObj);
          }}
        >
          Run
        </button>
      </div>

      <div className="Reset_Code">
        <button
          onClick={() => {
            resetCode();
          }}
        >
          Reset
        </button>
      </div>

      <div className="Undo_Code">
        <button
          onClick={() => {
            undoCode();
          }}
        >
          undo
        </button>
      </div>
    </div>
  );
}

export default Commands;
