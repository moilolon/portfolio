export default function Training() {
  // Define training data
  const trainings = [
    {
      institution: 'University of Technology',
      qualification: 'Master of Computer Science',
      year: '2017',
      description: 'Specialized in Software Engineering and Web Technologies. Graduated with honors.',
    },
    {
      institution: 'Tech Academy',
      qualification: 'Full Stack Web Development Bootcamp',
      year: '2016',
      description: 'Intensive 12-week program covering modern web development technologies and practices.',
    },
    {
      institution: 'City College',
      qualification: 'Bachelor of Science in Computer Science',
      year: '2015',
      description: 'Focused on programming fundamentals, algorithms, and data structures.',
    },
    {
      institution: 'Online Learning Platform',
      qualification: 'Advanced React and Redux Certification',
      year: '2018',
      description: 'Comprehensive course on building complex applications with React and Redux.',
    },
  ];

  return (
    <section id="training" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Training & Education</h2>

        <div className="space-y-8">
          {trainings.map((training, index) => (
            <div
              key={index}
              className="bg-background rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
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
