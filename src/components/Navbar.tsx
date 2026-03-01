"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { section } from "framer-motion/client";



export default function Navbar() {
    const [isEyeOpen, setIsEyeOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home')

    const [isNavVisible, setIsNavVisible] = useState(true);
    const lastScrollY = useRef(0);

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
        className={`fixed top-0 left-0 z-50 right-0 pt-10 px-8 backdrop-blur-md flex items-center justify-between p-4 border-b border-b-white/10 ${
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

        <div className="flex items-center gap-8">
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
           
        </nav>


    );



}