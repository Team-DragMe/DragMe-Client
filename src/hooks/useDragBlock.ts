import React from 'react';

interface DragStateArg {
  isDragging: boolean;
  startBlock: string;
  endBlock: string;
}

interface DragBlockHookArg {
  isDragging: boolean;
  handleDragState: ({ isDragging, startBlock, endBlock }: DragStateArg) => void;
}

function useDragBlock({ isDragging, handleDragState }: DragBlockHookArg) {
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLDivElement) {
      handleDragState({ isDragging: true, startBlock: e.target.id, endBlock: '' });
    }
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      if (e.target instanceof HTMLElement) {
        handleDragState({ isDragging: true, startBlock: '', endBlock: e.target.id });
      }
    }
  };

  const onMouseUp = () => {
    handleDragState({ isDragging: false, startBlock: '', endBlock: '' });
    //서버처리
  };

  return {
    onMouseDown,
    onMouseMove,
    onMouseUp,
  };
}

export default useDragBlock;
