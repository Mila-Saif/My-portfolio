
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { FiInstagram, FiGithub} from "react-icons/fi"
import { RiLinkedinLine } from "react-icons/ri";

import Link from "next/link";



export default function Home() {





  return (
    <main className=" min-h-screen bg-linear-to-br from-blue-950 via-indigo-950 to-slate-950 text-white p-8 ">
      <div className="max-w-7xl mx-auto mt-1"  >
        {/* the navbar */}
        <div>
          <Navbar/>
        </div>

{/* the hero section */}
        <section className="flex flex-col mt-32 px-4">
          
          
          <p className="text-cyan-400 uppercase tracking-[0.3em] text-sm font-semibold mb-4 animate-pulse">
            Hi, this is Mila
          </p>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            I'm a Frontend Developer.
          </h1>

          <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
            I build modern web designs.
          </h2>

          <p className="text-slate-400 max-w-2xl text-lg font-light mb-12 leading-relaxed">
            I build scalable and beautiful design applications. 
            Turning ideas into digital realities using Next.js and React.
          </p>

          <div className="flex items-center gap-6">
            <Button className="h-auto px-8 py-3 rounded-full bg-cyan-400 text-slate-950 font-semibold hover:bg-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.6) transition-all duration-300">
              View Projects
            </Button>

          </div>

          

        </section>

        
        

      </div >

      {/* social links  */}

      <div className="fixed right-12 top-[90%] -translate-y-1/2 flex flex-col gap-4 z-50 hidden md:flex ">

         <a href= 'https://github.com/Mila-Saif' target="_blank" className=" group-hover:scale-120 group"  >
          
          < FiGithub className="w-5 h-5  hover:text-gray-400 duration-200 transition-transform "/>

            </a>

          
          <a href= 'https://www.instagram.com/mila_fawzi/ ' target="_blank" className=" group-hover:scale-120 group"  >
          < FiInstagram className="w-5 h-5  hover:text-gray-400 duration-200 transition-transform "/>

            </a>

         <a href= 'https://www.linkedin.com/in/mila-fawzi-306655251' target="_blank" className=" group-hover:scale-120 group"  >
          
           <RiLinkedinLine 
              className="w-5 h-5  hover:text-gray-400 duration-200 transition-transform "/>

            </a>

      </div>
       
    </main>
  );
}
