export default function AboutMe() {
  return (
    <section id="about" className="py-20 bg-foreground/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">About Me</h2>

        <div className="max-w-3xl mx-auto">
          <div className="bg-background rounded-lg p-8 shadow-sm">
            <p className="mb-4 text-lg">
              Hello! I'm a passionate full-stack developer with over 5 years of experience building web applications.
              I specialize in creating responsive, user-friendly interfaces with modern JavaScript frameworks like React and Next.js.
            </p>

            <p className="mb-4 text-lg">
              My journey in web development began during my computer science studies, where I discovered my passion for creating
              digital experiences that are both functional and aesthetically pleasing. Since then, I've worked with various
              companies and clients to bring their ideas to life.
            </p>

            <p className="mb-4 text-lg">
              I'm particularly interested in performance optimization, accessibility, and creating intuitive user experiences.
              I believe that great software should be both powerful and easy to use.
            </p>

            <p className="mb-4 text-lg">
              When I'm not coding, you can find me exploring new technologies, contributing to open-source projects,
              or enjoying outdoor activities like hiking and photography.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4">My Approach</h3>

            <p className="mb-4 text-lg">
              I approach each project with a focus on understanding the core problems that need to be solved.
              By starting with a clear understanding of the goals and constraints, I can create solutions that
              are not only technically sound but also aligned with business objectives.
            </p>

            <p className="mb-4 text-lg">
              I value clean, maintainable code and follow best practices like test-driven development,
              continuous integration, and thorough documentation. This ensures that the solutions I build
              can evolve and scale as needs change.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4">Let's Connect</h3>

            <p className="text-lg">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              Feel free to reach out through any of the contact methods in the information section above.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
