import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  const handleRedirect = (path: string) => {
    navigate(path);
  };

  return (
    <nav className="bg-[#6b858c]">
      <div className="max-w-6xl px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <div>
              <a
                href="#"
                className="flex items-center py-5 px-2 text-white hover:text-gray-900"
              >
                <span className="font-bold">Home</span>
              </a>
            </div>

            <div className="md:flex items-center space-x-1">
              <button
                onClick={() => handleRedirect("category")}
                className="py-5 px-3 text-white hover:text-gray-900"
              >
                Category
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
