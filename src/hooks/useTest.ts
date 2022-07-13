import React, { Dispatch, SetStateAction } from 'react';

function useDragBlockTest(
  isDragging: boolean,
  handleDragState: (isDragging: boolean) => void,
  setStart: Dispatch<SetStateAction<string>>,
  setEnd: Dispatch<SetStateAction<string>>,
) {
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLDivElement) {
      setStart(e.target.id);
    }
    handleDragState(true);
  };

  const onMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      if (e.target instanceof HTMLElement) {
        setEnd(e.target.id);
      }
    }
  };

  const onMouseUp = () => {
    handleDragState(false);
    //서버처리
  };

  return {
    onMouseDown,
    onMouseEnter,
    onMouseUp,
  };
}

export default useDragBlockTest;
