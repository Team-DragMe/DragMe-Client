import React from 'react';

interface DragStateArg {
  isDragging: boolean;
  startBlock: string;
  endBlock: string;
}

interface DragBlockHookArg {
  isDragging: boolean;
  handleDragState: ({ isDragging, startBlock, endBlock }: DragStateArg) => void;
  handleSubmit: () => void;
}

function useDragBlock({ isDragging, handleDragState, handleSubmit }: DragBlockHookArg) {
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLDivElement) {
      handleDragState({ isDragging: true, startBlock: e.target.id, endBlock: e.target.id });
    }
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      if (e.target instanceof HTMLElement) {
        !isNaN(parseInt(e.target.id)) &&
          handleDragState({ isDragging: true, startBlock: '', endBlock: e.target.id });
      }
    }
  };

  const onMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    //서버처리
    handleSubmit();
    if (e.target instanceof HTMLElement) {
      handleDragState({ isDragging: false, startBlock: '-1', endBlock: '-1' });
    }
  };

  return {
    onMouseDown,
    onMouseMove,
    onMouseUp,
  };
}

export default useDragBlock;
