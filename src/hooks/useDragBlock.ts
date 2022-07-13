import { useState } from 'react';

function useDragBlock() {
  //서버처리도 해주고
  //클라 색칠도 해주고
  const [draged, setDraged] = useState('');

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    console.log('drag');
    const img = new Image();
    e.dataTransfer.setDragImage(img, 0, 0);
    if (e.target instanceof HTMLElement) {
      e.target.style.cursor = 'pointer';
    }
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    console.log('dragIng');
    if (e.target instanceof HTMLElement) {
      e.target.style.cursor = 'pointer';
      setDraged('plan');
    }
  };

  const onDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLElement) {
      console.log('dragEnd');
      e.target.style.cursor = 'pointer';
    }
  };

  return {
    onDragStart,
    onDragOver,
    onDragEnd,
    draged,
  };
}

export default useDragBlock;
