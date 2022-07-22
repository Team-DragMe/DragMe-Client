import Drag2 from 'public/assets/lotties/drag_2.json';
import React from 'react';
import Lottie from 'react-lottie-player';

export default function DragLottie2() {
  return <Lottie loop animationData={Drag2} play style={{ width: 655, height: 410 }} />;
}
