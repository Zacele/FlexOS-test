import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseChimney } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from "../hooks";
import { logout } from '../redux/features/authSlice'
import type { AppDispatch } from '../redux/store'

export default function Navbar() {
  const dispatch: AppDispatch = useAppDispatch();
  return (
    <div className="absolute inset-y-0 left-0 flex-col justify-between w-[80px] h-screen overflow-hidden bg-white md:flex border border-[#E5E7EB] px-3 pt-5">
      <div className='h-full'>
        <div className="items-center justify-center w-16 h-16">
          <p className='text-center mr-[10px] border-b border-[#E5E7EB] pb-3' translate='no'>
            <span className="text-xl font-Inter">Flex</span>
            <br />
            <span className="text-xl font-semibold font-Inter">OS</span>
          </p>
        </div>
        <div>
          <nav className="flex flex-col p-2">
            <div className="py-4">
              <a
                href=""
                className="relative flex justify-center p-3 text-blue-700 rounded bg-[#F5F3FF]"
              >
                <FontAwesomeIcon className='text-[#1F2937]' icon={faHouseChimney} />
                <span className="absolute text-xs font-medium text-white bg-gray-900 left-full ml-4 px-2 py-1.5 top-1/2 -translate-y-1/2 rounded opacity-0 group-hover:opacity-100">
                  Home
                </span>
              </a>
            </div>
          </nav>
        </div>
      </div>

      <div className="sticky inset-x-0 bottom-0 p-2 bg-white border-t border-gray-100">
        <button
          className="flex justify-center w-full px-2 py-1.5 text-sm text-gray-500 rounded-lg hover:bg-gray-50 hover:text-gray-700 group relative"
          onClick={() => dispatch(logout())}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 opacity-75"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>

          <span className="absolute text-xs font-medium text-white bg-gray-900 left-full ml-4 px-2 py-1.5 top-1/2 -translate-y-1/2 rounded opacity-0 group-hover:opacity-100">
            Logout
          </span>
        </button>
      </div>
    </div>
  );
}
