import React, { useState } from "react";
import CardGame from "./components/cardGame";
import Header from "./components/header";
import Modal from "./components/modal";
import { useTimer } from "./util/customHooks";

export default function App() {
  const [showModal, setShowModal] = useState(false);

  const [bestTime, setBestTime] = useState();
  const [previousTime, setPreviousTime] = useState();

  const {
    time,
    start: timerStart,
    stop: timerStop,
    reset: timerReset,
  } = useTimer();

  const cardTexts = [
    "Bunny 🐰",
    "Frog 🐸",
    // "Panda 🐼",
    // "Doggy 🐶",
    // "Kitty 😺",
    // "Duck 🦆",
  ];

  function handleGameEnd() {
    timerStop();
    setPreviousTime(time);
    if (time < bestTime) {
      setBestTime(time);
    }
    timerReset();
  }

  return (
    <>
      <Header
        // add time, bestTime, previousTime props
        time={time}
        bestTime={bestTime}
        previousTime={previousTime}
        openModal={() => setShowModal(true)}
      />
      <CardGame
        onGameStart={timerStart}
        onGameEnd={handleGameEnd}
        // add onGameStart, onGameEnd props
        cardTexts={cardTexts}
      />
      <Modal isShown={showModal} close={() => setShowModal(false)} />
    </>
  );
}
