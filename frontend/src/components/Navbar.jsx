import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PlusCircle, Search } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
import profile from "../assets/profile.png";
import { AuthContext } from "../contexts/AuthContext";
import "../css/Navbar.css";
import Greeting from "./Greeting";
function Navbar() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 769);
  const { user, handleLogout } = useContext(AuthContext);

  function handleResize() {
    setIsMobile(window.innerWidth < 769);
  }

  window.addEventListener("resize", handleResize);

  return (
    <div className="fixed  top-0 z-10  flex items-center h-16 w-full bg-transparent px-40 max-md:px-[3vw]  backdrop-blur-lg shadow-lg ">
      {/* Mobile Drawer */}

      <Drawer direction="bottom">
        {isMobile && (
          <DrawerTrigger asChild>
            <Button
              variant="outline"
              className="text-2xl bg-transparent border-none shadow-none hover:bg-transparent"
            >
              &#9776;
            </Button>
          </DrawerTrigger>
        )}

        {isMobile && (
          <DrawerContent>
            <DrawerHeader className="space-y-2">
              <Link to="/">
                <Button className="w-full" variant="outline">
                  Home
                </Button>
              </Link>
              <Link to="/">
                <Button className="w-full" variant="outline">
                  About
                </Button>
              </Link>

              {user ? (
                <Button
                  className="w-full"
                  variant="destructive"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              ) : (
                <>
                  <Link to="/login">
                    <Button className="w-full" variant="outline">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="w-full" variant="outline">
                      Signup
                    </Button>
                  </Link>
                </>
              )}
            </DrawerHeader>

            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline" className="text-2xl">
                  &times;
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        )}
      </Drawer>

      {/* Logo */}
      <Link
        to="/"
        className="flex flex-1 items-center gap-3 max-md:absolute max-md:left-1/2 max-md:-translate-x-1/2"
      >
        <div className="h-[1.2rem] w-[1.2rem] text-current">
          <svg viewBox="0 0 48 48" fill="none">
            <path
              d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <h2 className="text-4xl font-semibold max-md:hidden">RideOn</h2>
      </Link>

      {/* Right Side (Logged In) */}
      {user && (
        <div className="flex flex-1 justify-end items-center gap-[1.8vw]">
          <Link to="/find" className="flex items-center gap-1 text-gray-700">
            <Search size={20} strokeWidth={1.5} />
            <span className="max-md:hidden">Search</span>
          </Link>

          <Link to="/create" className="flex items-center gap-1 text-gray-700">
            <PlusCircle size={22} strokeWidth={1.5} />
            <span className="max-md:hidden">Publish a ride</span>
          </Link>
          {!isMobile && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <img src={profile} alt="" className="nav-logo-new" />

                  <div className="nav-logo-new">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 " align="start">
                <DropdownMenuGroup>
                  <Link onClick={handleLogout}>
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      )}

      {/* Desktop Guest */}
      {!isMobile && user === null && (
        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button
              variant="outline"
              className="w-32 rounded-full text-blue-800"
            >
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="w-32 rounded-full bg-blue-800 hover:bg-blue-700">
              Signup
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
