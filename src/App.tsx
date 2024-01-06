import "./App.css";
import { useSharedStore } from "./useSharedStore";

function App() {
  const { sessions } = useSharedStore();

  return (
    <>
      {sessions.map((session, i) => (
        <div key={i}>
          <h2>{session.sessionHash}</h2>
          <p>
            {session.width} x {session.height} x {session.x} x {session.y}
          </p>
        </div>
      ))}
    </>
  );
}

export default App;
