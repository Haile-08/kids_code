import React from 'react';
import './style.css';
import { useSelector } from 'react-redux';
import { selectEngineInput } from '../../../state/actionSlice';

const FormatColorFunction = ({ item }) => (
  <>
    {item?.hasAction
      ? item?.property?.actions.map((action) => (
          <span key={action.id}>
            <h3>
              {action.functionName}
              {action.functionName ? '(' : ''}
              {action.hasValue ? action.value : null}
              {action.functionName ? ')' : ''}
            </h3>
          </span>
        ))
      : null}
  </>
);

const FormatVariableFunction = ({ item }) => (
  <h3>
    {item?.property?.varName ? `${item.property.varName} =` : null}{' '}
    {`" ${item.property.varValue} "`}
  </h3>
);

function CodeView() {
  const EngineInput = useSelector(selectEngineInput);
  return (
    <div className="codeSpace">
      {console.log(EngineInput)}
      {EngineInput.map((item) => (
        <>
          {item.Argument === 'outSide' ? (
            <FormatColorFunction item={item} />
          ) : (
            <FormatVariableFunction item={item} />
          )}
        </>
      ))}
    </div>
  );
}

export default CodeView;
