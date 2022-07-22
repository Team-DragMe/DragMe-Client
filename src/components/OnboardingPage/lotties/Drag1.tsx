import Drag1 from 'public/assets/lotties/drag_1.json';
import React from 'react';
import Lottie from 'react-lottie-player';

export default function DragLottie() {
  return <Lottie loop animationData={Drag1} play style={{ width: 655, height: 410 }} />;
}
