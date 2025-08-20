import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600'],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: 'Srujan Racherla - Cinematic Video Editor',
  description: 'Award-winning video editor specializing in cinematic storytelling with 4 years of experience in Tokyo',
  keywords: 'video editor, cinematic, storytelling, Tokyo, Japan, film editing, motion graphics',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}