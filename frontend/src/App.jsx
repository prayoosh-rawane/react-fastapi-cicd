import { useEffect, useRef, useState } from "react";
import heroImg from "./assets/hero.png";
import "./App.css";

const launchStages = [
  { label: "Warming up", color: "warm" },
  { label: "Building", color: "build" },
  { label: "Testing", color: "test" },
  { label: "Deploying", color: "deploy" },
  { label: "Lift off!", color: "complete" },
];

function App() {
  const [stage, setStage] = useState("Ready to launch");
  const [isRunning, setIsRunning] = useState(false);
  const [count, setCount] = useState(0);
  const timeoutRefs = useRef([]);

  useEffect(() => {
    return () =>
      timeoutRefs.current.forEach((timeout) => clearTimeout(timeout));
  }, []);

  const startLaunch = () => {
    timeoutRefs.current.forEach((timeout) => clearTimeout(timeout));
    timeoutRefs.current = [];

    setIsRunning(true);
    setCount((value) => value + 1);
    setStage("Warming up");

    launchStages.slice(1).forEach((entry, index) => {
      timeoutRefs.current.push(
        setTimeout(
          () => {
            setStage(entry.label);
            if (entry.label === "Lift off!") {
              setTimeout(() => setIsRunning(false), 800);
            }
          },
          (index + 1) * 1000,
        ),
      );
    });
  };

  return (
    <main className="app-shell">
      <section className="stage">
        <div className="space-viewport">
          <div className="launch-pad">
            <img src={heroImg} className="launch-core" alt="Launch module" />
            <div className="spark spark-a" />
            <div className="spark spark-b" />
            <div className="spark spark-c" />
          </div>
          <div className="planet orbit orbit-one" />
          <div className="planet orbit orbit-two" />
          <div className="planet orbit orbit-three" />
          <div className="star star-a" />
          <div className="star star-b" />
          <div className="star star-c" />
        </div>

        <div className="launch-panel">
          <div className="title-block">
            <p className="eyebrow">Project playground</p>
            <h1>Launch Control</h1>
            <p>
              A playful frontend demo that animates a build pipeline and makes
              your project fun to watch.
            </p>
          </div>

          <div className="status-card">
            <span className="status-label">Current stage</span>
            <strong
              className={`status-value ${stage.replace(/\s+/g, "-").toLowerCase()}`}
            >
              {stage}
            </strong>
            <p className="status-note">
              {isRunning
                ? "Your pipeline is moving through the launch sequence."
                : "Hit launch to see the build flow in action."}
            </p>
          </div>

          <div className="action-row">
            <button className="launch-button" onClick={startLaunch}>
              {isRunning ? "Reignite" : "Start launch"}
            </button>
            <div className="launch-count">Count: {count}</div>
          </div>

          <div className="pipeline-bar">
            {launchStages.map((entry, index) => {
              const activeIndex = launchStages.findIndex(
                (item) => item.label === stage,
              );
              const progressState = index <= activeIndex ? "active" : "idle";
              return (
                <div
                  key={entry.label}
                  className={`stage-step ${progressState}`}
                >
                  <span>{entry.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
