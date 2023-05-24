import React from 'react';
import './style.css';
import { useSelector } from 'react-redux';
import { selectEngineInput } from '../../../state/actionSlice';

function CodeView() {
  const EngineInput = useSelector(selectEngineInput);
  return (
    <div className="codeSpace">
      {EngineInput.map((item) => {
        if (item.functionName === 'color') {
          return;
          <h3 key={item.id}>
            {item.functionName}
            {item.functionName ? '(' : ''} {item.value}{' '}
            {item.functionName ? ')' : ''}
          </h3>;
        }
      })}
    </div>
  );
}

export default CodeView;

{
  /* <h3 key={item.id}>
{item.functionName}
{item.functionName ? '=' : ''} {item.value}
 </h3> */
}
