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

const FormatIfFunction = ({ item }) => (
  <h3>
    {`${item.property.actionNameIf}(`}

    {item?.property?.firstArg
      ? ` ${item?.property?.firstArg}`
      : ` ${item?.property?.secondArg} `}
    {item.property.operator}

    {item?.property?.secondArg ? ` ${item?.property?.secondArg}` : null}

    {item.property.actionNameIf && ')'}

    {item.hasAction && '{'}

    {item?.property?.if_Action?.length !== 0
      ? item.property?.if_Action.map((unitAction) => (
          <>
            <br />
            <>{unitAction.functionName}</>
            <br />
          </>
        ))
      : null}
    <br />
    {item.hasAction && '}'}
  </h3>
);

function CodeView() {
  const EngineInput = useSelector(selectEngineInput);
  return (
    <div className="codeSpace">
      {console.log('engine Input inside code view', EngineInput)}
      {EngineInput.map((item) => (
        <>
          {item.Argument === 'outSide' ? (
            <FormatColorFunction item={item} />
          ) : item.Argument === 'variable' ? (
            <FormatVariableFunction item={item} />
          ) : item.Argument === 'if' ? (
            <FormatIfFunction item={item} />
          ) : null}
        </>
      ))}
    </div>
  );
}

export default CodeView;
