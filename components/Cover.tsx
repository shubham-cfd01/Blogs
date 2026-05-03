import Image from 'next/image';

export default function Cover({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-900">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 768px) 768px, 100vw"
        className="object-cover"
        priority={priority}
      />
    </div>
  );
}
