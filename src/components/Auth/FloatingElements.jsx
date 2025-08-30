const FloatingElements = () => {
  return (
    <>
      <div className="absolute top-20 left-1/4 w-8 h-8 bg-yellow-300 rounded-full opacity-60 hidden lg:block animate-pulse" />
      <div className="absolute top-32 right-1/3 w-6 h-6 bg-purple-400 rounded-full opacity-50 hidden lg:block animate-pulse" />
      <div className="absolute bottom-32 left-1/3 w-4 h-4 bg-pink-400 rounded-full opacity-60 hidden md:block animate-pulse" />
    </>
  );
};

export default FloatingElements;
