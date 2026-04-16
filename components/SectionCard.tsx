import { ReactNode } from 'react';

type SectionCardProps = {
  title: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
};

export default function SectionCard({ title, eyebrow, children, className = '' }: SectionCardProps) {
  return (
    <section className={`card rounded-[28px] p-5 md:p-6 ${className}`}>
      {(eyebrow || title) && (
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            {eyebrow ? (
              <p className="panel-title text-[11px] uppercase text-sky-200/65">{eyebrow}</p>
            ) : null}
            <h2 className="mt-1 text-xl font-semibold text-slate-50">{title}</h2>
          </div>
        </div>
      )}
      {children}
    </section>
  );
}
