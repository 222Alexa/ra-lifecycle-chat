

import "./App.css";
import "./main.css";
import "./components/Molecules/form/form.css";
import "./components/Sections/section.css";
import "./components/Molecules/loader/spinner.css"
import Chat from "./components/Chat";

const fakeData = { type: "chat-panel", text: "Добавить", name: "chat" };

function App() {
  return (
    <div className="App">
      <header className="header">
        <h2 className="header-title">Chat</h2>
      </header>
      <main>
        <Chat {...fakeData}/>
      </main>
    </div>
  );
}

export default App;
