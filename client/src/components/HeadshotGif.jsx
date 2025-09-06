// src/components/HeadshotGif.jsx
export default function HeadshotGif() {
  return (
    <img
      src="/sprites/portrait.gif"
      alt="Headshot animation"
      loading="lazy"
      decoding="async"
      className="w-48 h-48 rounded-xl shadow"
      style={{ imageRendering: "pixelated" }} // nice for pixel art
    />
  );
}
