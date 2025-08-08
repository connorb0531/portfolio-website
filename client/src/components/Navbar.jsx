export default function Navbar() {
  return (
    <nav className="bg-navbar-grey text-white text-md font-bold p-5 flex justify-center space-x-6 shadow-xl">
      <a href="#home" className="hover:text-slate-500 transition">Home</a>
      <a href="#about" className="hover:text-slate-500 transition">About</a>
      <a href="#projects" className="hover:text-slate-500 transition">Projects</a>
      <a href="#contact" className="hover:text-slate-500 transition0">Contact</a>
    </nav>
  );
}
