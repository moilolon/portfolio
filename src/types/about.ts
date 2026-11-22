export type AboutSection = {
  title: string;
  paragraphs: string[];
};

export type About = {
  // Opening paragraphs, shown before the titled sections
  intro: string[];
  sections: AboutSection[];
};
