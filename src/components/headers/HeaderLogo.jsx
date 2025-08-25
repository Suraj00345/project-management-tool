import { Link } from "react-router-dom";
import logo from "../../assets/logo.png"; // Adjust the path as necessary

const HeaderLogo = () => {
  return (
    <Link to="/" className="flex items-center gap-3">
      <div>
        <img src={`${logo}`} alt="" className="w-10 aspect-square object-contain" />
      </div>

      <span className="text-lg sm:text-xl font-bold text-gray-700 tracking-wide">ORGANIVO</span>
    </Link>
  );
};

export default HeaderLogo;
