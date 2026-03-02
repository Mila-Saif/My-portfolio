
"use client";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { FiInstagram, FiGithub, FiArrowRight} from "react-icons/fi"
import { RiLinkedinLine } from "react-icons/ri";
import Image from "next/image";

import Link from "next/link";
import {motion} from "framer-motion"

import {useState} from "react";





export default function Home() {

  const [isContactViewd, setIsContactViewd] = useState(false);



  const projects = [
    {
      title: "Recipe Finder",
      description: "Discover and save delicious recipes. Build with API integration",
      image: "/Recipe.png",
      tech: ["Next.js", "Tailwind", "API"],
      link: "https://recipe-app-smoky-pi.vercel.app/",
    },

    {
      title: "To-Do List",
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
        <section id="home" className="flex flex-col justify-center min-h-[85vh] mt-10 px-4">
          
          
          <p className=" mb-8 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-white uppercase tracking-[0.3em] text-sm font-semibold animate-pulse drop-shadow-[0_0_15px_rgba(255,2555,255,0.3)]">
             
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

          <div className="flex items-center - gap-6">
            <a href="#projects">
              <Button className="h-auto px-8 py-3 rounded-full border  border-cyan-400 bg-transparent hover:text-slate-950 font-semibold hover:bg-cyan-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.6) transition-all duration-300">
              View Projects
            </Button>


            </a>
          

          </div>

        </section>

          

       

        
        

      

     
      {/* the projects section */}

      <motion.section
        id="projects"
        initial={{opacity: 0, y:50}}
        whileInView={{opacity: 1, y: 0}}
        transition={{duration: 0.8, ease:"easeOut"}}
        viewport={{once: true, amount: 0.2 }}
        className="px-4 pt-10 pb-32"
        >

        

        <div className="mb-16">
          <h3 className=" text-3xl md:text-3xl font-bold text-white mb-3 tracking-tight"> Selected Projects

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


       {/* the about  section */}


       <motion.section 
       id="about"
       initial={{opacity:0, y:50}}
       whileInView={{opacity: 1, y:0}}
       transition={{duration:0.8, ease:'easeOut'}}
       viewport={{once: true, amount:0.2}}
       className="px-4 pb-20 pt-4"
       >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">

          <div className="md:col-span-4 flex mb-16 flex-col justify-start">
            <h3 className="text-3xl md:text-3xl font-bold text-white mb-6 tracking-tight leading-tight">

             More <br className="hidden md:block"/>About  Me


            </h3>
            <div className=" w-16 h-1 bg-cyan-400 rounded-full drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">

            </div>

          </div>

          <div className="md:col-span-8 grid grid-cols-1  sm:grid-cols-2 gap-6 ">

            <div className="sm:col-span-2 p-8 rounded-2xl border border-white/10  backdrop-blur-sm hover:border-white/20 transition-all duration-500 hover:shadow-[0_0_20px_rgba(34,211,238,0.1)]">
              <h4 className="text-cyan-400 text-sm font-semibold upperace tracking-widest mb-4">
                Me
              </h4>
              <p className="text-slate-300 leading-relaxed font-light text-lg ">
                I craft pixel-perfect UIs and I'm actively on a mission to make things move on screen

              </p>
            </div>

            <div className="p-8 rounded-2xl border border-white/10 backdrop-blur-sm  hover:border-white/20 transition-all duration-500 hover:shadow-[0_0_20px_rgba(34,211,238,0.1)]">
              <h4 className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-4 ">
                Based In

              </h4>

              <p className="text-white font-medium text-lg">
                
                Sana'a, Yemen
              </p>
              <p className="text-slate-400 text-sm mt-1 font-light">
                Available for remote work
              </p>
              
            </div>

            <div className="p-8 rounded-2xl border border-white/10  backdrop-blur-sm hover:border-white/20 transition-all duration-500 hover:shadow-[0_0_20px_rgba(34,211,238,0.1)]">
              <h4 className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-4">Languages</h4>
              <div className="flex flex-col gap-2">
                <p className="text-white font-medium text-lg">Arabic <span className="text-slate-500 font-light text-sm ml-2">Native</span></p>
                <p className="text-white font-medium text-lg">English <span className="text-slate-500 font-light text-sm ml-2">Fluent</span></p>
              </div>
            </div>

            <div className="sm:col-span-2 p-8 rounded-2xl border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-500 hover:shadow-[0_0_20px_rgba(34,211,238,0.1)] ">
            <h4 className="text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-4">Core Skills</h4>
            <div className="flex flex-wrap gap-3">
              {["React", "Next.js", "Tailwind CSS", "UI UX", "JavaScript", "TypeScript", "Framer Motion", "API Integration", "Git", "Prompt Engineering "].map((skills, i) => (
                <span key={i} className="px-4 py-2 text-sm font-medium text-slate-300 bg-white/5 rounded-full border border-white/10 hover:border-cyan-400/50 hover:text-cyan-300 transition-colors duration-300 cursor-default">
                  {skills}

                </span>

              ))}

            </div>


            </div>



          </div>


        </div>



       </motion.section>

       {/* the contact section  */}

       <motion.section
       id="contact"
       initial={{opacity:0, y:50}}
       whileInView={{opacity:1, y:0}}
       transition={{duration:0.8, ease:'easeOut'}}
       viewport={{once: false, amount:0.2}} 
          
          onViewportEnter={() => setIsContactViewd(true)}
          onViewportLeave={() => setIsContactViewd(false)}
          className="px-4 pb-20 pt-20"
        >

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 p-10 md:p-16 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/20 transition-all duration-500 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)]">
            
            <div className="flex flex-col">
              <h3 className="text-lg md:text-3xl font-bold text-white mb-6 tracking-tight">Let's build <br/> something <span className="text-cyan-400">together.</span></h3>
              <div className="w-16 h-1 bg-cyan-400 rounded-full drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]"></div>
            </div>

            

            <div className="flex flex-col items-start md:items-end gap-8">

              <div className="flex gap-6 mt-4">
                <a href='https://github.com/Mila-Saif' target="_blank" className="p-4 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-cyan-400 hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:-translate-y-1 transition-all duration-300 group">
                  <FiGithub className="w-6 h-6 group-hover:scale-110 transition-transform"/>
                </a>
                
                <a href='https://www.instagram.com/mila_fawzi/' target="_blank" className="p-4 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-cyan-400 hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:-translate-y-1 transition-all duration-300 group">
                  <FiInstagram className="w-6 h-6 group-hover:scale-110 transition-transform"/>
                </a>

                <a href='https://www.linkedin.com/in/mila-fawzi-306655251' target="_blank" className="p-4 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-cyan-400 hover:border-cyan-400/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:-translate-y-1 transition-all duration-300 group">
                  <RiLinkedinLine className="w-6 h-6 group-hover:scale-110 transition-transform"/>
                </a>
              </div>

              
         
              <a href="mailto:your.Milaafawzi@gmail.com" className="group/btn inline-flex items-center gap-4 text-lg gmd:text-2xl font-bold text-slate-300 hover:text-white transition-colors duration-300">
                Contact Me
                <FiArrowRight className="w-4 h-4 md:w-6 md:h-6 text-cyan-400 transition-transform duration-300 group-hover/btn:translate-x-3"/>
              </a>

              


      </div>

      </div>
       
       


       </motion.section>



       
    </div >


    

      

    


       {/* social links  */}

<div className={`fixed right-12 top-[80%] -translate-y-1/2 flex-col gap-5 z-50 hidden lg:flex transition-opacity duration-500 ${isContactViewd ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
        <a href='https://github.com/Mila-Saif' target="_blank" className="group">
          <FiGithub className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 group-hover:scale-125 duration-300 transition-all"/>
        </a>
        
        <a href='https://www.instagram.com/mila_fawzi/' target="_blank" className="group">
          <FiInstagram className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 group-hover:scale-125 duration-300 transition-all"/>
        </a>

        <a href='https://www.linkedin.com/in/mila-fawzi-306655251' target="_blank" className="group">
          <RiLinkedinLine className="w-6 h-6 text-slate-400 group-hover:text-cyan-400 group-hover:scale-125 duration-300 transition-all"/>
        </a>
      </div>

    


       
    </main>
  );
}
