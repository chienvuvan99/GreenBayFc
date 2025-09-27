"use client";

import Image from "next/image";
import { navigations } from "@/contants/navigation";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 bg-transparent transition-all duration-300 backdrop-blur-md z-50 shadow-md text-[#1F1F41]">
      <div className="max-w-[1200px] mx-auto p-3 sm:p-3 flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="About Image"
            width={100}
            height={100}
            className="rounded-full xl:block hidden"
          />
          <Image
            src="/images/logo.png"
            alt="About Image"
            width={80}
            height={80}
            className="rounded-full xl:hidden block"
          />
        </div>

        <nav className="hidden sm:block xl:w-[380px]">
          <ul className="flex items-center gap-6 xl:gap-10">
            {navigations.map((item, index) => (
              <li
                key={index}
                data-aos="fade-left"
                data-aos-duration="1000"
                data-aos-delay={600 + index * 200}
                data-aos-easing="ease-out-back"
              >
                <Link
                  href={item.path}
                  className="text-base xl:text-lg leading-6 font-bold aos-init aos-animate"
                >
                  {item.description}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-row items-center gap-4">
          <button
            className="sm:hidden flex flex-col justify-center items-center w-10 h-10"
            aria-label="Open menu"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span
              className={`block w-6 h-0.5 bg-[#1F1F41] mb-1 transition-all ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-[#1F1F41] mb-1 transition-all ${
                menuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-[#1F1F41] transition-all ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </button>

          <div className="flex items-center">
            <Image
              src="/vietnam-svgrepo-com.svg"
              alt="Vietnamese Flag"
              width={36}
              height={36}
              data-aos="fade-left"
              data-aos-delay="900"
              data-aos-duration="1000"
              data-aos-easing="ease-out-back"
            />
          </div>
        </div>
      </div>

      {menuOpen && (
        <nav className="sm:hidden bg-white bg-opacity-90 backdrop-blur-md shadow-md absolute top-full left-0 w-full z-50">
          <ul className="flex flex-col items-center gap-4 py-4">
            {navigations.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.path}
                  className="text-base font-bold"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.description}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
