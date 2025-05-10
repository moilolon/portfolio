import Navbar from '@/components/layouts/Navbar';
import Information from '@/components/sections/Information';
import Technologies from '@/components/sections/Technologies';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import Training from '@/components/sections/Training';
import AboutMe from '@/components/sections/AboutMe';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Information />
      <Technologies />
      <Experience />
      <Projects />
      <Training />
      <AboutMe />

      <footer className="py-8 text-center text-foreground/60 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} <a href="https://github.com/moilolon">moilolon</a>. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
