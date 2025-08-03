import { useState } from "react";
import Container from "./Container";
import FilledButton from "./FilledButton";

import logo from "../assets/images/logo-white2.png";
import discordIcon from "../assets/images/discord.svg";
import { Link, useLocation } from "react-router-dom";
import {
  IconArrowBackUp,
  IconArrowDown,
  IconArrowForwardUp,
  IconArrowLeft,
  IconCloud,
} from "@tabler/icons-react";
import BorderButton from "./BorderButton";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(true);
  const [visibility, setVisibility] = useState("");

  const location = useLocation();

  const locs = ["quiz", "brain"];

  const handleToggleMenu = () => {
    setToggleMenu((prev) => !prev);
    setVisibility(toggleMenu ? "" : "hidden");
  };

  return (
    <div className="bg-primary">
      <Container>
        <div className="navbar min-h-[6rem] bg-primary">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-sm mr-1 p-1 lg:hidden"
                onClick={() => handleToggleMenu()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className={`${visibility} menu dropdown-content menu-sm z-[1] mt-3 w-40 rounded-box bg-base-100 p-2 shadow lg:hidden`}
              >
                <li>
                  <Link to="/pricing">Pricing</Link>
                </li>
                <li>
                  <a>Affiliate</a>
                </li>
                <li className="flex flex-row items-center">
                  <Link to="https://discord.gg/rvd4Hayeay" className="w-full">
                    Community
                    <img src={discordIcon} />
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="cursor-pointer text-dimGray">
                    Login
                  </Link>
                </li>
              </ul>
            </div>

            <a
              href={
                location.pathname.includes("brain") ||
                location.pathname.includes("fake-texts") ||
                location.pathname.includes("ai-videos") ||
                location.pathname.includes("quiz") ||
                location.pathname.includes("split") ||
                location.pathname.includes("story") ||
                location.pathname.includes("reddit") ||
                location.pathname.includes("captions") ||
                location.pathname.includes("wyr") ||
                location.pathname.includes("editor")
                  ? "/workspace"
                  : "/"
              }
            >
              <img
                src={logo}
                className="ml-2 w-[70px] hover:cursor-pointer sm:ml-0 sm:w-[90px]"
              />
            </a>
          </div>

          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal gap-3 px-1 text-[1rem] text-dimGray">
              <li>
                <a href="/pricing">Pricing</a>
              </li>
              <li>
                <a>Affiliate</a>
              </li>
              <li className="flex flex-row items-center">
                <div>
                  <a href="https://discord.gg/rvd4Hayeay">Community</a>
                  <img src={discordIcon} />
                </div>
              </li>
            </ul>
          </div>

          <div className="navbar-end flex gap-2 md:gap-5">
            <div className="flex items-center gap-2 md:gap-5">
              <Link
                to="/login"
                className="hidden cursor-pointer text-[1rem] text-dimGray sm:block"
              >
                Login
              </Link>

              <Link
                to="/login"
                className="btn btn-outline btn-primary btn-sm rounded-md text-[1rem] font-normal"
              >
                Get started free
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
