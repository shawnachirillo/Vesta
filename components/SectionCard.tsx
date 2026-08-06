import { ReactNode } from 'react';

type SectionCardProps = {
  title: string;
  children: ReactNode;
  className?: string;
  frosted?: boolean;
};

export default function SectionCard({
  title,
  children,
  className = '',
  frosted = false,
}: SectionCardProps) {
  return (
    <section
      className={
        frosted
          ? `frosted-section ${className}`
          : `interface-section ${className}`
      }
    >
      <h2 className="font-display mb-5 text-3xl leading-none text-white md:text-4xl">
        {title}
      </h2>

      {children}
    </section>
  );
}