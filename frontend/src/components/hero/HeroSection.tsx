import React from "react";

interface Hero {
  id: number;
  imageUrl: string;
  title: string;
  imageAlt: string;
  buttonUrl: string;
  isButtonDark?: boolean;
}

interface HeroSectionProps {
  heroes: Hero[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ heroes }) => {
  return (
    <section className="flex w-full flex-col gap-4">
      {heroes?.map((hero) => (
        <div
          key={hero.id}
          className="flex h-[calc(100vh-80px-80px)] w-full items-center px-4 text-white sm:px-6 lg:px-8"
          style={{
            backgroundImage: `url(${hero.imageUrl})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <div className="flex w-full items-center lg:flex lg:justify-start">
            <div>
              <h2
                className={`mb-4 max-w-[500px] text-5xl font-bold ${hero.isButtonDark ? "text-black" : "text-white"}`}
              >
                {hero.title}
              </h2>
              <a
                className="group relative inline-block text-sm font-medium text-white focus:outline-none focus:ring"
                href={hero.buttonUrl}
              >
                <span className="absolute inset-0 border border-gray-600 group-active:border-gray-500"></span>
                <span
                  className={`flex items-center border ${hero.isButtonDark ? "border-white bg-black" : "border-black bg-white text-black"} px-12 py-3 font-medium transition-transform active:border-black active:bg-black group-hover:-translate-x-1 group-hover:-translate-y-1`}
                >
                  EXPLORE MORE{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="ml-2 h-6 w-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default HeroSection;
