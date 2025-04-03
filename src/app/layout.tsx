import '@/styles/globals.scss';
import NavBar from '@/components/NavBar';

export const metadata = {
  title: 'Laxveiðiár íslands',
  description: 'Vefforritun 2 – Verkefni 5',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="is">
      <body>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
