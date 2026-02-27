
"use client";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { FiInstagram, FiGithub, FiArrowRight} from "react-icons/fi"
import { RiLinkedinLine } from "react-icons/ri";
import Image from "next/image";

import Link from "next/link";
import {motion} from "framer-motion"



export default function Home() {


  const projects = [
    {
      title: "Recipe Finder",
      description: "Discover and save delicious recipes. Build with API integration",
      image: "/recipe.png",
      tech: ["Next.js", "Tailwind", "API"],
      link: "https://recipe-app-smoky-pi.vercel.app/",
    },

    {
      title: "To-Do Lisst",
      description: "A simple task manager to keep your day organized ",
      image: "/todo.png",
      tech: ["React", "Tailwind", "State management"],
      link: "https://to-do-steel-eight.vercel.app/",
    },
      {
      title: "Weather Dashboard",
      description: "Real-time weather tracking with favorites system to save and monitor multiple locations ",
      image: "/weather.png",
      tech: ["Next.js", "Tailwind", "Weather API"],
      link: "https://weather-dashboard-three-green.vercel.app/",
    }




  ];




  return (
    <main className=" min-h-screen bg-linear-to-br from-blue-950 via-indigo-950 to-slate-950 text-white p-8 ">
      <div className="max-w-7xl mx-auto mt-1"  >
        {/* the navbar */}
        <div>
          <Navbar/>
        </div>

{/* the hero section */}
        <section className="flex flex-col justify-center min-h-[85vh] mt-10 px-4">
          
          
          <p className=" mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-white drop-shadow-[0_0_15px_rgba(255,2555,255,0.3)]
            I build modern web designs. uppercase tracking-[0.3em] text-sm font-semibold mb-4 animate-pulse">
            Hi, this is Mila
          </p>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
            I'm a Frontend Developer.
          </h2>

          <h3 className="text-2xl md:text-4xl font-bold tracking-tight mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-white drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
            I build modern web designs.
          </h3>

          <p className="text-slate-400 max-w-2xl text-lg font-light mb-12 leading-relaxed">
            I build scalable and beautiful design applications. 
            Turning ideas into digital realities using Next.js and React.
          </p>

          <div className="flex items-center gap-6">
            <Button className="h-auto px-8 py-3 rounded-full border  border-cyan-400 bg-transparent hover:text-slate-950 font-semibold hover:bg-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.6) transition-all duration-300">
              View Projects
            </Button>

          </div>

        </section>

          

       

        
        

      

     
      {/* the projects section */}

      <motion.section
        initial={{opacity: 0, y:50}}
        whileInView={{opacity: 1, y: 0}}
        transition={{duration: 0.8, ease:"easeOut"}}
        viewport={{once: true, amount: 0.2 }}
        className="px-4 pb-32"
        >

        

        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white mb-3 tracking-tight"> Selected Projects

          </h3>
          <div className="w-16 h-1 bg-cyan-400 rounded-full drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]"></div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 mt-10 gap-8">
          {projects.map((project, index) => (
            <div 
            key={index}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all  duration-500 hover:-translate-y-2  hover:shadow-[0_0_1px_rgba(34,211,238,0.5)]"
            >

              <div className="relative aspect-video w-full overflow-hidden bg-slate-900 border-b border-white/10 ">
                <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                
                />

            


              </div>

              <div className="p-6 flex flex-col grow">
                <h4 className="text-xl font-bold text-white mb-2">
                  {project.title}
                </h4>
                <p className="text-slate-400 font-light text-sm mb-6 grow">
                  {project.description}

                </p>


                <div className="flex flex-wrap gap-2 mb-6 ">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="px-1 text-sm font-medium text-cyan-300 bg-cyan-400/10 rounded-full border border-cyan-400/20">
                      {tech}

                    </span>
                  ))}

                </div>

                <div className="max-h-0 overflow-hidden opacity-0 transition-all duration-500 ease-in-out group-hover:max-h-12 group-hover:opacity-100 mt-0 group-hover:mt-4">

                  <Link href={project.link} target="_blank"
                  className="group/btn  inline-flex w-fit items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white transition-colors"

                >
                  View Website
                <FiArrowRight
                className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-3"
                />
                  
                </Link>
                </div>



              </div>


            </div>

          ))}

        </div>

      
       </motion.section>
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
