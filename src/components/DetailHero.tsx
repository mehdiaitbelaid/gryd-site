import Image from "next/image";
import { grydMarkPaper } from "@/lib/photos";
import type { Photo } from "@/lib/types";

export function DetailHero({
  photo,
  title,
  standing,
}: {
  photo: Photo;
  title: string;
  standing: string;
}) {
  return (
    <header className="g-hero">
      <Image
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        priority
        sizes="(max-width: 1200px) 100vw, 1144px"
      />
      <div className="plate">
        <Image className="mark" src={grydMarkPaper} alt="" width={186} height={187} />
        <h1>{title}</h1>
        <p className="stand">{standing}</p>
      </div>
    </header>
  );
}
