import Reschedule from 'public/assets/lotties/reschedule.json';
import React from 'react';
import Lottie from 'react-lottie-player';

export default function RescheduleLottie() {
  return <Lottie loop animationData={Reschedule} play style={{ width: 660, height: 410 }} />;
}
