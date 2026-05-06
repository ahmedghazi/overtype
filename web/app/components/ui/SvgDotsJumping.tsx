import React from "react";

const SvgDotsJumping = () => (
  <svg
    width='46'
    height='14'
    viewBox='0 0 56 24'
    role='img'
    aria-label='Loading'
    xmlns='http://www.w3.org/2000/svg'>
    <style>{`
      @keyframes svgDotsJump {
        0%, 60%, 100% { transform: translateY(0); }
        30%            { transform: translateY(-10px); }
      }
    `}</style>
    {[8, 28, 48].map((cx, i) => (
      <circle
        key={cx}
        cx={cx}
        cy='18'
        r='6'
        fill='currentColor'
        style={{
          animation: "svgDotsJump 1s ease-in-out infinite",
          animationDelay: `${i * 0.15}s`,
          transformBox: "fill-box",
          transformOrigin: "center",
        }}
      />
    ))}
  </svg>
);

export default SvgDotsJumping;
