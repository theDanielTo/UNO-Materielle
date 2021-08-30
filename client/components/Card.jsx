import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  card: {
    height: 200,
    width: 140,
    borderRadius: 10,
    marginLeft: -70
  }
}));

export default function Card(props) {
  const classes = useStyles();
  const { src, valid, deg, prop, margin, draggable, cursor } = props;
  const id = Math.floor(Math.random() * 100000);

  const dragStart = e => {
    e.dataTransfer.setData('card-id', id);
    e.dataTransfer.setData('card', src);

    setTimeout(() => {
      e.target.style.display = 'none';
    }, 0);
  };

  const handleDragEnd = e => {
    e.target.style.display = 'initial';
  };

  const dragOver = e => {
    e.stopPropagation();
  };

  const shadowColor = src.split('-')[0];
  const validFilter = valid
    ? `drop-shadow(0px 0px 20px ${shadowColor})`
    : 'opacity(50%) grayscale(80%)';

  const cardStyle = {
    transform: `rotate(${deg})`,
    [prop]: margin,
    cursor: cursor,
    filter: validFilter
  };

  return (
    <>
      <img src={`./images/cards/${src}.png`} alt={src}
        id={id}
        className={classes.card} draggable={draggable}
        style={cardStyle}
        onDragStart={dragStart}
        onDragEnd={handleDragEnd}
        onDragOver={dragOver}
      />
    </>
  );
}
