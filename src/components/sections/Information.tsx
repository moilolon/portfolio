import Image from 'next/image';
import Link from 'next/link';
import { personalInfo } from '@/lib/constants/information';

export default function Information() {
  return (
    <section id="information" className="min-h-screen flex items-center justify-center py-20 pt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          {/* Avatar */}
          <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-foreground/10">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 animate-gradient-xy">
              <div className="flex items-center justify-center h-full text-white text-6xl font-bold">
                <Image
                  src={personalInfo.avatar}
                  alt="Avatar"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Information */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
              {personalInfo.name}
            </h1>
            <h2 className="text-xl md:text-2xl text-foreground/80 mb-4">
              {personalInfo.title} | {personalInfo.location}
            </h2>

            {/* Social Links */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-6">
              {personalInfo.socials.map((social) => (
                <Link
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${social.color}`}
                >
                  <div className="h-5 w-5">
                    {social.icon}
                  </div>
                  <span>{social.name}</span>
                </Link>
              ))}
            </div>

            {/* Brief Introduction */}
            <p className="text-lg max-w-2xl">
              {personalInfo.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
