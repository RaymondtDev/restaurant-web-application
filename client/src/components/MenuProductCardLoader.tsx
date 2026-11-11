import { FaStar } from "react-icons/fa6";

function MenuProductCardLoader() {
  return (
    <div className="bg-gray-300 animate-pulse w-full h-auto row-span-1 md:row-span-3">
      <div className="h-45 md:h-75 overflow-hidden relative bg-gray-400">
        <div className="absolute top-4 right-4 text-gray-500">
          <FaStar size={20} />
        </div>
      </div>
      <div className="px-2 pt-4">
        <div className="w-4/5 h-3 rounded-full bg-gray-500 mb-3"/>
        <div className="w-3/4 h-1.5 rounded-full bg-gray-400 mb-1"/>
        <div className="w-3/4 h-1.5 rounded-full bg-gray-400 mb-1"/>
        <div className="w-3/4 h-1.5 rounded-full bg-gray-400 mb-1"/>
      </div>
      <div className="p-2 mt-2 flex items-center justify-between">
        <div className="w-10 h-2.5 rounded-full bg-gray-400"/>
        <div className="size-9 rounded-full bg-gray-500"/>
      </div>
    </div>
  );
}

export default MenuProductCardLoader;