import './globals.scss';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Supreme Octo Chainsaw',
  description: 'Tabletop game online website!!!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
