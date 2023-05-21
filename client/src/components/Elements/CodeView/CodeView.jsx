import React from 'react';
import './style.css';
import { useSelector } from 'react-redux';

function CodeView() {
  const EngineInput = useSelector((state) => state.action.EngineInput);
  return (
    <div className="codeSpace">
      {EngineInput.map((item) => (
        <h3 key={item.id}>
          {item.functionName}
          {item.functionName ? '(' : ''} {item.value}{' '}
          {item.functionName ? ')' : ''}
        </h3>
      ))}
    </div>
  );
}

export default CodeView;
