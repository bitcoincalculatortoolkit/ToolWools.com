import Link from 'next/link';

interface LogoProps {
  onDark?: boolean;
}

export function Logo({ onDark = false }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="ToolWools home"
      className="group flex items-center gap-2.5"
    >
      <span
        className="relative grid h-8 w-8 place-items-center rounded-[9px] bg-ink transition-transform duration-300 ease-lux group-hover:scale-[1.04]"
        aria-hidden
      >
        <span className="h-3 w-3 rounded-[3px] bg-gold transition-transform duration-500 ease-spring group-hover:rotate-45" />
      </span>
      <span
        className={`text-[17px] font-semibold tracking-tight ${
          onDark ? 'text-white' : 'text-ink'
        }`}
      >
        Tool<span className="text-gold">Wools</span>
      </span>
    </Link>
  );
}
