import { useState } from "react";
import ReservationForm from "../../components/ReservationForm";
import { IoIosArrowRoundForward } from "react-icons/io";

function Home() {
  const [displayForm, setDisplayForm] = useState<boolean>(false);

  const hideForm: () => void = () => {
    setDisplayForm(false);
  }

  return (
    <div className="bg-white">
      <section className="flex px-2 py-20 lg:py-25 md:px-12 lg:px-24 bg-gray-400 bg-[url('/hero-bg-mobile.png')] md:bg-[url('/hero-bg.png')] bg-cover bg-no-repeat">
        <div className="md:flex-2/3 lg:flex-1/2">
          <h1 className="text-7xl scale-y-125 my-8 font-head font-extralight uppercase text-white">
            grilled meats and tasty eats
          </h1>
          <p className="capitalize text-white mb-10 md:w-7/10 text-pretty">
            we aim to satisy all your flame grilled meat cravings. all the flame grilled chicken, burgers, sausages, and steaks you can eat.
          </p>
          <button className="flex items-center gap-2 py-4 px-6 bg-white rounded-md cursor-pointer transition hover:scale-105" onClick={() => setDisplayForm(true)}>
            Reservation
            <IoIosArrowRoundForward size={25} />
          </button>
        </div>
        <div className="hidden md:block md:flex-1/3 lg:flex-1/2"></div>
      </section>

      { displayForm && (
        <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center">
          <ReservationForm displayFunc={hideForm} />
        </div>
      )}
    </div>
  );
}

export default Home;