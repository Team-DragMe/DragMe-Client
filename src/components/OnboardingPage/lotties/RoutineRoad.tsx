import RountinRoad from 'public/assets/lotties/routineroad_2.json';
import React from 'react';
import Lottie from 'react-lottie-player';

export default function Routineroad() {
  return <Lottie loop animationData={RountinRoad} play style={{ width: 654, height: 410 }} />;
}
