import content from '@/content/technologies.json';
import { localize, type Locale } from '@/lib/i18n';
import type { Technology, TechnologyCategory, TechnologyUsage } from '@/types/technologies';
import {
  NextIcon,
  TypeScriptIcon,
  TailwindIcon,
  JavaScriptIcon,
  JQueryIcon,
  Html5Icon,
  Css3Icon,
  JspIcon,
  BootstrapIcon,
  SassIcon,
  NodeIcon,
  JavaIcon,
  HibernateIcon,
  SpringIcon,
  SupabaseIcon,
  OracleIcon,
  PostgreSqlIcon,
  GraphQlIcon,
  GitIcon,
  GithubIcon,
  DockerIcon,
  VercelIcon,
  PostmanIcon,
  VsCodeIcon,
  AzureAiIcon,
  SalesforceIcon,
  IsmlIcon,
  PlSqlIcon,
  GithubActionsIcon,
  ClaudeCodeIcon,
  ZedIcon,
} from '@/components/icons/technologies';

// The technologies themselves (name, category, usage) are content: src/content/technologies.json.
// Here goes only how each one looks: its brand color and, for the Technologies section, its icon.
const styles: Record<string, Pick<Technology, 'icon' | 'color'>> = {
  'Next.js': { icon: <NextIcon />, color: 'var(--foreground)' },
  'TypeScript': { icon: <TypeScriptIcon />, color: '#3178C6' },
  'Tailwind CSS': { icon: <TailwindIcon />, color: '#1CD4B5' },
  'JavaScript': { icon: <JavaScriptIcon />, color: '#F7DF1E' },
  'jQuery': { icon: <JQueryIcon />, color: '#63B9E3' },
  'HTML5': { icon: <Html5Icon />, color: '#E44D26' },
  'CSS3': { icon: <Css3Icon />, color: '#1172B8' },
  'JSP': { icon: <JspIcon />, color: '#FDB940' },
  'Bootstrap': { icon: <BootstrapIcon />, color: '#563D7C' },
  'SASS': { icon: <SassIcon />, color: '#CC6699' },
  'ISML': { icon: <IsmlIcon />, color: '#00A1E0' },
  'Node.js': { icon: <NodeIcon />, color: '#8CC84B' },
  'Java': { icon: <JavaIcon />, color: '#E76F00' },
  'Hibernate': { icon: <HibernateIcon />, color: '#BCAE79' },
  'Spring': { icon: <SpringIcon />, color: '#70AD51' },
  'JPA': { color: '#E76F00' },
  'Web Services': { color: '#8CC84B' },
  'REST': { color: '#8CC84B' },
  'Supabase': { icon: <SupabaseIcon />, color: '#3ECF8E' },
  'Oracle': { icon: <OracleIcon />, color: '#EA1B22' },
  'PostgreSQL': { icon: <PostgreSqlIcon />, color: '#336791' },
  'SQL': { color: '#EA1B22' },
  'PL/SQL': { icon: <PlSqlIcon />, color: '#EA1B22' },
  'GraphQL': { icon: <GraphQlIcon />, color: '#E10098' },
  'Git': { icon: <GitIcon />, color: '#EE513B' },
  'GitHub': { icon: <GithubIcon />, color: 'var(--foreground)' },
  'Docker': { icon: <DockerIcon />, color: '#1794D4' },
  'Maven': { color: '#C71A36' },
  'GitHub Actions': { icon: <GithubActionsIcon />, color: '#2088FF' },
  'Vercel': { icon: <VercelIcon />, color: 'var(--foreground)' },
  'Postman': { icon: <PostmanIcon />, color: '#FF6C37' },
  'VS Code': { icon: <VsCodeIcon />, color: '#32B5F1' },
  'Zed': { icon: <ZedIcon />, color: '#084CCF' },
  'Resend': { color: 'var(--foreground)' },
  'Google reCAPTCHA': { color: '#4A90E2' },
  'Azure AI Foundry': { icon: <AzureAiIcon />, color: '#1171ED' },
  'Salesforce Commerce Cloud': { icon: <SalesforceIcon />, color: '#00A1E0' },
  'Claude Code': { icon: <ClaudeCodeIcon />, color: '#D97757' },
};

// Every technology with its style, whatever its category
const all: Pick<Technology, 'name' | 'color'>[] = content.flatMap(({ items }) => items).map(({ name }) => {
  const style = styles[name];
  if (!style) {
    throw new Error(`Technology "${name}" has no style in src/lib/constants/technologies.tsx`);
  }
  return { name, color: style.color };
});

export function getTechnologies(locale: Locale): TechnologyCategory[] {
  return localize(content, locale).map(({ category, items }) => ({
    category,
    items: items.map((item) => ({
      ...item,
      usage: item.usage as TechnologyUsage | undefined,
      ...styles[item.name],
    })),
  }));
}

// Resolves the technology names of a job or a project to their name and chip color
export function findTechnologies(names: string[]): Pick<Technology, 'name' | 'color'>[] {
  return names.map((name) => {
    const found = all.find((technology) => technology.name === name);
    if (!found) {
      throw new Error(`Technology "${name}" not found in src/content/technologies.json`);
    }
    return found;
  });
}
