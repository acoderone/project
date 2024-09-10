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

export default function Navlinks({ user }: { user: User | null }) {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
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
        setDropdownVisible(false);
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
    setDropdownVisible((prev) => !prev);
  };

  return (
    <nav id="header" className="fixed w-full z-30 top-0 text-white gradient">
      <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
        <div className="pl-4 flex items-center">
          <Link
            className="toggleColour text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
            href=""
          >
            <Logo />
            RateUpdate
          </Link>
        </div>
        <div className="block lg:hidden pr-4">
          <button
            id="nav-toggle"
            // onClick={toggleDropdown}
            className="flex items-center p-1 text-white focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
          >
            <Menu />
          </button>
        </div>
        <div
          className={`w-full flex-grow lg:flex lg:items-center lg:w-auto ${isDropdownVisible ? "" : "hidden"
            } mt-2 lg:mt-0 bg-white lg:bg-transparent text-white p-4 lg:p-0 z-20`}
          id="nav-content"
        >
          <ul className="list-reset lg:flex justify-end flex-1 items-center">
            <li className="mr-3">
              <Link
                className="inline-block text-white no-underline hover:text-underline py-2 px-4"
                href="/#features"
              >
                Features
              </Link>
            </li>
            <li className="mr-3">
              <Link
                className="inline-block text-white no-underline hover:text-underline py-2 px-4"
                href="/#pricing"
              >
                Pricing
              </Link>
            </li>
            <li className="mr-3">
              <Link
                className="inline-block text-white no-underline hover:text-underline py-2 px-4"
                href="/#contact"
              >
                Contact us
              </Link>
            </li>
          </ul>
          {user ? (
            <>
              <div className="flex items-center md:order-2 space-x-3 relative md:space-x-0">
                <button type="button"
                  className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  id="user-menu-button" aria-expanded={isUserDropdownOpen}
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="w-8 h-8 rounded-full bg-white">CCI</div>
                  {/* <Image className="w-8 h-8 rounded-full" src={false} alt="user photo" /> */}
                </button>
                <div
                  ref={userDropdownRef}
                  className={`z-50 ${isUserDropdownOpen && !!user ? 'block' : 'hidden'} absolute right-0 top-8 mt-2 w-48 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
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
          ) : (
            <Link
              href="/signin"
              id="navAction"
              className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
              Get Started
            </Link>
          )}
        </div>
      </div>
      <hr className="border-b border-gray-100 opacity-25 my-0 py-0" />
    </nav>
  );
}
