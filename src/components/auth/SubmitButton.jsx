const SubmitButton = ({ isSubmitting, buttonText, loadingText, type }) => {
  return (
    <button
      type={type}
      disabled={isSubmitting}
      className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 cursor-pointer"
    >
      {isSubmitting ? loadingText : buttonText}
    </button>
  );
};

export default SubmitButton;
