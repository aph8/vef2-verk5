'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import '@/styles/NavBar.scss';

export default function NavBar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Forsíða' },
    { href: '/rivers', label: 'Veiðiár' },
  ];

  return (
    <nav className="navbar">
      <ul>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href} className={isActive ? 'active' : ''}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
