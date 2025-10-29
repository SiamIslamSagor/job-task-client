"use client";

import Image from "next/image";
import ImageCard from "@/components/ImageCard";
import { useEffect, useState } from "react";
import { IImage } from "./types";

export default function Home() {
  const [images, setImages] = useState<IImage[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch("http://localhost:3000/api/analysis/images");
      const data = await response.json();
      setImages(data.data);
    };
    fetchImages();
  }, []);

  console.log(images);
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col gap-4">
          {images.map((image) => (
            <ImageCard key={image.id} image={image} />
          ))}
        </div>
      </main>
    </div>
  );
}
