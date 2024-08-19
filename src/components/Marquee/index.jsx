import { useState, useEffect, useRef } from "react";
import classes from "./index.module.css";

export default ({ list, className }) => {
  const speed = 50;

  const marqueeRef = useRef();

  const [tw, setTw] = useState(0);

  const ad = Math.floor(tw / speed);

  const texts = list.concat(list);

  const updateTw = () => {
    const marquee = marqueeRef.current;
    const w = marquee?.getBoundingClientRect()?.width;
    setTw(w / 2);
  };

  useEffect(() => {
    updateTw();
  });
  return (
    <div
      class={`${className} overflow-hidden flex-1`}
      style={`--tw: ${tw}px; --ad: ${ad}s`}
    >
      <div ref={marqueeRef} class={classes.marquee}>
        {texts.map((item, index) => {
          return (
            <div class="mr-4 flex-1" key={index}>
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};
