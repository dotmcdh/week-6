const Tailwind = () => {
  return (
    <div className="container mx-auto">
      <div className="p-3 grid grid-cols-1 md:grid-cols-4 gap-2">
        <div className="flex justify-center col-span-3 text-6xl border-2 border-gray-300 rounded-xl p-6 bg-gray-100">
          1
        </div>
        <div className="flex justify-center text-6xl border-2 border-gray-300 rounded-xl p-6 bg-gray-100">
          2
        </div>
      </div>
    </div>
  );
};

export default Tailwind;
