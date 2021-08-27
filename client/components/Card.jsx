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

  const playCard = e => {
    e.stopPropagation();
    // if (e.target.id === 'played-cards') {
    //   console.log(e.target);
    // }
  };

  return (
    <>
      <img src={`./images/${src}.png`} alt={src}
        className={className} draggable={draggable}
        style={{ transform: 'rotate(' + deg + ')', [prop]: margin }}
        onDragStart={dragStart}
        onDragOver={playCard}
      />
    </>
  );
}
