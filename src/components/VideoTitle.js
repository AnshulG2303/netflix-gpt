const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-6 md:px-24 text-white z-10 bg-gradient-to-r from-black/70 via-black/30 to-transparent">
      <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-[0_4px_6px_rgba(0,0,0,0.7)]">
        {title}
      </h1>

      <p className="hidden md:block text-lg md:text-xl mb-6 max-w-lg leading-relaxed drop-shadow-[0_4px_6px_rgba(0,0,0,0.7)]">
        {overview}
      </p>

      <div className="flex gap-3">
        <button className="bg-white text-black font-semibold py-2 md:py-3 px-6 md:px-10 text-lg rounded-lg hover:bg-opacity-80 transition flex items-center gap-2">
          ▶ Play
        </button>
        <button className="bg-gray-500/60 text-white font-semibold py-2 md:py-3 px-6 md:px-10 text-lg rounded-lg hover:bg-gray-500/80 transition">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
