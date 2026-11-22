import { trainings } from '@/lib/constants/training';

export default function Training() {
  return (
    <section id="training" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Training & Education</h2>

        <div className="space-y-8">
          {trainings.map((training) => (
            <div
              key={`${training.institution}-${training.qualification}`}
              className="bg-card dark:border dark:border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold">{training.qualification}</h3>
                  <p className="text-lg text-foreground/80">{training.institution}</p>
                  <p className="mt-2 text-foreground/70">{training.description}</p>
                </div>
                <div className="md:text-right">
                  <span className="inline-block px-4 py-2 bg-foreground/10 rounded-full text-sm font-medium">
                    {training.year}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
