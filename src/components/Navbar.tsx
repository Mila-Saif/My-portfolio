"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {FiMenu, FiX} from "react-icons/fi";



export default function Navbar() {
    const [isEyeOpen, setIsEyeOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home')
    const [isMobileMenu, setIsMobileMenu] = useState(false);

    const [isNavVisible, setIsNavVisible] = useState(true);

    const lastScrollY = useRef(0);

    const navRef = useRef(null);
    useEffect (() => {
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setIsMobileMenu(false)
            }

        };

        if (isMobileMenu) {
            document.addEventListener("mousedown", handleClickOutside)

        } else {
            document.removeEventListener('mousedown', handleClickOutside);

        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);

        };

    }, [isMobileMenu]);


    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) setIsMobileMenu(false);


        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
        }, []);
    

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsEyeOpen(true);
            setTimeout(() => setIsEyeOpen(false), 1000);
            setTimeout(() => setIsEyeOpen(true), 1200);
            setTimeout(() => setIsEyeOpen(false), 1400);
        }, 1000)

        return () => clearTimeout(timer)
    }, []);




    useEffect(() => {
        const handleScroll = () => {

                    const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
            setIsNavVisible(false);
        } else {
            setIsNavVisible(true);
        }

        lastScrollY.current = currentScrollY;

        if (currentScrollY < 100 ) {
            setActiveSection("home")
            return;
        }

        const sections = document.querySelectorAll<HTMLElement>("section[id]");
        let currentSection = "home";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            if (currentScrollY >= sectionTop - 300) {
                currentSection = section.getAttribute('id') || "home";
            }
        });
        setActiveSection(currentSection);


        };

            
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);



}, []);





    const navLinks = [
        {name: "Home", href: "#home", id: "home"},
        {name: "Projects", href: "#projects", id: "projects"},
        {name: "About", href: "#about", id: "about" },
        {name: "Contact", href: "#contact", id: "contact"},
    ]


    return ( 
        <nav
        ref={navRef}
        className={`fixed top-0 left-0 z-50 right-0 pt-10 px-16 backdrop-blur-md flex items-center justify-between p-4 border-b border-b-white/10 ${
         isNavVisible ? "translate-y-0"  : "-translate-y-full" 
         
        }`}
        
        onMouseEnter={() => setIsEyeOpen(true)}
        onMouseLeave={() => setIsEyeOpen(false)}
        >


            {/* the logo */}

        <Link href='/' className="flex  items-center justify-center gap-1.5 pt-1">

            <div className=" flex flex-col mt-1 mr-2 gap-1">

                {/* right eye */}

                <div className={`w-2 h-2 bg-white rounded-full shadow-[0_0_8px_2px_rgba(255,255,255,0.8)] transition-transform mb-2 duration-200 origin-center ${
                    isEyeOpen ? "scale-y-100" : "scale-y-[0.1]"
                }`}
                />

                {/* left eye */}

                <div className={`w-2 h-2 bg-white rounded-full shadow-[0_0_8px_2px_rgba(255,255,255,0.8)] transition-transform duration-200 origin-center ${
                    isEyeOpen ? "scale-x-100" : "scale-x-[0.1]"
                }`}
                />



                    
               

            </div>
            
            {/* the mouth */}

          <div className=" flex items-center">
            <svg 
                width="16" 
                height="24" 
                viewBox="0 0 16 24" 
                fill="none" 
                stroke="white" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
            
                
            >
                
                <path d="M2,2 Q10,12 2,22" />
            </svg>
        </div> 
        </Link>

        {/* the links for the pages */}

        <div className=" hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
               const isActive = activeSection === link.id;

                return (
                    <a
                key={link.name}
                href={link.href}
                className={`text-sm font-light uppercase tracking-widest transition-all duration-300 ${isActive
                    ? " text-cyan-400 hover:[text-shadow:0_0_8px_rgba(255,255,255,0.4)]"
                    : "text-slate-400 hover:text-cyan-400 hover:[text-shadow:0_0_8px_rgba(255,255,255,0.4)]"
                }`}
                >
                    {link.name}
                </a>





                );
            
                
                
                


})}

        </div>

        {/* mobile toggle */}

        <button 
        className="md:hidden text-white hover:text-cyan-400 transition-colors z-50"
        onClick={() => setIsMobileMenu(!isMobileMenu)}
        aria-label="Toggle mobile menu"
        >

            {isMobileMenu ? <FiX size={28}/> : <FiMenu size={28} /> }

        </button>

        
       <div
        className={`absolute top-full left-0 right-0 bg-indigo-950 backdrop-blur-xl border-b border-white/10 flex flex-col items-center py-10 gap-8 transition-all duration-300 md:hidden origin-top ${
          isMobileMenu
            ? "opacity-100 scale-y-100 visible"
            : "opacity-0 scale-y-95 invisible"
        }`}
      >
        {navLinks.map((link) => {
          const isActive = activeSection === link.id;
          return (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenu(false)}
              className={`text-lg font-light uppercase tracking-widest transition-all duration-300 ${
                isActive
                  ? "text-cyan-400 [text-shadow:0_0_8px_rgba(255,255,255,0.4)]"
                  : "text-slate-400 hover:text-cyan-400 hover:[text-shadow:0_0_8px_rgba(255,255,255,0.4)]"
              }`}
            >
              {link.name}
            </a>
          );
        })}
      </div>
    </nav>


    );



}