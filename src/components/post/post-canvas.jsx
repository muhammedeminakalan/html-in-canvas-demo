import React, { useEffect, useRef } from "react";

export const postVariants = {
  pardus: (props) => (
    <div className="h-full flex flex-col justify-between bg-white p-12 border-b-8 border-[#ffca14]">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <span className="bg-[#ffca14] text-[#1a1a1a] px-3 py-1 text-xs font-black tracking-widest rounded-sm">
            GÜNCELLEME
          </span>
          <div className="h-px flex-1 bg-gray-200"></div>
        </div>
        <h2 className="text-5xl font-black leading-tight text-[#1a1a1a] tracking-tight">
          Pardus 25.1 Sürümü Yayımlandı
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          TÜBİTAK tarafından geliştirilmeye devam edilen Pardus’un 25.1 sürümü
          yayımlandı. Pardus 25.1, Pardus 25 ailesinin ilk ara sürümüdür.
        </p>
      </div>
      <div className="flex items-end justify-between">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 overflow-hidden rounded-2xl border border-gray-100 p-1">
            <Img
              src={props.avatar}
              className="h-full w-full object-cover rounded-xl"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold text-[#1a1a1a]">
              Muhammed Emin Akalan
            </span>
            <span className="text-[#ffca14]">Yazılım Geliştirici</span>
          </div>
        </div>

        <div className="flex flex-col items-end h-full justify-between">
          <div className="text-[#1a1a1a]">
            <Img className="w-10 h-10" src="https://github.com/pardus.png" />
          </div>
          <span className="text-xs font-bold text-gray-400 tracking-widest">
            PARDUS.ORG.TR
          </span>
        </div>
      </div>
    </div>
  ),
};

export default function PostCanvas({ canvasRef, sceneRef, config }) {
  const Component = postVariants[config.variant] || postVariants.pardus;

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
