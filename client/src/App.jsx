import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <section id="home" className="min-h-screen">
        <Home />
      </section>
      <Navbar />
      <main className="scroll-smooth overflow-x-hidden">
        <section id="about" className="min-h-screen pt-20 scroll-mt-24">
          <About />
        </section>
        <section id="projects" className="min-h-screen pt-20 scroll-mt-24">
          <Projects />
        </section>
        <section id="contact" className="min-h-[80vh] scroll-mt-24">
          <Contact />
        </section>
        <footer><Footer /></footer>
      </main>
    </>
  );
}
