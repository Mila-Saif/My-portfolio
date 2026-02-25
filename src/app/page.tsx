
import Navbar from "@/components/Navbar";
export default function Home() {
  return (
    <main className=" min-h-screen bg-linear-to-br from-blue-950 via-indigo-950 to-slate-950 text-white p-8 ">
      <div className="max-w-7xl mx-auto mt-1"  >
        {/* the logo  */}
        <div>
          <Navbar/>
        </div>
        

      </div>
    </main>
  );
}
