"use client"
import { useEffect, useState } from 'react';
import Logo from '@/components/icons/Logo';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { User } from '@supabase/supabase-js';
import { SignOut } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
import { usePathname, useRouter } from 'next/navigation';
import { getRedirectMethod } from '@/utils/auth-helpers/settings';
import s from './Navbar.module.css';

export default function Navlinks({ user }: { user: User | null }) {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
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
            <form onSubmit={(e) => handleRequest(e, SignOut, router)}>
              <input type="hidden" name="pathName" value={usePathname()} />
              <button type="submit" className={s.link}>
                Sign out
              </button>
            </form>
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
