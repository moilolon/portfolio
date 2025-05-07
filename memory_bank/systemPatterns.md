# System Patterns

## System Architecture

The portfolio will follow a modern web application architecture using the following technologies:
- **Frontend**: Next.js 14+ with App Router for server-side rendering and routing.
- **Styling**: Tailwind CSS for utility-first, responsive design.
- **Backend**: Supabase for database and authentication services.
- **Deployment**: Vercel for hosting and continuous deployment.

## Key Technical Decisions

1. **Next.js**: Chosen for its performance, SEO benefits, and developer experience.
2. **Tailwind CSS**: Enables rapid UI development with a consistent design system.
3. **Supabase**: Provides a scalable backend solution with minimal setup.
4. **Vercel**: Ensures fast and reliable deployment with built-in optimizations.

## Design Patterns

1. **Component-Based Architecture**: Reusable React components for modularity and maintainability.
2. **Atomic Design**: Breaking down UI into atoms, molecules, organisms, templates, and pages.
3. **Responsive Design**: Ensuring the portfolio is accessible on all devices.

## Component Relationships

1. **Header**: Contains the top menu linking to key sections.
2. **Sections**:
   - **Information**: Includes contact information, CV, and social network buttons.
   - **Technologies**: Displays a grid of technologies with icons.
   - **Experience**: Lists job details with aligned dates.
   - **Projects**: Showcases project details with links and technologies.
   - **Training**: Highlights educational qualifications with aligned dates.
   - **About Me**: Provides a personal introduction.
