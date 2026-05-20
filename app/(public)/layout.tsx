import { Navbar } from '@/components/layout/Navbar'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {/* pt compensa el navbar fijo; pb-16 compensa el bottom nav en mobile */}
      <main className="min-h-screen pt-[5.5rem] pb-16 lg:pb-0">
        {children}
      </main>
    </>
  )
}
