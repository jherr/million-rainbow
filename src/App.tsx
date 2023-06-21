import { useState, useEffect } from "react";
import { block, For } from "million/react";
import rainbowGradient from "rainbow-gradient";

type ColorProps = { colors: string[] };

function ReactColors({ colors }: ColorProps) {
  const minWidth = `${100.0 / colors.length}vw`;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      {colors.map((color, index) => (
        <div
          key={[color, index].join("-")}
          style={{
            minHeight: "100vh",
            minWidth,
            backgroundColor: color,
          }}
        ></div>
      ))}
    </div>
  );
}

const MillionColors = block(({ colors }: ColorProps) => {
  const minWidth = `${100.0 / colors.length}vw`;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <For each={colors}>
        {(color) => (
          <div
            style={{
              minHeight: "100vh",
              minWidth,
              backgroundColor: color,
            }}
          ></div>
        )}
      </For>
    </div>
  );
});

const rainbowColors = rainbowGradient(360).map(
  ([r, g, b]) => `rgb(${r},${g},${b})`
);

function App() {
  const [colors, setColors] = useState(
    new Array(360 * 4)
      .fill(0)
      .map((_, i) => rainbowColors[i % rainbowColors.length])
  );

  useEffect(() => {
    let mounted = true;
    const update = () => {
      if (mounted) {
        setColors((colors) => {
          const newColors = [...colors];
          newColors.push(newColors.shift() as string);
          return newColors;
        });
        requestAnimationFrame(update);
      }
    };
    requestAnimationFrame(update);
    return () => {
      mounted = false;
    };
  }, []);

  return <MillionColors colors={colors} />;
}

export default App;
