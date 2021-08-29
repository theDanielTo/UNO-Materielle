import React from 'react';

export default function Card(props) {
  const { src, className, deg, prop, margin, draggable, cursor } = props;
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

  return (
    <>
      <img src={`./images/cards/${src}.png`} alt={src}
        id={id}
        className={className} draggable={draggable}
        style={{ transform: 'rotate(' + deg + ')', [prop]: margin, cursor: cursor }}
        onDragStart={dragStart}
        onDragEnd={handleDragEnd}
        onDragOver={dragOver}
      />
    </>
  );
}
