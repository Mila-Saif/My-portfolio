
import Navbar from "@/components/Navbar";
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
            I am a Frontend Developer.
          </h1>

          <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
            I build modern web designs.
          </h2>

          <p className="text-slate-400 max-w-2xl text-lg font-light mb-12 leading-relaxed">
            I build scalable and beautiful design applications. 
            Turning ideas into digital realities using Next.js and React.
          </p>

        </section>

        
        

      </div>
    </main>
  );
}
