import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [message, setMessage] = useState(
    "Waiting for data from main window https://amydinsyahira.github.io/react-parent-window-child-iframe"
  );

  useEffect(() => {
    const handleMainWindowMessage = (ev: MessageEvent<any>) => {
      console.log(ev);
      setMessage(JSON.stringify(ev.data, undefined, 2));
    };

    setTimeout(sendMessage, 5000, window);
    window.addEventListener("message", handleMainWindowMessage);
    return () => {
      window.removeEventListener("message", handleMainWindowMessage);
    };
  }, []);

  const sendMessage = (window: Window) => {
    console.log(
      "Sending data to Main Window (https://amydinsyahira.github.io/react-parent-window-child-iframe)"
    );
    if (!window || !window.parent) return;
    window.parent.postMessage(
      {
        status: true,
      },
      "https://amydinsyahira.github.io/react-parent-window-child-iframe"
    );
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <div className="message">
          <pre>{message}</pre>
        </div>
      </div>
    </>
  );
}

export default App;
