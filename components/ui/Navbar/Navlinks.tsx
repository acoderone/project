"use client"
import { useEffect, useState, useRef } from 'react';
import Logo from '@/components/icons/Logo';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { User } from '@supabase/supabase-js';
import { SignOut } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import { usePathname, useRouter } from 'next/navigation';
import { getRedirectMethod } from '@/utils/auth-helpers/settings';
import s from './Navbar.module.css';
import Button from '../Button';
import Avatar from '@/components/icons/Avatar';

export default function Navlinks({ user }: { user: User | null }) {
  const [isMenuDropdownVisible, setMenuDropdownVisible] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const router = getRedirectMethod() === 'client' ? useRouter() : null;

  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById("header");
      if (window.scrollY > 50) {
        header?.classList.add("scrolled");
      } else {
        header?.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const navMenuDiv = document.getElementById("nav-content");
      const navMenu = document.getElementById("nav-toggle");

      if (
        navMenuDiv &&
        navMenu &&
        !navMenuDiv.contains(target) &&
        !navMenu.contains(target)
      ) {
        setMenuDropdownVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setMenuDropdownVisible((prev) => !prev);
  };

  return (
    <nav id="header" className="fixed w-full z-30 top-0 text-white gradient transition-all duration-300 ease-in-out">
      <div className="w-full container flex flex-wrap items-center justify-between mx-auto mt-0 py-2">
        {/* Logo */}
        <div className="pl-4 flex items-center">
          <Link
            className="toggleColor text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
            href=""
          >
            <Logo />
            RateUpdate
          </Link>
        </div>

        <div className='flex items-center lg:order-2 space-x-3 lg:space-x-0 rtl:space-x-reverse'>
          {/* Avatar Dropdown list */}
          {
            user && (
              <>
                {/* Avatar */}
                <div className='relative'>
                  <button type="button"
                    className="flex text-sm rounded-full border-2 border-white p-2 lg:me-0 focus:ring-2 focus:ring-gray-300"
                    id="user-menu-button" aria-expanded={isUserDropdownOpen}
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  >
                    <span className="sr-only">Open user menu</span>
                    <Avatar />
                  </button>
                  {/* Avatar Dropdown list */}
                  <div
                    ref={userDropdownRef}
                    className={`z-50 ${isUserDropdownOpen && !!user ? 'block' : 'hidden'} absolute right-0 top-10 mt-2 w-48 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
                  >
                    <div className="px-4 py-3">
                      <span className="block text-sm text-gray-900">{user.user_metadata.full_name ?? ""}</span>
                      <span className="block text-sm  text-gray-500 truncate">{user.email ?? ""}</span>
                    </div>
                    <ul className="py-2" aria-labelledby="user-menu-button">
                      <li>
                        <Link href="/account"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                      </li>
                      <li>
                        <Link href="/signin/update_password"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</Link>
                      </li>
                      <li>
                        <form onSubmit={(e) => handleRequest(e, SignOut, router)}>
                          <input type="hidden" name="pathName" value={usePathname()} />
                          <button type="submit" className="block px-4 py-2 w-full text-left text-sm text-gray-700 hover:bg-gray-100">
                            Sign out
                          </button>
                        </form>
                      </li>
                    </ul>
                  </div>
                </div>
              </>
            )
          }

          {/* Toggle Menu PopUp Button */}
          <button
            id="nav-toggle"
            onClick={toggleDropdown}
            className="toggleColor inline-flex items-center p-1 text-white justify-center rounded-lg lg:hidden"
          >
            <Menu />
          </button>
        </div>


        {/* Nav Content */}
        <div
          className={`items-center justify-between w-full lg:flex lg:w-auto lg:order-1 ${isMenuDropdownVisible ? "" : "hidden"} mt-2 lg:mt-0 lg:bg-transparent text-white p-4 lg:p-0 z-20 transition-all duration-300 ease-in-out bg-white`}
          id="nav-content"
        >
          {/* Menu Links */}
          <ul
            className="flex flex-col lg:flex-row"
          >
            <li className="mr-3">
              <Link
                className="toggleColor inline-block text-primary lg:text-white text-lg font-bold no-underline hover:text-underline py-2 px-4"
                href="/#features"
              >
                Features
              </Link>
            </li>
            <li className="mr-3">
              <Link
                className="toggleColor inline-block text-primary lg:text-white text-lg font-bold no-underline hover:text-underline py-2 px-4"
                href="/#pricing"
              >
                Pricing
              </Link>
            </li>
            <li className="mr-3">
              <Link
                className="toggleColor inline-block text-primary lg:text-white text-lg font-bold no-underline hover:text-underline py-2 px-4"
                href="/#contact"
              >
                Contact us
              </Link>
            </li>
          </ul>
          {!user && (
            <div className="flex lg:ml-4">
              <Link
                href="/signin"
                id="navAction"
                className="hover:underline bg-primary text-white lg:bg-white lg:text-gray-800 font-bold rounded-full my-2 py-3 px-8 shadow-lg transform transition hover:scale-105 duration-300 ease-in-out">
                Get Started
              </Link>
            </div>

          )}
        </div>


      </div>
      <hr className="border-b border-gray-100 opacity-25 my-0 py-0" />
    </nav >
  );
}
