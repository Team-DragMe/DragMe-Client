import React, { useState } from 'react';

interface DragBlockHookArg {
  handleSubmit: () => void;
}

function useDragBlock({ handleSubmit }: DragBlockHookArg) {
  const [startBlock, setStartBlock] = useState('');
  const [endBlock, setEndBlock] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLDivElement) {
      setStartBlock(e.target.id);
      setEndBlock(e.target.id);
      setIsDragging(true);
    }
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      if (e.target instanceof HTMLElement) {
        e.target.id.length < 3 && setEndBlock(e.target.id);
      }
    }
  };

  const onMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    handleSubmit();
    if (e.target instanceof HTMLElement) {
      setEndBlock(e.target.id);
      setIsDragging(false);
    }
  };

  return {
    onMouseDown,
    onMouseMove,
    onMouseUp,
    startBlock,
    endBlock,
  };
}

export default useDragBlock;
