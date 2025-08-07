export default function Navbar() {
  return (
    <nav className="bg-navbar-grey text-white p-5 flex justify-center space-x-6 shadow-xl">
      <a href="#home" className="hover:underline">Home</a>
      <a href="#about" className="hover:underline">About</a>
      <a href="#projects" className="hover:underline">Projects</a>
      <a href="#contact" className="hover:underline">Contact</a>
    </nav>
  );
}
