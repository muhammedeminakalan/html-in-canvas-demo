import React, { useRef, useEffect } from "react";

export const videoVariants = {
  default: (props) => (
    <div className="h-full flex items-center justify-center">
      <style jsx>{`
        @keyframes move {
          0% {
            transform: translate(0);
          }
          25% {
            transform: translate(200px);
          }
          50% {
            transform: translate(50%);
          }
          75% {
            transform: translate(-200px);
          }
          100% {
            transform: translate(0);
          }
        }
      `}</style>

      <Img
        width={2070}
        height={1377}
        className="w-full h-full"
        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2070&auto=format&fit=crop"
      />

      <div className="absolute text-white text-center">
        <h1 className="text-5xl font-bold">Linux Nedir?</h1>
        <p className="text-lg mt-4">
          Açık kaynaklı, Unix tabanlı bir işletim sistemidir.
        </p>
      </div>

      <div
        className="absolute w-24 h-24 backdrop-blur-md bg-black/5"
        style={{
          animation: "move 2s cubic-bezier(0.25, 0.8, 0.25, 1) infinite",
        }}
      />
    </div>
  ),
};

export default function VideoCanvas({ canvasRef, sceneRef, config }) {
  const Component = videoVariants[config.variant] || videoVariants.default;

  const makeEditable = () => {
    const elements = sceneRef.current.querySelectorAll("*");

    elements.forEach((element) => {
      if (element.textContent.trim() !== "" && element.children.length === 0) {
        element.setAttribute("contentEditable", "true");
      }
    });
  };

  useEffect(() => {
    makeEditable();
  }, [config.variant]);

  return (
    <canvas
      ref={canvasRef}
      layoutsubtree=""
      className="aspect-video w-full rounded-2xl bg-background overflow-hidden"
      style={{ fontFamily: config.font }}
    >
      <div ref={sceneRef} className="h-full w-full">
        <Component {...config} />
      </div>
    </canvas>
  );
}

const Img = ({ src, width = 256, height = 256, ...props }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.src = src;

    img.onload = () => {
      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  }, [src]);

  return <canvas key={src} ref={canvasRef} {...props} />;
};
