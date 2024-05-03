const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="flex flex-col items-center justify-between bg-[#363738] px-20 py-3 text-sm text-white lg:flex-row">
      <div className="flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 32 32"
        >
          <path
            d="M31,8c0-2.209-1.791-4-4-4H5c-2.209,0-4,1.791-4,4v9H31V8Z"
            fill="#ea3323"
          ></path>
          <path
            d="M5,28H27c2.209,0,4-1.791,4-4v-8H1v8c0,2.209,1.791,4,4,4Z"
            fill="#fff"
          ></path>
          <path
            d="M5,28H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4ZM2,8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8Z"
            opacity=".15"
          ></path>
          <path
            d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z"
            fill="#fff"
            opacity=".2"
          ></path>
        </svg>
        <p className="ml-2">Indonesia</p>
      </div>
      <div className="flex w-full flex-wrap justify-center lg:justify-end">
        <a href="">
          <span className=" hover:text-gray-400 hover:underline">
            Privacy Policy
          </span>
        </a>
        <span className="mx-2">|</span>
        <a href="">
          <span className="hover:text-gray-400 hover:underline lg:mr-6">
            Terms of Services
          </span>
        </a>
        <a href="">
          <span className="hover:text-gray-400 hover:underline lg:mr-2">
            &copy; {currentYear} Adadeh
          </span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
