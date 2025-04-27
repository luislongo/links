import "./style.css";

import { setupCounter } from "./counter.ts";
import { LocalStorageEvents } from "./IEventSystem.ts";

const appDiv = document.querySelector<HTMLDivElement>("#app");

const storage = new LocalStorageEvents((w) => {
  appDiv!.innerText = w
    .map((uuid) => {
      const size = storage.windowsSize[uuid];
      const position = storage.windowPosition[uuid];
      return `Window: ${uuid} - ${size?.width}x${size?.height}; (${position?.x},${position?.y})`;
    })
    .join("\n");
});

setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
