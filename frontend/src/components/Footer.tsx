const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="flex justify-between bg-[#363738] px-20 py-3 text-white">
      <div>Indonesia</div>
      <div>
        <a href="">
          <span className=" hover:text-gray-400 hover:underline">
            Privacy Policy
          </span>
        </a>
        <span className="mx-2">|</span>
        <a href="">
          <span className="mr-6 hover:text-gray-400 hover:underline">
            Terms of Services
          </span>
        </a>
        <a href="">
          <span className="mr-2 hover:text-gray-400 hover:underline">
            &copy; {currentYear} Adadeh
          </span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
