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
      {/* Logo mark: midnight square with ember-orange inner square */}
      <span
        className="relative grid h-8 w-8 place-items-center rounded-[9px] bg-midnight transition-transform duration-300 ease-spring group-hover:scale-[1.04]"
        aria-hidden
      >
        <span className="h-3 w-3 rounded-[3px] bg-ember transition-transform duration-500 ease-spring group-hover:rotate-45" />
      </span>
      <span
        className={`text-[15px] font-medium tracking-[-0.2px] ${
          onDark ? 'text-white' : 'text-charcoal'
        }`}
      >
        Tool<span className="text-ember">Wools</span>
      </span>
    </Link>
  );
}
