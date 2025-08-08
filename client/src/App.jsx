import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <main className="scroll-smooth scroll-pt-20">
      <section id="home" className="min-h-screen"><Home /></section>
      <nav id="navbar" className="sticky top-0 z-50"><Navbar /></nav>
      <section id="about" className="min-h-screen pt-20"><About /></section>
      <section id="projects" className="min-h-screen pt-20"><Projects /></section>
      <section id="contact" className="min-h-screen"><Contact /></section>
      <footer><Footer /></footer>
    </main>
  );
}

export default App;
