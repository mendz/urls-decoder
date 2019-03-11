import React from 'react';
import classes from './css/StatusMessage.module.css';

const StatusMessage = ({ message, error }) => {
  const inlineStyle = {padding: '0'};
  let classColor = classes.succeed;

  if (error) {
    classColor = classes.error;
  }

  if (message) {
    inlineStyle.padding = '5px';
  }

  return (
    <p className={`${classes.statusMessage} ${classColor}`} style={inlineStyle}>{message}</p>
  )
}

export default StatusMessage;