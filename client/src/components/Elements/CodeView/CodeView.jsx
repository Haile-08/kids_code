import React from 'react';
import './style.css';
import { useSelector } from 'react-redux';
import { selectEngineInput } from '../../../state/actionSlice';
import ReactScrollableFeed from 'react-scrollable-feed';

const keyWordColor = '#0984e3';
const valuesColor = '#636e72';
const operatorColor = '#6c5ce7';

const FormatColorFunction = ({ item }) => (
  <span>
    {item?.hasAction
      ? item?.property?.actions.map((action) => (
          <span key={action.id}>
            <h3 style={{ color: `${keyWordColor}` }}>
              {action.functionName}
              {action.functionName ? '(' : ''}
              <span style={{ color: `${valuesColor}` }}>
                {' '}
                {action.hasValue ? action.value : null}
              </span>
              {action.functionName ? ')' : ''}
            </h3>
          </span>
        ))
      : null}
  </span>
);

const FormatVariableFunction = ({ item }) => (
  <h3 style={{ color: `${keyWordColor}` }}>
    {item?.property?.varName ? `${item.property.varName} =` : null}
    <span style={{ color: `${valuesColor}` }}>
      {/\d+/.test(item.property.varValue)
        ? ` ${item.property.varValue}`
        : `" ${item.property.varValue} "`}
    </span>
  </h3>
);

const FormatIfFunction = ({ item }) => (
  <h3 style={{ color: `${keyWordColor}` }}>
    {`${item.property.actionNameIf}(`}

    <span style={{ color: `${valuesColor}` }}>
      {' '}
      {item.property.actionNameIf ? ` ${item?.property?.firstArg} ` : null}
    </span>
    <span style={{ style: 'red' }}>{item.property.operator}</span>

    <span style={{ color: `${valuesColor}` }}>
      {item.property.actionNameIf ? ` ${item?.property?.secondArg}` : null}
    </span>

    {item.property.actionNameIf ? `)` : null}
    {item.hasAction && '{'}

    {item?.property?.if_Action?.length !== 0 &&
    item.property.actionNameIf === 'if'
      ? item.property?.if_Action.map((unitAction) => (
          <>
            <br />
            {unitAction.functionName}
            {unitAction.functionName ? '(' : ''}
            <span style={{ color: `${valuesColor}` }}>
              {unitAction.hasValue ? unitAction.value : null}
            </span>
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
  <h3 style={{ color: `${keyWordColor}` }}>
    {`${item.property.actionNameFor}(`}

    <span style={{ color: `${valuesColor}` }}>
      {' '}
      {item.property.actionNameFor ? ` ${item?.property?.firstArg} ` : null}
    </span>
    <span style={{ color: `${operatorColor}` }}>
      {item.property.firstOperator}
    </span>
    <span style={{ color: `${valuesColor}` }}>
      {item.property.actionNameFor ? ` ${item?.property?.secondArg} ;` : null}
    </span>
    <span style={{ color: `${valuesColor}` }}>
      {item.property.actionNameFor ? ` ${item?.property?.thirdArg} ` : null}
    </span>
    <span style={{ color: `${operatorColor}` }}>
      {' '}
      {item.property.secondOperator}
    </span>
    <span style={{ color: `${valuesColor}` }}>
      {' '}
      {item.property.actionNameFor ? ` ${item?.property?.fourthArg} ;` : null}
    </span>
    <span style={{ color: `${valuesColor}` }}>
      {' '}
      {item.property.actionNameFor ? ` ${item?.property?.fifthArg} ` : null}
    </span>

    <span style={{ color: `${operatorColor}` }}>
      {' '}
      {item.property.thirdOperator}
    </span>
    {`)`}
    {item.hasAction && '{'}
    {item.property.for_Action.map((unitAction) => (
      <>
        <br />
        <span style={{ color: `${keyWordColor}` }}>
          {unitAction.functionName}
          {unitAction.functionName ? '(' : ''}{' '}
        </span>

        <span style={{ color: `${valuesColor}` }}>
          {unitAction.hasValue ? unitAction.value : null}
        </span>
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
      {console.log(EngineInput)}
      <ReactScrollableFeed>
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
      </ReactScrollableFeed>
    </div>
  );
}

export default CodeView;
