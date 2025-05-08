# Tech Context

## Technologies Used

- **Frontend**: Next.js 14+ with App Router for server-side rendering and routing.
- **Language**: TypeScript for type safety and better developer experience.
- **Styling**: Tailwind CSS for utility-first, responsive design.
- **Fonts**: Geist Sans and Geist Mono for modern typography.
- **Animation**: Custom CSS animations for enhanced user experience.
- **Version Control**: GitHub for source code management.

## Development

### Setup

- **Node.js**: Latest LTS version for compatibility with Next.js.
- **Code Quality**: ESLint and Prettier configured for code quality and formatting.
- **Package Manager**: npm for dependency management.
- **IDE**: Visual Studio Code with extensions for React, TypeScript, and Tailwind CSS.
- **Local Development**: Run the development server using `npm run dev`.

### Project Structure

```text
portfolio/
├── .github/
│   └── workflows/                # CI/CD workflows
├── memory_bank/                  # Cline Memory Bank
│   ├── activeContext.md          # Current work focus
│   ├── productContext.md         # Product context
│   ├── progress.md               # Project progress
│   ├── projectBrief.md           # Project brief
│   ├── systemPatterns.md         # System architecture
│   └── techContext.md            # Technical context
├── public/                       # Static assets
│   ├── next.svg                  # Next.js logo
│   └── vercel.svg                # Vercel logo
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── api/                  # API routes
│   │   ├── dashboard/            # Dashboard pages
│   │   ├── favicon.ico           # Favicon
│   │   ├── globals.css           # Global styles
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # Home page
│   ├── components/               # React components
│   │   ├── ui/                   # UI components
│   │   ├── forms/                # Form components
│   │   ├── layouts/              # Layout components
│   │   │   └── Navbar.tsx        # Navigation bar
│   │   └── sections/             # Section components
│   │   │   ├── AboutMe.tsx       # About Me section
│   │   │   ├── Experience.tsx    # Experience section
│   │   │   ├── Information.tsx   # Information section
│   │   │   ├── Projects.tsx      # Projects section
│   │   │   ├── Technologies.tsx  # Technologies section
│   │   │   └── Training.tsx      # Training section
│   ├── lib/                      # Utility functions
│   │   ├── supabase/             # Supabase client
│   │   ├── utils/                # Helper functions
│   │   └── constants/            # Constants
│   └── types/                    # TypeScript types
├── supabase/
│   ├── migrations/               # SQL migration files
│   └── seed/                     # Seed data files
├── .clinerules                   # Cline rules
├── .env.local                    # Local environment variables
├── .env.example                  # Example environment variables
├── .eslintrc.json                # ESLint configuration
├── .gitignore                    # Git ignore rules
├── cline-guide.md                # Cline Project Guide
├── eslint.config.mjs             # ESLint configuration
├── next.config.ts                # Next.js configuration
├── package-lock.json             # Package lock file
├── package.json                  # Project dependencies
├── postcss.config.mjs            # PostCSS configuration
├── README.md                     # Project documentation
├── tailwind.config.js            # Tailwind configuration
└── tsconfig.json                 # TypeScript configuration
```

### Component Architecture

- **Layout Components**: Reusable layout structures like Navbar
- **Section Components**: Main content sections of the portfolio
- **Page Components**: App Router pages that compose sections

### Styling Approach

- Tailwind CSS for utility-first styling
- CSS variables for theming and dark mode
- Custom animations for enhanced user experience
- Responsive design for all screen sizes

### Database Migrations

SQL files in /supabase/migrations should:

- Use sequential numbering: 001, 002, etc.
- Include descriptive names
- Be reviewed by Cline before execution

Example: 001_create_users_table.sql

### Security

DO NOT read or modify:

- .env files
- **/config/secrets.*
- Any file containing API keys or credentials

## Technical Constraints

1. **Browser Compatibility**: Ensures the portfolio works on modern browsers (Chrome, Firefox, Safari, Edge).
2. **Performance**: Optimized for fast loading times and smooth interactions.
3. **Accessibility**: Follows WCAG guidelines for accessibility.
4. **Responsive Design**: Works on all screen sizes from mobile to desktop.

## Dependencies

1. **Next.js**: Core framework for building the portfolio.
2. **TypeScript**: For type safety and better developer experience.
3. **Tailwind CSS**: Styling library for responsive design.
4. **Geist Font**: Typography from Vercel for modern look and feel.
