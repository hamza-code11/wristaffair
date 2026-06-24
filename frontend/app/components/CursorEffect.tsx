"use client";

import AnimatedCursor from "react-animated-cursor";

export default function CursorEffect() {
  return (
    <AnimatedCursor
      innerSize={6}
      outerSize={38}
      color="255, 255, 255"
      outerAlpha={0.08}
      innerScale={0.8}
      outerScale={2.2}
      trailingSpeed={10}
      showSystemCursor={false}
      outerStyle={{
        border: "1px solid rgba(255,255,255,0.25)",
        mixBlendMode: "difference",
      }}
      innerStyle={{
        backgroundColor: "rgba(255,255,255,0.9)",
      }}
      clickables={[
        "a",
        "button",
        "input",
        "textarea",
        ".cursor-pointer",
      ]}
    />
  );
}