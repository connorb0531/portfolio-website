export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-navbar-grey/90 backdrop-blur text-white font-bold p-5 flex justify-center gap-6 shadow-2xl">
      <a href="#home" className="hover:text-slate-400 transition">Home</a>
      <a href="#about" className="hover:text-slate-400 transition">About</a>
      <a href="#projects" className="hover:text-slate-400 transition">Projects</a>
      <a href="#contact" className="hover:text-slate-400 transition">Contact</a>
    </nav>
  );
}
