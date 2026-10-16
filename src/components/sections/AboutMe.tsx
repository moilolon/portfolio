export default function AboutMe() {
  return (
    <section id="about" className="py-20 bg-foreground/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">About Me</h2>

        <div>
          <div className="bg-card dark:border dark:border-border rounded-lg p-8 shadow-sm">
            <p className="mb-4 text-lg">
              I{'\''}m a software engineer from A Coruña, Spain, with more than ten years of experience building web applications.
              I started in 2014 as a Java developer, right after finishing my Computer Science Engineering degree at the University of A Coruña, and spent my first years working with the J2EE platform on projects for companies such as Inditex, Jazztel and the public administration.
            </p>

            <p className="mb-4 text-lg">
              Since 2019 I{'\''}ve specialised in Salesforce Commerce Cloud, where I{'\''}m responsible for the analysis and development of the Guess and Rag & Bone online stores for Europe and North America, working across the whole platform, from backend services and third-party integrations to the storefront.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4">How I Work</h3>

            <p className="mb-4 text-lg">
              I enjoy understanding a problem before writing a single line of code, which is why I like working side by side with the business team to turn their needs into functional and technical designs.
              Backend development is still my favourite part of the job: it{'\''}s where you see how real-world problems actually get solved.
            </p>

            <p className="mb-4 text-lg">
              I also care about how the team works, not just about what it ships.
              I mentor junior developers, review code, and keep pushing improvements to our workflow, such as continuous integration, unit testing and AI-assisted development.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4">Beyond Code</h3>

            <p className="mb-4 text-lg">
              When I{'\''}m not coding, you{'\''}ll probably find me on a beach in Galicia with my wife or friends, doing sport (I{'\''}ve run a couple of marathons and enjoy swimming, CrossFit and yoga), or travelling to discover new places and their food, from fine dining to street food.
              And I never say no to a few beers with friends.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4">Let{'\''}s Connect</h3>

            <p className="text-lg">
              I{'\''}m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              Feel free to reach out through any of the contact methods in the information section above.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
