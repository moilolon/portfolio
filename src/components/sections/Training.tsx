export default function Training() {
  // Define training data
  const trainings = [
    {
      institution: 'Trailhead Academy',
      qualification: 'B2C Commerce Developer with SFRA',
      year: '2020',
      description: 'Intensive week program covering the fundamentals of Salesforce B2C Commerce and the SFRA framework.',
    },
    {
      institution: 'Online Learning Platform',
      qualification: 'J2EE Platform',
      year: '2016',
      description: 'Comprehensive courses on building complex applications with Java EE, J2EE Patterns, Spring MVC Web Applications, Spring Boot, Spring Batch, Hibernate, Oracle11g PL/SQL, Microservices, REST, JavaScript and HTML5&CSS3.',
    },
    {
      institution: 'University of A Coruña',
      qualification: 'Engineering in Computer Science',
      year: '2014',
      description: 'Project: Design and implementation of a Java EE Web application with MVC architecture, for PDF generation of electronic tickets.',
    },
    {
      institution: 'University of A Coruña',
      qualification: 'Technical Engineering in Computer Systems',
      year: '2012',
      description: 'Project: Design and implementation of a .NET Web application with MVC architecture for the exchange of experiences and resources of the In-TIC project.',
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
