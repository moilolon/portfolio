import { getLanguages, getTraining } from '@/lib/constants/training';
import { DEFAULT_LOCALE } from '@/lib/i18n';

const cardClass = 'bg-card dark:border dark:border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow';
const groupTitleClass = 'text-lg font-semibold mb-4 text-foreground/70';
const periodClass = 'inline-block px-4 py-2 bg-foreground/10 rounded-full text-sm font-medium whitespace-nowrap';

export default function Training() {
  const { education, courses } = getTraining(DEFAULT_LOCALE);
  const languages = getLanguages(DEFAULT_LOCALE);

  return (
    <section id="training" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Training & Education</h2>

        <div className="space-y-12">
          <div>
            <h3 className={groupTitleClass}>Education</h3>
            <div className="space-y-8">
              {education.map((item) => (
                <div key={item.qualification} className={cardClass}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-xl font-semibold">{item.qualification}</h4>
                      <p className="text-lg text-foreground/80">{item.institution}</p>
                      <p className="mt-2 text-foreground/70">{item.description}</p>
                    </div>
                    <div className="md:text-right">
                      <span className={periodClass}>{item.period}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className={groupTitleClass}>Courses</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {courses.map((group) => (
                <div key={`${group.organisation}-${group.period}`} className={cardClass}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-xl font-semibold">{group.organisation}</h4>
                      <p className="text-foreground/80">{group.title}</p>
                    </div>
                    <span className={periodClass}>{group.period}</span>
                  </div>
                  <ul className="mt-4 pl-5 list-disc space-y-1 text-foreground/70 marker:text-foreground/40">
                    {group.items.map((course) => (
                      <li key={course}>{course}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className={groupTitleClass}>Languages</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {languages.map((language) => (
                <div key={language.name} className={cardClass}>
                  <h4 className="text-xl font-semibold">{language.name}</h4>
                  <p className="mt-1 text-foreground/70">{language.level}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
