import AddMenuItem from "../components/AddMenuItem";
import { useDisplayState } from "../hooks/useDisplayState";
import { useToast } from "../hooks/useToast";

function Menu() {
  const displayState = useDisplayState();
  const toastState = useToast();

  return (
    <div className="relative size-full p-4">
      <h1>Menu</h1>
      <button
        className="py-2 px-4 bg-charcoal-700 text-white rounded-sm cursor-pointer"
        onClick={displayState?.handleDisplay}
      >
        Add New
      </button>
      <button
        onClick={() =>toastState?.displayToast('success', 'Sucessfully Created Product')}
      >
        Toast
      </button>

      { displayState?.display && (
        <div className="absolute pl-4 top-0 left-0 size-full flex items-center bg-charcoal-800/30 backdrop-blur-sm">
          <AddMenuItem />
        </div>
      ) }
    </div>
  );
}

export default Menu;