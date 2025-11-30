const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-4 sm:px-6 md:px-12 lg:px-24 text-white z-10 bg-gradient-to-r from-black/80 via-black/40 to-transparent pt-20 sm:pt-0">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-3 sm:mb-4 drop-shadow-[0_4px_6px_rgba(0,0,0,0.7)] max-w-md lg:max-w-2xl">
        {title}
      </h1>

      <p className="hidden sm:block text-sm md:text-base lg:text-lg xl:text-xl mb-4 sm:mb-6 max-w-sm md:max-w-md lg:max-w-lg leading-relaxed drop-shadow-[0_4px_6px_rgba(0,0,0,0.7)] line-clamp-3">
        {overview}
      </p>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <button className="bg-white text-black font-semibold py-2 sm:py-2.5 md:py-3 px-6 sm:px-8 md:px-10 text-sm sm:text-base md:text-lg rounded-md sm:rounded-lg hover:bg-opacity-80 transition flex items-center justify-center gap-2 min-h-[44px]">
          ▶ Play
        </button>
        <button className="bg-gray-500/60 text-white font-semibold py-2 sm:py-2.5 md:py-3 px-6 sm:px-8 md:px-10 text-sm sm:text-base md:text-lg rounded-md sm:rounded-lg hover:bg-gray-500/80 transition min-h-[44px]">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
