import { readFileSync } from 'node:fs';
import path from 'node:path';
import type { ReactNode } from 'react';
import { Document, Font, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import type { Experience } from '@/types/experience';
import type { PersonalInfo } from '@/types/information';
import type { TechnologyCategory } from '@/types/technologies';
import type { Language, Training } from '@/types/training';

// The CV as a PDF, laid out after the "classic" style of moderncv (LaTeX) it replaces:
// a narrow column of dates on the left, the content on the right, blue section rules.
// Server only: it reads the fonts and the photo from disk.

const fontFile = (name: string) => path.join(process.cwd(), 'src/assets/fonts', name);

// Latin Modern Sans, the typeface of the LaTeX CV
Font.register({
  family: 'Latin Modern Sans',
  fonts: [
    { src: fontFile('lmsans10-regular.otf') },
    { src: fontFile('lmsans10-oblique.otf'), fontStyle: 'italic' },
    { src: fontFile('lmsans10-bold.otf'), fontWeight: 'bold' },
    { src: fontFile('lmsans10-boldoblique.otf'), fontWeight: 'bold', fontStyle: 'italic' },
  ],
});

// No automatic hyphenation: its rules are English and the CV is also written in Spanish
Font.registerHyphenationCallback((word) => [word]);

const BLUE = '#3873B3';
const GREY = '#737373';

// A4 with the text block of moderncv (geometry scale=0.75) and its two columns
const TEXT_WIDTH = 446.5;
const HINT_WIDTH = 63;
const GAP_WIDTH = 9;

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Latin Modern Sans',
    fontSize: 11,
    lineHeight: 1.2,
    color: '#000000',
    paddingTop: 84,
    paddingBottom: 84,
    paddingHorizontal: (595.28 - TEXT_WIDTH) / 2,
  },

  header: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: 46 },
  headerName: { flexGrow: 1 },
  name: { fontSize: 24.88, lineHeight: 1 },
  title: { fontSize: 14.4, fontStyle: 'italic', color: GREY, marginTop: 12 },
  contact: { marginRight: 10, alignItems: 'flex-end' },
  contactLine: { fontSize: 10, fontStyle: 'italic', color: GREY, textAlign: 'right' },
  photoFrame: { borderWidth: 0.5, borderColor: BLUE, padding: 2 },
  photo: { width: 80, height: 80 },

  section: { flexDirection: 'row', alignItems: 'flex-end', marginTop: 12, marginBottom: 5 },
  sectionRule: { width: HINT_WIDTH, height: 4.5, backgroundColor: BLUE, marginRight: GAP_WIDTH, marginBottom: 0.5 },
  sectionTitle: { fontSize: 14.4, color: BLUE },

  row: { flexDirection: 'row', marginBottom: 3 },
  hint: { width: HINT_WIDTH, marginRight: GAP_WIDTH, textAlign: 'right' },
  main: { flex: 1 },
  justified: { textAlign: 'justify' },
  bold: { fontWeight: 'bold' },
  italic: { fontStyle: 'italic' },
  small: { fontSize: 10 },

  bulletRow: { flexDirection: 'row', marginTop: 1.5 },
  circle: { width: 4, height: 4, borderRadius: 2, borderWidth: 0.6, borderColor: BLUE, marginTop: 5.5, marginRight: 6 },
  dash: { width: 10, color: BLUE, fontWeight: 'bold' },
  nested: { marginLeft: 10 },
});

export interface CvLabels {
  title: string;
  profile: string;
  experience: string;
  education: string;
  skills: string;
  courses: string;
  languages: string;
  technologies: string;
}

export interface CvProps {
  locale: string;
  labels: CvLabels;
  personalInfo: Pick<PersonalInfo, 'name' | 'location' | 'description' | 'email' | 'avatar'>;
  phone: string;
  birthDate: string;
  experiences: Experience[];
  training: Training;
  technologies: TechnologyCategory[];
  languages: Language[];
}

