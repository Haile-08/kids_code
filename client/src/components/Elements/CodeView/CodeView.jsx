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
    {/* {item.hasAction && '}'} */}
    {item.property.IfblockComplete}

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
    {/* {item.property.actionNameElse ? '}' : null} */}
    {item.property.else_Action.length !== 0 && item.property.ElseblockComplete}
  </h3>
);

const FormatForFunction = ({ item }) => (
  <h3>
    {`${item.property.actionNameFor}(`}

    {item.property.actionNameFor ? ` ${item?.property?.firstArg} ` : null}
    {item.property.firstOperator}
    {item.property.actionNameFor ? ` ${item?.property?.secondArg} ;` : null}
    {item.property.actionNameFor ? ` ${item?.property?.thirdArg} ` : null}
    {item.property.secondOperator}
    {item.property.actionNameFor ? ` ${item?.property?.fourthArg} ;` : null}
    {item.property.actionNameFor ? ` ${item?.property?.fifthArg} ` : null}
    {item.property.thirdOperator}
    {`)`}
    {item.hasAction && '{'}
    {item.property.for_Action.map((unitAction) => (
      <>
        <br />
        {unitAction.functionName}
        {unitAction.functionName ? '(' : ''}
        {unitAction.hasValue ? unitAction.value : null}
        {unitAction.functionName ? ')' : ''}
      </>
    ))}
    <br />
    {/* {item.hasAction && '}'} */}
    {item.property.completeForBlock}
  </h3>
);
const FormatWhileFunction = ({ item }) => (
  <h3>
    {`${item.property.actionNameWhile}(`}

    {item.property.actionNameWhile ? ` ${item?.property?.firstArg} ` : null}
    {item.property.firstOperator}
    {item.property.actionNameWhile ? ` ${item?.property?.secondArg} )` : null}
    {item.hasAction && '{'}

    {item.property.while_Action.map((unitAction) => (
      <>
        <br />
        {unitAction.functionName}
        {unitAction.functionName ? '(' : ''}
        {unitAction.hasValue ? unitAction.value : null}
        {unitAction.functionName ? ')' : ''}
      </>
    ))}

    <br />
    {item.property.actionNameWhile ? ` ${item?.property?.thirdArg} ` : null}
    {item.property.secondOperator}
    <br />
    {/* {item.hasAction && '}'} */}
    {item.property.completeWhileBlock}
  </h3>
);

function CodeView() {
  const EngineInput = useSelector(selectEngineInput);
  return (
    <div className="codeSpace">
      {EngineInput.map((item) => (
        <>
          {item.Argument === 'outSide' ? (
            <FormatColorFunction item={item} />
          ) : item.Argument === 'variable' ? (
            <FormatVariableFunction item={item} />
          ) : item.Argument === 'if' ? (
            <FormatIfFunction item={item} />
          ) : item.Argument === 'for' ? (
            <FormatForFunction item={item} />
          ) : item.Argument === 'while' ? (
            <FormatWhileFunction item={item} />
          ) : null}
        </>
      ))}
    </div>
  );
}

export default CodeView;
