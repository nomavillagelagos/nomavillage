import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { InquireNowForm } from "@/archive/deleted-join-sections"

export default function ArchivePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-64 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/application-form-hero-image.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="font-caveat text-5xl md:text-6xl font-bold mb-4">Archive</h1>
          <p className="font-nunito text-lg md:text-xl text-balance">
            Previous versions of forms and sections from Noma Village
          </p>
        </div>
      </section>

      {/* Archived Inquire Now Form */}
      <InquireNowForm />

      <Footer />
    </div>
  )
}
