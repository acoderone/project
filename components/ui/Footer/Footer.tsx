import Link from 'next/link';
import Logo from '@/components/icons/Logo';

const navItems = [
  { label: 'Pricing', href: '/#pricing' },
  { label: 'Features', href: '/#feature' },
  { label: 'Contact', href: '/#contact' },
];

const socialItems = [
  { label: 'Facebook', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Twitter', href: '#' },
];

const contactItems = [
  { label: 'Official Blog', href: '/blog' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/#contact' },
];

export default function Footer() {
  return (
    <footer className="bg-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="container mx-auto px-8">
        <div className="w-full flex flex-col md:flex-row py-6">
          <div className="flex-1 mb-6 text-black">
            <Link href="/" className="text-pink-600 no-underline hover:no-underline font-bold text-2xl lg:text-4xl">
              <Logo className="h-8 fill-current inline" />
              RateUpdate
            </Link>
          </div>
          <FooterSection title="Navigation" items={navItems} />
          <FooterSection title="Social" items={socialItems} />
          <FooterSection title="Contact us" items={contactItems} />
        </div>
      </div>
      <div className="text-center py-4">
        <Link
          href="https://www.freepik.com/free-photos-vectors/background"
          className="text-gray-500 text-sm"
        >
          Background vector created by freepik - www.freepik.com
        </Link>
      </div>
    </footer>
  );
}

function FooterSection({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div className="flex-1">
      <p className="uppercase text-gray-500 md:mb-6">{title}</p>
      <ul className="list-none mb-6">
        {items.map((item) => (
          <li key={item.label} className="mt-2 inline-block mr-2 md:block md:mr-0">
            <Link href={item.href} className="no-underline hover:underline text-gray-800 hover:text-pink-500">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
