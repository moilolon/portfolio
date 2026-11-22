export type Education = {
  institution: string;
  qualification: string;
  period: string;
  description: string;
};

// The courses taken at one place: a company (with the job held there) or a university (with the degree)
export type CourseGroup = {
  organisation: string;
  title: string;
  period: string;
  items: string[];
};

export type Training = {
  education: Education[];
  courses: CourseGroup[];
};

export type Language = {
  name: string;
  level: string;
};
