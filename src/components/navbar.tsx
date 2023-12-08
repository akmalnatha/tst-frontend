import { useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { BsPerson } from "react-icons/bs";
import { IoTicket } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { NavLink } from "react-router-dom";

interface NavbarProps {
  active: number;
  open: boolean;
}

function Navbar({ active, open }: NavbarProps) {
  const [openNavbar, setOpenNavbar] = useState<boolean>(open);
  return (
    <>
      <div className="w-full h-auto flex items-center justify-between bg-background py-2 px-6">
        <div className="cursor-pointer flex flex-col gap-2 group" onClick={() => setOpenNavbar(true)}>
          <span className="bg-mono-grey group-hover:bg-mono-light_grey h-[3px] w-8 block rounded-full"></span>
          <span className="bg-mono-grey group-hover:bg-mono-light_grey h-[3px] w-8 block rounded-full"></span>
          <span className="bg-mono-grey group-hover:bg-mono-light_grey h-[3px] w-8 block rounded-full"></span>
        </div>
        {/* <div className="flex-grow"></div> */}
        <img
          src="/assets/logo.png"
          alt="Logo Holi_train"
          className="w-[56px] justify-self-center"
        />
      </div>

      <div
        className={`${
          openNavbar ? "" : "-translate-x-full"
        } ease-in-out duration-300 h-screen overflow-hidden fixed z-50 top-0 left-0 pt-[60px] pb-[30px] flex flex-col justify-between w-[300px] shadow-navbar bg-background`}
      >
        <div className="flex flex-col gap-[24px]">
          <img
            src="/assets/logo.png"
            alt="Logo Holi_train"
            className="mx-auto w-[100px]"
          />
          <div className="flex gap-[10px] justify-center items-center">
            <div className="bg-purple-ternary bg-opacity-25 rounded-full py-[8px] px-[12px] h-fit w-fit">
              <p className="text-purple-primary font-bold text-[16px]">Admin</p>
            </div>
            <p className="text-mono-600 text-[20px]">2023/2024</p>
          </div>
          <div className="flex flex-col gap-[16px]">
            <NavLink
              to="/"
              className={`${
                active == 0
                  ? "border-l-4 border-purple-secondary text-purple-secondary box-border font-bold px-[20px]"
                  : "text-mono-600 px-[24px]"
              } text-[24px] py-[8px] hover:text-purple-ternary active:text-purple-secondary hover:border-purple-ternary active:border-purple-secondary flex items-center gap-4 cursor-pointer`}
            >
              <LuLayoutDashboard />
              <p className="text-[20px]">Dashboard</p>
            </NavLink>
            <NavLink
              to="/tiket"
              className={`${
                active == 1
                  ? "border-l-4 border-purple-secondary text-purple-secondary box-border font-bold px-[20px]"
                  : "text-mono-600 px-[24px]"
              } text-[24px] py-[8px] hover:text-purple-ternary active:text-purple-secondary hover:border-purple-ternary active:border-purple-secondary flex items-center gap-4 cursor-pointer`}
            >
              <IoTicket />
              <p className="text-[20px]">Tiket</p>
            </NavLink>
            <NavLink
              to="/profile"
              className={`${
                active == 2
                  ? "border-l-4 border-purple-secondary text-purple-secondary box-border font-bold px-[20px]"
                  : "text-mono-600 px-[24px]"
              } text-[24px] py-[8px] hover:text-purple-ternary active:text-purple-secondary hover:border-purple-ternary active:border-purple-secondary flex items-center gap-4 cursor-pointer`}
            >
              <BsPerson />
              <p className="text-[20px]">Profile</p>
            </NavLink>
          </div>
        </div>
        <div className="flex flex-col gap-[15px]">
          <NavLink
            to="/login"
            className={`text-[24px] px-[24px] py-[8px] text-error flex items-center gap-4 cursor-pointer`}
          >
            <BiLogOut />
            <p className="text-[20px] font-bold">Logout</p>
          </NavLink>
          <hr />
          <p className="p-6 text-mono-600 text-[12px]">
            Holi-Train | All Rights Reserved
          </p>
        </div>
      </div>
      <div
        className={`${
          openNavbar ? "block" : "hidden"
        } h-screen w-full bg-black bg-opacity-50 z-10 fixed`}
        onClick={() => setOpenNavbar(false)}
      ></div>
    </>
  );
}

export default Navbar;
