import Image from "next/image";

interface BrandMarkProps {
  className?: string;
  textClassName?: string;
  tagline?: string;
}

export function BrandMark({ className = "" }: BrandMarkProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <Image
        src="/CalLordUTLogo.png"
        alt="CalLord Unified Technologies"
        width={160}
        height={40}
        className="h-8 w-auto lg:h-10"
        priority
      />
    </div>
  );
}
