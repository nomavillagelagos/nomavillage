import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Star, Users, Wifi, MapPin, Quote, Home, Coffee, Waves } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/stunning-lagos-portugal-coastline-with-golden-clif.png')",
          }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="font-caveat text-6xl md:text-8xl font-bold mb-6 text-balance">Welcome to Noma Village</h1>
          <p className="font-nunito text-xl md:text-2xl mb-8 text-balance max-w-3xl mx-auto leading-relaxed">
            Discover Portugal's premier coliving and coworking destination in Lagos. Experience authentic Portuguese
            coastal living while building meaningful connections with digital nomads, remote workers, and entrepreneurs
            from around the world. Our thoughtfully designed spaces blend modern comfort with traditional Portuguese
            charm, creating the perfect environment for work, life, and personal growth.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-lagos-pink hover:bg-lagos-pink/90 text-white font-montserrat text-lg px-8 py-3"
            >
              <Link href="/join">Join Our Community</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-gray-900 font-montserrat text-lg px-8 py-3 bg-transparent"
            >
              <Link href="#learn-more">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-lagos-aquamarine/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-lagos-blue-green font-montserrat">50+</div>
              <div className="font-nunito text-gray-600">Community Members</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-lagos-blue-green font-montserrat">24/7</div>
              <div className="font-nunito text-gray-600">Coworking Access</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-lagos-blue-green font-montserrat">15+</div>
              <div className="font-nunito text-gray-600">Monthly Events</div>
            </div>
          </div>
        </div>
      </section>

      <section id="learn-more" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-caveat text-5xl font-bold text-gray-900 mb-6">Your Home in Portugal's Hidden Gem</h2>
              <div className="space-y-6 font-nunito text-lg text-gray-700 leading-relaxed">
                <p>
                  Nestled in the heart of Lagos, Portugal's most captivating coastal town, Noma Village represents a new
                  way of living and working. We've created an intimate coliving community where authentic Portuguese
                  culture meets modern remote work lifestyle, offering you the chance to experience the real Portugal
                  while advancing your career and personal goals.
                </p>
                <p>
                  Our carefully curated community brings together digital nomads, entrepreneurs, creatives, and remote
                  professionals who share a passion for meaningful work, cultural exploration, and genuine human
                  connection. Located just minutes from Lagos' pristine beaches, historic old town, and vibrant local
                  markets, you'll have access to everything that makes Portugal special.
                </p>
                <p>
                  At Noma Village, we believe that where you live should inspire how you work. Our thoughtfully designed
                  spaces, from comfortable private rooms to collaborative work areas, are crafted to support both
                  productivity and well-being. Join us in creating a community that values authenticity, creativity, and
                  the Portuguese art of living well.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <img
                src="/beautiful-coliving-house-exterior-lagos-portugal.png"
                alt="Noma Village exterior in Lagos, Portugal"
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
              <img
                src="/rooftop-terrace-overlooking-lagos-coastline.png"
                alt="Rooftop terrace with Lagos coastline view"
                className="w-full h-48 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-caveat text-5xl font-bold text-gray-900 mb-4">Why Choose Noma Village?</h2>
            <p className="font-nunito text-xl text-gray-600 max-w-3xl mx-auto text-balance">
              Experience the perfect blend of Portuguese coastal living, modern amenities, and a thriving international
              community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-lagos-amber/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-lagos-amber" />
                </div>
                <h3 className="font-montserrat text-xl font-semibold mb-4">Curated Community</h3>
                <p className="font-nunito text-gray-600 leading-relaxed">
                  Connect with carefully selected digital nomads, entrepreneurs, and creatives who share your values and
                  ambitions. Our application process ensures quality connections and meaningful relationships.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-lagos-blue-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Wifi className="h-8 w-8 text-lagos-blue-green" />
                </div>
                <h3 className="font-montserrat text-xl font-semibold mb-4">Premium Workspace</h3>
                <p className="font-nunito text-gray-600 leading-relaxed">
                  Ultra-fast fiber internet, ergonomic workstations, quiet focus zones, and collaborative spaces
                  designed for maximum productivity and comfort in your remote work journey.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-lagos-pink/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="h-8 w-8 text-lagos-pink" />
                </div>
                <h3 className="font-montserrat text-xl font-semibold mb-4">Authentic Lagos Location</h3>
                <p className="font-nunito text-gray-600 leading-relaxed">
                  Immerse yourself in authentic Portuguese culture while being steps away from world-class beaches,
                  historic landmarks, local markets, and the vibrant social scene that makes Lagos special.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-lagos-aquamarine/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Home className="h-8 w-8 text-lagos-aquamarine" />
                </div>
                <h3 className="font-montserrat text-xl font-semibold mb-4">Thoughtful Living Spaces</h3>
                <p className="font-nunito text-gray-600 leading-relaxed">
                  Beautifully designed private rooms and common areas that blend Portuguese architectural charm with
                  modern comfort, creating spaces that truly feel like home.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-lagos-pink/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Coffee className="h-8 w-8 text-lagos-pink" />
                </div>
                <h3 className="font-montserrat text-xl font-semibold mb-4">Portuguese Lifestyle</h3>
                <p className="font-nunito text-gray-600 leading-relaxed">
                  Experience the Portuguese way of life with community meals, local cultural events, language exchange,
                  and insider access to the best of Lagos' hidden gems.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-lagos-blue-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Waves className="h-8 w-8 text-lagos-blue-green" />
                </div>
                <h3 className="font-montserrat text-xl font-semibold mb-4">Work-Life Balance</h3>
                <p className="font-nunito text-gray-600 leading-relaxed">
                  Find the perfect balance between productive work sessions and rejuvenating beach breaks, cultural
                  exploration, and community activities that enrich your remote work experience.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-caveat text-5xl font-bold text-gray-900 mb-4">Life at Noma Village</h2>
            <p className="font-nunito text-xl text-gray-600">
              Discover your new home away from home in Lagos, Portugal
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-6">
              <img
                src="/modern-coworking-space-with-ocean-view-in-portugal.png"
                alt="Coworking space"
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
              <img
                src="/comfortable-coliving-bedroom-with-portuguese-tiles.png"
                alt="Coliving room"
                className="w-full h-48 object-cover rounded-lg shadow-md"
              />
            </div>
            <div className="space-y-6">
              <img
                src="/rooftop-terrace-overlooking-lagos-coastline.png"
                alt="Rooftop terrace"
                className="w-full h-48 object-cover rounded-lg shadow-md"
              />
              <img
                src="/community-kitchen-with-people-cooking-together.png"
                alt="Community kitchen"
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
            </div>
            <div className="space-y-6">
              <img
                src="/group-of-digital-nomads-working-on-laptops-by-the-.png"
                alt="Beach working"
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
              <img
                src="/sunset-yoga-session-on-portuguese-coast.png"
                alt="Yoga session"
                className="w-full h-48 object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-caveat text-5xl font-bold text-gray-900 mb-4">What Our Community Says</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-lagos-amber fill-current" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-lagos-aquamarine mb-4" />
                <p className="font-nunito text-gray-600 mb-6 leading-relaxed">
                  "Noma Village transformed my remote work experience. The community is incredible and the location in
                  Lagos is absolutely unbeatable!"
                </p>
                <div className="flex items-center">
                  <img src="/young-woman-smiling.png" alt="Sarah" className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <div className="font-montserrat font-semibold">Sarah Chen</div>
                    <div className="font-nunito text-sm text-gray-500">UX Designer, San Francisco</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-lagos-amber fill-current" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-lagos-aquamarine mb-4" />
                <p className="font-nunito text-gray-600 mb-6 leading-relaxed">
                  "Perfect balance of work and Portuguese coastal life. I've never been more productive while enjoying
                  such an amazing lifestyle and authentic cultural experience."
                </p>
                <div className="flex items-center">
                  <img src="/young-bearded-man-headshot.png" alt="Marcus" className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <div className="font-montserrat font-semibold">Marcus Weber</div>
                    <div className="font-nunito text-sm text-gray-500">Software Engineer, Berlin</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-lagos-amber fill-current" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-lagos-aquamarine mb-4" />
                <p className="font-nunito text-gray-600 mb-6 leading-relaxed">
                  "The curated community and networking opportunities at Noma Village have been invaluable for my
                  business growth and personal development."
                </p>
                <div className="flex items-center">
                  <img
                    src="/professional-headshot-of-young-woman-with-curly-ha.png"
                    alt="Ana"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-montserrat font-semibold">Ana Rodriguez</div>
                    <div className="font-nunito text-sm text-gray-500">Marketing Consultant, Madrid</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-to-r from-lagos-blue-green to-lagos-pink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-caveat text-5xl font-bold text-white mb-4">Stay Connected</h2>
          <p className="font-nunito text-xl text-white/90 mb-8 text-balance">
            Get updates on community events, new amenities, and exclusive member benefits at Noma Village
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/70 font-nunito"
            />
            <Button className="bg-white text-lagos-blue-green hover:bg-white/90 font-montserrat">Subscribe</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
