import Link from 'next/link';

export default function Headrer() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-gray-200 bg-white/50 backdrop-blur">
      <div className="mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="m-0 ml-3 text-lg font-semibold">
          Project Thelxie
        </Link>
      </div>
    </header>
  );
}
