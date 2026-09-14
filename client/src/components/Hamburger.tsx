import { useMobileState } from '../hooks/UseMobileState';

function Hamburger() {
  const mobileState = useMobileState();

  return (
    <div className="md:hidden size-10 bg-white shadow-md p-1 flex flex-col items-center justify-evenly rounded-md cursor-pointer transition hover:scale-110" onClick={mobileState?.handleDisplayMenu}>
      <span className="w-8/10 h-0.75 bg-charcoal-800 rounded-full"></span>
      <span className="w-8/10 h-0.75 bg-charcoal-800 rounded-full"></span>
      <span className="w-8/10 h-0.75 bg-charcoal-800 rounded-full"></span>
    </div>
  );
}

export default Hamburger;