import { Link } from "react-router";
import { IoIosArrowRoundForward } from "react-icons/io";

interface MenuCardProps {
  category: string,
  route: string,
  thumb: string
}

function MenuCard({ category, route, thumb }: MenuCardProps) {
  return (
    <div
      className="bg-cover bg-no-repeat grid grid-rows-subgrid row-span-2 py-6"
      style={{
        backgroundImage: `url(/${thumb})`,
        borderImage: 'fill 0 linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0))'
      }}
    >
      <div className="h-65" />
      <div className="text-white text-center flex flex-col items-center">
        <h3 className="uppercase font-head text-3xl mb-2">{category}</h3>
        <Link to={route}>
          <div className="py-2 px-6 border-2 border-white capitalize w-fit flex items-center gap-2 transition hover:-translate-y-0.5">
            <p>view menu</p>
            <IoIosArrowRoundForward size={25} />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default MenuCard;