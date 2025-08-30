import logo from "../../assets/logo.png";

const FormCard = ({ children, title }) => {
  return (
    <div className="w-10/12 max-w-md mx-auto  bg-white rounded-2xl shadow-lg p-7">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-4 ">
          <img src={`${logo}`} alt="company logo" className="h-10 object-contain" />
          <span className="text-xl lg:text-2xl font-bold text-gray-800">ORGANIVO</span>
        </div>
      </div>

      <div className="">
        <h4 className="text-sm lg:text-base font-semibold text-gray-800 text-center">{title}</h4>
      </div>

      {children}
    </div>
  );
};

export default FormCard;
