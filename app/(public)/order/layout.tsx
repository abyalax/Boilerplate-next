import { ReactNode } from 'react';

import { Footer } from '~/components/ui/footer';
import { Navbar } from '~/components/ui/navbar';

export default function Layout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar navigation={[]} />
      <main className="flex-1 p-4">
        <section className="min-h-[80vh]">{children}</section>
        <Footer />
      </main>
    </div>
  );
}
