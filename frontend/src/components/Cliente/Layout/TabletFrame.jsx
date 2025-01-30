const TabletFrame = ({ children }) => {
  return (
    <div className="hidden md:flex justify-center items-center min-h-screen bg-neutral-900 p-8">
      {/* Frame do Tablet */}
      <div className="bg-zinc-200 rounded-[40px] p-4 shadow-xl h-screen max-h-[900px] relative">
        {/* Câmera do Tablet */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-zinc-300 rounded-b-xl z-50 flex justify-center items-center">
          <div className="w-2 h-2 rounded-full bg-zinc-600"></div>
        </div>

        {/* Borda interna do Tablet */}
        <div className="bg-zinc-300 rounded-[28px] p-2 h-full">
          {/* Tela do Tablet */}
          <div className="relative bg-white rounded-2xl w-[calc(768px-32px)] h-full overflow-hidden">
            {children}
          </div>
        </div>

        {/* Botão Home */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border-4 border-zinc-300"></div>
      </div>
    </div>
  );
};

export default TabletFrame;