function Section({ title }: { title: string }) {
  return (
    // Never leave a section title alone at the bottom of a page
    <View style={styles.section} minPresenceAhead={60} wrap={false}>
      <View style={styles.sectionRule} />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
}

// One line of the CV: a hint (dates, a language) on the left and the content on the right.
// Each one stays whole on a page, so a heading never parts from its dates.
function Row({ hint, children }: { hint?: string; children: ReactNode }) {
  return (
    <View style={styles.row} wrap={false}>
      {/* A period such as "Dec 2019 - Present" takes two lines of the narrow column: break it at the dash */}
      <Text style={styles.hint}>{hint?.replace(' - ', ' –\n')}</Text>
      <View style={styles.main}>{children}</View>
    </View>
  );
}

// "Title, Organisation, Place." as moderncv writes the heading of an entry
function EntryTitle({ title, organisation, location }: { title: string; organisation: string; location?: string }) {
  return (
    <Text>
      <Text style={styles.bold}>{title}</Text>
      {', '}
      <Text style={styles.italic}>{organisation}</Text>
      {location ? `, ${location}.` : '.'}
    </Text>
  );
}

function Bullet({ children }: { children: ReactNode }) {
  return (
    <View style={styles.bulletRow}>
      <View style={styles.circle} />
      <View style={styles.main}>{children}</View>
    </View>
  );
}

function Dash({ children }: { children: ReactNode }) {
  return (
    <View style={[styles.bulletRow, styles.nested]}>
      <Text style={styles.dash}>-</Text>
      <Text style={[styles.main, styles.justified]}>{children}</Text>
    </View>
  );
}

export default function CvDocument({
  locale,
  labels,
  personalInfo,
  phone,
  birthDate,
  experiences,
  training,
  technologies,
  languages,
}: CvProps) {
  const born = new Intl.DateTimeFormat(locale, { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(birthDate));

  return (
    <Document
      title={`${personalInfo.name} - ${labels.title}`}
      author={personalInfo.name}
      language={locale}
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerName}>
            <Text style={styles.name}>{personalInfo.name}</Text>
            <Text style={styles.title}>{labels.title}</Text>
          </View>
          <View style={styles.contact}>
            {[personalInfo.location, phone, personalInfo.email, born].map((line) => (
              <Text key={line} style={styles.contactLine}>{line}</Text>
            ))}
          </View>
          <View style={styles.photoFrame}>
            {/* eslint-disable-next-line jsx-a11y/alt-text -- an image of a PDF, not an <img> */}
            <Image src={{ data: readFileSync(path.join(process.cwd(), 'public', personalInfo.avatar)), format: 'jpg' }} style={styles.photo} />
          </View>
        </View>

        <Section title={labels.profile} />
        <Row>
          <Text style={styles.justified}>{personalInfo.description}</Text>
        </Row>

        <Section title={labels.experience} />
        {experiences.map((job) => (
          <Row key={`${job.company}-${job.period}`} hint={job.period}>
            <EntryTitle title={job.title} organisation={job.company} location={job.location} />
            <View style={styles.small}>
              <Bullet>
                <Text style={styles.justified}>{job.description}</Text>
              </Bullet>
              {job.highlights.map((highlight) => (
                <Dash key={highlight}>{highlight}</Dash>
              ))}
              <Dash>
                {labels.technologies}: {job.technologies.map((technology) => technology.name).join(', ')}.
              </Dash>
            </View>
          </Row>
        ))}

        <Section title={labels.education} />
        {training.education.map((item) => (
          <Row key={item.qualification} hint={item.period}>
            <EntryTitle title={item.qualification} organisation={item.institution} />
            <Text style={[styles.small, styles.justified]}>{item.description}</Text>
          </Row>
        ))}

        <Section title={labels.skills} />
        {technologies.map(({ category, items }) => (
          <Row key={category}>
            <Bullet>
              <Text>
                <Text style={styles.bold}>{category}</Text>
                : {items.map((item) => item.name).join(', ')}
              </Text>
            </Bullet>
          </Row>
        ))}

        <Section title={labels.courses} />
        {training.courses.map((group) => (
          <Row key={`${group.organisation}-${group.period}`} hint={group.period}>
            <EntryTitle title={group.title} organisation={group.organisation} location={group.location} />
            <View style={styles.small}>
              {group.items.map((course) => (
                <Bullet key={course}>
                  <Text style={styles.italic}>{course}</Text>
                </Bullet>
              ))}
            </View>
          </Row>
        ))}

        <Section title={labels.languages} />
        {languages.map((language) => (
          <Row key={language.name} hint={language.name}>
            <Text style={styles.bold}>{language.level}</Text>
          </Row>
        ))}
      </Page>
    </Document>
  );
}
