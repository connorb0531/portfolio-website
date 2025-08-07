import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="scroll-smooth">
      <section id="home" className="min-h-screen"><Home /></section>
      <div className="sticky top-0 z-50"><Navbar /></div>
      <section id="about" className="min-h-screen"><About /></section>
      <section id="projects" className="min-h-screen"><Projects /></section>
      <section id="contact" className="min-h-screen"><Contact /></section>
    </div>
  );
}

export default App;
