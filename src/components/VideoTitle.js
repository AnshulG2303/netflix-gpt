const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute top-0 left-0 w-screen aspect-video pt-[20%] px-6 md:px-24 text-white z-10">
      <h1 className="text-2xl md:text-6xl font-bold drop-shadow-[0_4px_6px_rgba(0,0,0,0.7)]">
        {title}
      </h1>

      <p className="hidden md:block py-6 text-lg w-1/3 leading-relaxed drop-shadow-[0_4px_6px_rgba(0,0,0,0.7)]">
        {overview}
      </p>

      <div className="flex flex-wrap gap-3 md:gap-4">
        <button className="bg-white text-black py-2 md:py-4 px-4 md:px-12 text-lg md:text-xl rounded-lg hover:bg-opacity-80 transition">
          ▶ Play
        </button>

        <button className="hidden md:inline-block bg-gray-500/60 text-white py-2 md:py-4 px-4 md:px-12 text-lg md:text-xl rounded-lg hover:bg-gray-500/80 transition">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
