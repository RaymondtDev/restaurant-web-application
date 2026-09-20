import { RxCross2 } from "react-icons/rx";
import { useDisplayState } from "../hooks/useDisplayState";

function AddMenuItem() {
  const displayState = useDisplayState();

  return (
    <div className="relative grid grid-cols-[250px_1fr] w-4/5 h-[90%] bg-white p-2 shadow-md z-30 rounded-lg">

      { displayState?.display && (
        <button 
          className="absolute top-0 left-full m-1 cursor-pointer transition hover:scale-110"
          onClick={displayState?.handleDisplay}
        >
          <RxCross2 size={25} />
        </button>
      ) }

      <div>
        <figure className="w-full aspect-square border border-dashed border-charcoal-500 rounded-md"></figure>
      </div>
      <div></div>
    </div>
  )
}

export default AddMenuItem;