import "./App.css";
import { useState } from "react";

function App() {
  const [colour, setColour] = useState("");

  const onClick = async () => {
    let [tab] = await chrome.tabs.query({ active: true });
    chrome.scripting.executeScript<string[], void>({
      target: { tabId: tab.id! },
      args: [colour],
      func: (colour) => {
        document.body.style.backgroundColor = colour;
      },
    });
  };

  return (
    <>
      <h1>My Extension</h1>
      <div className="card">
        <input
          type="color"
          onChange={(e) => setColour(e.currentTarget.value)}
          value={colour}
        ></input>
        <button onClick={() => onClick()}>Change background</button>
      </div>
    </>
  );
}

export default App;
