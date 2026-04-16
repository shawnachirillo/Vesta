import type { Metadata } from 'next';
import './globals.css';
import NavShell from '@/components/NavShell';

export const metadata: Metadata = {
  title: 'Vesta',
  description: 'House operating system dashboard'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <NavShell>{children}</NavShell>
      </body>
    </html>
  );
}
