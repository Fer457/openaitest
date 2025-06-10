'use client';
import ScrollScene from '@/components/ScrollScene';

export default function Home() {
  return (
    <main className="relative overflow-hidden font-[family-name:var(--font-geist-sans)]">
      <ScrollScene />
      <section className="h-screen flex items-center justify-center text-5xl font-bold">
        Welcome
      </section>
      <section className="h-screen flex items-center justify-center text-5xl font-bold">
        Features
      </section>
      <section className="h-screen flex items-center justify-center text-5xl font-bold">
        Contact
      </section>
    </main>
  );
}
