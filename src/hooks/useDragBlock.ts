import React, { useState } from 'react';

interface DragBlockHookArg {
  handleSubmit: (start: number, end: number) => void;
}

const INITIAL_BLOCK = -1;

function useDragBlock({ handleSubmit }: DragBlockHookArg) {
  const [startBlock, setStartBlock] = useState(INITIAL_BLOCK);
  const [endBlock, setEndBlock] = useState<number>(INITIAL_BLOCK);
  const [isDragging, setIsDragging] = useState(false);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLDivElement && e.target.id.length < 3) {
      setStartBlock(parseInt(e.target.id));
      setEndBlock(parseInt(e.target.id));
      setIsDragging(true);
    }
  };

  const onMouseOver = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      if (e.target instanceof HTMLDivElement && e.target.id.length < 3) {
        setEndBlock(parseInt(e.target.id));
      }
    }
  };

  const onMouseUp = () => {
    handleSubmit(startBlock, endBlock);
    setIsDragging(false);
    setStartBlock(INITIAL_BLOCK);
    setEndBlock(INITIAL_BLOCK);
  };

  return {
    onMouseDown,
    onMouseOver,
    onMouseUp,
    startBlock,
    endBlock,
  };
}

export default useDragBlock;
