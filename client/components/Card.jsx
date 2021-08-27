import React from 'react';

export default function Card(props) {
  const { src, className, deg, prop, margin, draggable } = props;
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
    // props.playCard(e, e.target.alt);
  };

  const dragOver = e => {
    e.stopPropagation();
  };

  return (
    <>
      <img src={`./images/${src}.png`} alt={src}
        id={id}
        className={className} draggable={draggable}
        style={{ transform: 'rotate(' + deg + ')', [prop]: margin }}
        onDragStart={dragStart}
        onDragEnd={handleDragEnd}
        onDragOver={dragOver}
      />
    </>
  );
}
