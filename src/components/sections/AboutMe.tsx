import { getAbout } from '@/lib/constants/about';
import { DEFAULT_LOCALE } from '@/lib/i18n';

export default function AboutMe() {
  const about = getAbout(DEFAULT_LOCALE);

  return (
    <section id="about" className="py-20 bg-foreground/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">About Me</h2>

        <div>
          <div className="bg-card dark:border dark:border-border rounded-lg p-8 shadow-sm">
            {about.intro.map((paragraph) => (
              <p key={paragraph} className="mb-4 text-lg">
                {paragraph}
              </p>
            ))}

            {about.sections.map((section, index) => (
              <div key={section.title}>
                <h3 className="text-xl font-semibold mt-8 mb-4">{section.title}</h3>

                {section.paragraphs.map((paragraph, position) => (
                  <p
                    key={paragraph}
                    // The very last paragraph of the card has no bottom margin
                    className={`text-lg ${index === about.sections.length - 1 && position === section.paragraphs.length - 1 ? '' : 'mb-4'}`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
