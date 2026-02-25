"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function Navbar() {
    const [isEyeOpen, setIsEyeOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsEyeOpen(true);
            setTimeout(() => setIsEyeOpen(false), 1000);
            setTimeout(() => setIsEyeOpen(true), 1200);
            setTimeout(() => setIsEyeOpen(false), 1400);
        }, 1000)

        return () => clearTimeout(timer)
    }, []);

    const navLinks = [
        {name: "Home", href: "/"},
        {name: "Projects", href: "projects"},
        {name: "About", href: "about"},
        {name: "Contact", href: "contact"},
    ]


    return ( 
        <nav
        className="flex items-center justify-between p-4 border-b border-b-white/10"
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
               const isActive = pathname === link.href;

                return (
                    <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-light uppercase tracking-widest transition-all duration-300 ${isActive
                    ? " text-cyan-400 hover:[text-shadow:0_0_8px_rgba(255,255,255,0.4)]"
                    : "text-slate-400 hover:text-cyan-400 hover:[text-shadow:0_0_8px_rgba(255,255,255,0.4)]"
                }`}
                >
                    {link.name}
                </Link>


                );
            
                
                
                


})}

        </div>
           
        </nav>


    );



}