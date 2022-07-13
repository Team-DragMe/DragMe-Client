import { useState } from 'react';

function useDragBlockTest(
  isDragging: boolean,
  isPlus: boolean,
  isEstimated: boolean,
  handleDragState: (isDragging: boolean, isPlus: boolean) => void,
) {
  //서버처리도 해주고
  //클라 색칠도 해주고
  const [draged, setDraged] = useState('');

  const onMouseDown = () => {
    console.log('drag');
    if (draged === '') {
      handleDragState(true, true);
    } else {
      handleDragState(true, false);
    }
  };

  const onMouseMove = () => {
    // element?.setAttribute('style', 'background-color:black');
    // console.log(element);
    if (isDragging) {
      if (isPlus) {
        console.log('dragging');
        isEstimated ? setDraged('done') : setDraged('plan');
      } else {
        setDraged('');
      }
    }
  };

  const onMouseUp = () => {
    handleDragState(false, true);
  };

  return {
    onMouseDown,
    onMouseMove,
    onMouseUp,
    draged,
  };
}

export default useDragBlockTest;
