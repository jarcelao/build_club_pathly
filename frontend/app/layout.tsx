import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Career Roadmap Generator',
  description: 'Generate personalized learning roadmaps using AI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
