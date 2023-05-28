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

    {item.property.actionNameIf ? ` ${item?.property?.firstArg} ` : null}
    {item.property.operator}

    {item.property.actionNameIf ? ` ${item?.property?.secondArg}` : null}

    {item.property.actionNameIf ? `)` : null}
    {item.hasAction && '{'}

    {item?.property?.if_Action?.length !== 0 &&
    item.property.actionNameIf === 'if'
      ? item.property?.if_Action.map((unitAction) => (
          <>
            <br />
            {unitAction.functionName}
            {unitAction.functionName ? '(' : ''}
            {unitAction.hasValue ? unitAction.value : null}
            {unitAction.functionName ? ')' : ''}
          </>
        ))
      : null}
    <br />
    {item.hasAction && '}'}

    <br />
    {item.property.actionNameElse}
    {item.property.actionNameElse ? ' {' : null}

    {item?.property?.else_Action?.length !== 0 &&
    item.property.actionNameElse === 'else'
      ? item.property?.else_Action.map((unitAction) => (
          <>
            <br />
            {unitAction.functionName}
            {unitAction.functionName ? '(' : ''}
            {unitAction.hasValue ? unitAction.value : null}
            {unitAction.functionName ? ')' : ''}
          </>
        ))
      : null}
    <br />
    {item.property.actionNameElse ? '}' : null}
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
