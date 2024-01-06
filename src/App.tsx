import "./App.css";
import { useSharedStore } from "./useSharedStore";

function App() {
  const { tick, session, sessions } = useSharedStore();

  console.log("rendering App");
  console.log("tick", tick);

  const centers = sessions.map((session) => {
    return {
      x: session.x + session.width / 2,
      y: session.y + session.height / 2,
    };
  });
  const x = centers.reduce((acc, center) => acc + center.x, 0) / centers.length;
  const y = centers.reduce((acc, center) => acc + center.y, 0) / centers.length;

  const top = y - (session?.y ?? 0);
  const left = x - (session?.x ?? 0);

  return (
    <div
      style={{
        position: "absolute",
        overflow: "hidden",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "blue",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: `${top}px`,
          left: `${left}px`,
          width: "20px",
          height: "20px",
          background: "red",
        }}
      />
    </div>
  );
}

export default App;
