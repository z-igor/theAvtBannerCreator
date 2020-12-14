import React, { useState } from "react";
import { ColorPicker as Picker } from "react-color-gradient-picker";
import "react-color-gradient-picker/dist/index.css";

const color = {
  red: 255,
  green: 0,
  blue: 0,
  alpha: 1,
};

const gradient = {
  points: [
    {
      left: 0,
      red: 0,
      green: 0,
      blue: 0,
      alpha: 1,
    },
    {
      left: 100,
      red: 255,
      green: 0,
      blue: 0,
      alpha: 1,
    },
  ],
  degree: 0,
  type: "linear",
};

export default function ColorPicker({
  setGradient,
  onChange,
}) {
  const [colorAttrs, setColorAttrs] = useState(color);
  const [gradientAttrs, setGradientAttrs] = useState(gradient);

  return (
    <>
      {setGradient ? (
        <Picker
          onEndChange={(e) => onChange(e)}
          gradient={gradientAttrs}
          isGradient
        />
      ) : (
        <Picker onEndChange={(e) => onChange(e)} color={colorAttrs} />
      )}
    </>
  );
}
