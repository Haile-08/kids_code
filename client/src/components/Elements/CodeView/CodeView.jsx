import React from 'react';
import './style.css';
import { useSelector } from 'react-redux';
import { selectEngineInput } from '../../../state/actionSlice';

function CodeView() {
  const EngineInput = useSelector(selectEngineInput);
  return <div className="codeSpace">{console.log(EngineInput)}</div>;
}

export default CodeView;
