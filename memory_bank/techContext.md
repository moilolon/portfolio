# Technical Context

## Technologies Used

1. **Frontend**: Next.js 14+ with App Router for server-side rendering and routing.
2. **Styling**: Tailwind CSS for utility-first, responsive design.
3. **Backend**: Supabase for database and authentication services.
4. **Deployment**: Vercel for hosting and continuous deployment.
5. **Version Control**: GitHub for source code management.

## Development

### Setup

1. **Node.js**: Ensure the latest LTS version is installed for compatibility with Next.js.
2. **Package Manager**: Use npm or yarn for dependency management.
3. **IDE**: Visual Studio Code with recommended extensions for React, Tailwind CSS, and Supabase.
4. **Local Development**: Run the development server using `npm run dev` or `yarn dev`.

### Workflow

1. Cline helps write and review code changes
2. Vercel automatically deploys from main branch
3. Database migrations reviewed by Cline before execution

### Project Structure

```text
/src
  /app         # Next.js App Router pages
  /components  # React components
  /lib         # Utility functions
  /types       # TypeScript types
/supabase
  /migrations  # SQL migration files
  /seed        # Seed data files
/public        # Static assets
```

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

1. **Browser Compatibility**: Ensure the portfolio works on modern browsers (Chrome, Firefox, Safari, Edge).
2. **Performance**: Optimize for fast loading times and smooth interactions.
3. **Accessibility**: Follow WCAG guidelines to make the portfolio accessible to all users.

## Dependencies

1. **Next.js**: Core framework for building the portfolio.
2. **Tailwind CSS**: Styling library for responsive design.
3. **Supabase**: Backend services for data storage and authentication.
4. **React Icons**: For consistent and visually appealing icons.
5. **Vercel CLI**: For deployment and management of the portfolio.
