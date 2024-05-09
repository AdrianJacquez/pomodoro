import "./App.css";
import { useState, useEffect } from "react";
import { arrowDownThick } from "react-icons-kit/typicons/arrowDownThick";
import { arrowUpThick } from "react-icons-kit/typicons/arrowUpThick";
import { Icon } from "react-icons-kit";
import { mediaPause } from "react-icons-kit/typicons/mediaPause";
import { mediaPlay } from "react-icons-kit/typicons/mediaPlay";
import { arrowRepeat } from "react-icons-kit/typicons/arrowRepeat";

function App() {
  const [countBreak, setCountBreak] = useState(5);
  const [countSession, setCountSession] = useState(25);
  const [isRunning, setIsRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(countSession * 60);
  const [currentTimer, setCurrentTimer] = useState("Sesión");

  const incrementCountBreak = () => {
    if (countBreak < 60) {
      setCountBreak((prevCount) => prevCount + 1);
    }
  };

  useEffect(() => {
    setCurrentTime(countSession * 60);
  }, [countSession]);

  const decrementCountBreak = () => {
    if (countBreak > 1) {
      setCountBreak((prevCount) => prevCount - 1);
    }
  };

  const incrementCountSession = () => {
    if (countSession < 60) {
      setCountSession((prevCount) => prevCount + 1);
    }
  };

  const decrementCountSession = () => {
    if (countSession > 1) {
      setCountSession((prevCount) => prevCount - 1);
    }
  };

  const toggleTimer = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };
  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setCurrentTime((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            if (currentTimer === "Sesión") {
              setCurrentTime(countBreak * 60);
              setCurrentTimer("Descanso");
              return countBreak * 60; // Ajustar el tiempo exactamente a countBreak * 60 segundos
            } else {
              setCurrentTime(countSession * 60);
              setCurrentTimer("Sesión");
              return countSession * 60; // Ajustar el tiempo exactamente a countSession * 60 segundos
            }
          }
        });
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    // Limpiar el intervalo cuando el componente se desmonte o se detenga el temporizador
    return () => clearInterval(intervalId);
  }, [isRunning, countBreak, countSession, currentTimer]);

  useEffect(() => {
    if (currentTime === 0) {
      const audio = document.querySelector("audio");
      // Reproduce el audio
      audio.currentTime = 0;
      audio.play();
    }
  }, [currentTime]);

  const handleReset = () => {
    setIsRunning(false); // Detener el temporizador
    setCountBreak(5); // Restablecer el valor de break-length a 5
    setCountSession(25); // Restablecer el valor de session-length a 25
    setCurrentTime(25 * 60); // Restablecer el temporizador a su estado inicial (25 minutos)
    setCurrentTimer("Sesión");
  };

  // Formatear el tiempo en formato 'mm:ss'
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };
  return (
    <>
      <div id="conteiner">
        <div id="break-label">
          Descanso
          <div id="botonesD">
            <button id="break-decrement" onClick={decrementCountBreak}>
              <Icon size={40} icon={arrowDownThick}></Icon>
            </button>
            <h2 id="break-length">{countBreak}</h2>
            <button id="break-increment" onClick={incrementCountBreak}>
              <Icon size={40} icon={arrowUpThick}></Icon>
            </button>
          </div>
        </div>
        <div id="session-label">
          Sesion
          <div id="botonesS">
            <button id="session-decrement" onClick={decrementCountSession}>
              <Icon size={40} icon={arrowDownThick}></Icon>
            </button>
            <h2 id="session-length">{countSession}</h2>
            <button id="session-increment" onClick={incrementCountSession}>
              <Icon size={40} icon={arrowUpThick}></Icon>
            </button>
          </div>
        </div>
      </div>

      <div id="conteinerTimer">
        <label id="timer-label">{currentTimer}</label>
        <h1 id="time-left">{formatTime(currentTime)}</h1>
      </div>

      <div id="botonesControl">
        <button id="start_stop" onClick={toggleTimer}>
          <Icon size={60} icon={isRunning ? mediaPause : mediaPlay}></Icon>
        </button>
        <button id="reset" onClick={handleReset}>
          <Icon size={60} icon={arrowRepeat}></Icon>
        </button>
      </div>

      <p className="read-the-docs">
        Designed and coded by{" "}
        <a
          href="https://github.com/AdrianJacquez"
          target="_blank"
          rel="noreferrer"
        >
          Adrian Jacquez
        </a>
      </p>
      <audio
        id="beep"
        src="C:\Users\Innovacion\Pomodoro\public\Goku.mp3"
      ></audio>
    </>
  );
}

export default App;
