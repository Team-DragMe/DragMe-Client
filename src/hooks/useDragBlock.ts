import React from 'react';

function useDragBlock(
  isDragging: boolean,
  handleDragState: (isDragging: boolean, startBlock: string, endBlock: string) => void,
) {
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLDivElement) {
      handleDragState(true, e.target.id, '');
    }
  };

  const onMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      if (e.target instanceof HTMLElement) {
        handleDragState(true, '', e.target.id);
      }
    }
  };

  const onMouseUp = () => {
    handleDragState(false, '', '');
    //서버처리
  };

  return {
    onMouseDown,
    onMouseEnter,
    onMouseUp,
  };
}

export default useDragBlock;
