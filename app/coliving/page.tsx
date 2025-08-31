import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Users, Utensils, Wifi, Car, Waves, Coffee, Shield, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function ColivingPage() {
  const roomTypes = [
    {
      name: "Ocean View Suite",
      price: "€850",
      period: "/month",
      features: ["Private bathroom", "Ocean view", "25m²", "Balcony", "Premium furnishing"],
      image: "/luxury-coliving-room-with-ocean-view-lagos.png",
      available: true,
    },
    {
      name: "Garden Room",
      price: "€650",
      period: "/month",
      features: ["Shared bathroom", "Garden view", "18m²", "Natural light", "Cozy atmosphere"],
      image: "/cozy-coliving-bedroom-with-garden-view.png",
      available: true,
    },
    {
      name: "Standard Room",
      price: "€550",
      period: "/month",
      features: ["Shared bathroom", "City view", "15m²", "Essential furnishing", "Great value"],
      image: "/simple-coliving-room-with-modern-furniture.png",
      available: false,
    },
  ]

  const amenities = [
    { icon: Utensils, title: "Fully Equipped Kitchen", description: "Professional appliances, dining area for 12" },
    { icon: Users, title: "Common Areas", description: "Lounge, game room, and social spaces" },
    { icon: Waves, title: "Rooftop Terrace", description: "Ocean views, BBQ area, and sunset yoga" },
    { icon: Wifi, title: "High-Speed Internet", description: "Fiber optic, backup connections" },
    { icon: Coffee, title: "Coffee Station", description: "Premium coffee and tea, available 24/7" },
    { icon: Car, title: "Parking", description: "Secure parking space available" },
  ]

  const houseRules = [
    "Respect quiet hours (10 PM - 8 AM)",
    "Keep common areas clean and tidy",
    "No smoking inside the building",
    "Guests welcome with prior notice",
    "Participate in weekly house meetings",
    "Be mindful of water and energy usage",
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/beautiful-coliving-house-exterior-lagos-portugal.png')",
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="font-caveat text-6xl md:text-7xl font-bold mb-4">Coliving</h1>
          <p className="font-nunito text-xl md:text-2xl text-balance">
            A haven in the heart of community
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-caveat text-5xl font-bold text-gray-900 mb-6">A haven in the heart of community</h2>
              <p className="font-nunito text-lg text-gray-600 mb-6 leading-relaxed">
                Nomavillage goes beyond being a place to crash—it's where your room turns into your cozy hideaway, and the shared spaces transform into your playground. It's all about that perfect balance between having your own chill space and enjoying the good vibes with your fellow Colivers.
              </p>
              <p className="font-nunito text-lg text-gray-600 mb-6 leading-relaxed">
                Our Coliving setup includes three houses, each facing the other, with two cool pools in between. Each house is packed with comfy private rooms, all with their own bathroom. We've got shared spaces, too—think of them as our main hub for Coliving & Coworking. Open 24/7, they're the heart of our village.
              </p>
              <p className="font-nunito text-lg text-gray-600 mb-8 leading-relaxed">
                On our spacious property, you can find your Zen, take a dip or relax by the pool, catch the sunrise from the rooftop, or just sip your morning coffee on the balcony. Our Coliving vibe is easygoing, with no strict schedules. Things just happen naturally, bringing us all closer.
              </p>
            </div>
            <div className="relative">
              <img
                src="/group-of-people-cooking-together-in-modern-kitchen.png"
                alt="Community cooking"
                className="w-full h-96 object-cover rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Room Types */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-caveat text-5xl font-bold text-gray-900 mb-4">Our Coliving Space</h2>
            <p className="font-nunito text-xl text-gray-600">Everything you need for comfortable community living</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-lagos-blue-green/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Utensils className="h-8 w-8 text-lagos-blue-green" />
              </div>
              <h3 className="font-montserrat text-lg font-semibold mb-2">2 fully-equipped kitchen</h3>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-lagos-pink/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-lagos-pink" />
              </div>
              <h3 className="font-montserrat text-lg font-semibold mb-2">2 Coworking spaces</h3>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-lagos-amber/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Car className="h-8 w-8 text-lagos-amber" />
              </div>
              <h3 className="font-montserrat text-lg font-semibold mb-2">Chill Area</h3>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-lagos-aquamarine/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Waves className="h-8 w-8 text-lagos-aquamarine" />
              </div>
              <h3 className="font-montserrat text-lg font-semibold mb-2">Balcony</h3>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-lagos-blue-green/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Waves className="h-8 w-8 text-lagos-blue-green" />
              </div>
              <h3 className="font-montserrat text-lg font-semibold mb-2">2 Pools</h3>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-lagos-pink/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Coffee className="h-8 w-8 text-lagos-pink" />
              </div>
              <h3 className="font-montserrat text-lg font-semibold mb-2">Outdoor seating</h3>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-lagos-amber/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Wifi className="h-8 w-8 text-lagos-amber" />
              </div>
              <h3 className="font-montserrat text-lg font-semibold mb-2">Laundry</h3>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-lagos-aquamarine/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-lagos-aquamarine" />
              </div>
              <h3 className="font-montserrat text-lg font-semibold mb-2">Yoga Mats & meditation cushions</h3>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-lagos-pink/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-lagos-pink" />
              </div>
              <h3 className="font-montserrat text-lg font-semibold mb-2">Rooftop</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Weekly Community Activities */}
      <section className="py-20 bg-lagos-aquamarine/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-caveat text-5xl font-bold text-gray-900 mb-4">Community Life</h2>
            <p className="font-nunito text-xl text-gray-600">
              Every week, we come together for communal meals, and Thursdays are all about yoga sessions
            </p>
          </div>
          
          <div className="text-center max-w-4xl mx-auto">
            <p className="font-nunito text-lg text-gray-600 mb-8 leading-relaxed">
              If the ocean is calling, you might spot a crew heading out for a surf or swim. As the day winds down, there's always an opportunity for a spontaneous excursion to catch the breathtaking sunset on the cliffs. Evenings are alive with someone always hanging out in our main spaces. And guess what? That's just the start—we're always up for new adventures, making sure no moment goes unexplored.
            </p>
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-caveat text-5xl font-bold text-gray-900 mb-4">World-Class Amenities</h2>
            <p className="font-nunito text-xl text-gray-600">
              Everything you need for comfortable living and productive work
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {amenities.map((amenity, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-lagos-amber/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <amenity.icon className="h-6 w-6 text-lagos-amber" />
                </div>
                <div>
                  <h3 className="font-montserrat font-semibold text-lg mb-2">{amenity.title}</h3>
                  <p className="font-nunito text-gray-600">{amenity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Virtual Tour */}
      <section className="py-20 bg-lagos-aquamarine/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-caveat text-5xl font-bold text-gray-900 mb-4">Take a Virtual Tour</h2>
            <p className="font-nunito text-xl text-gray-600">Explore our beautiful spaces from anywhere in the world</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <img
                src="/modern-coliving-common-area-with-comfortable-seatin.png"
                alt="Common area"
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
              <img
                src="/fully-equipped-shared-kitchen-in-coliving-space.png"
                alt="Kitchen"
                className="w-full h-48 object-cover rounded-lg shadow-md"
              />
            </div>
            <div className="space-y-6">
              <img
                src="/rooftop-terrace-with-ocean-view-and-lounge-chairs.png"
                alt="Rooftop"
                className="w-full h-48 object-cover rounded-lg shadow-md"
              />
              <img
                src="/cozy-reading-nook-with-books-and-plants.png"
                alt="Reading nook"
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
            </div>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="bg-lagos-blue-green hover:bg-lagos-blue-green/90 text-white font-montserrat">
              Schedule Virtual Tour
            </Button>
          </div>
        </div>
      </section>

      {/* House Rules */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-caveat text-5xl font-bold text-gray-900 mb-4">House Guidelines</h2>
            <p className="font-nunito text-xl text-gray-600">
              Simple rules that help us maintain a harmonious community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {houseRules.map((rule, index) => (
              <div key={index} className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-lagos-blue-green mt-1 flex-shrink-0" />
                <span className="font-nunito text-gray-700">{rule}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-caveat text-5xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-white rounded-lg px-6">
              <AccordionTrigger className="font-montserrat font-semibold">
                What's included in the monthly rent?
              </AccordionTrigger>
              <AccordionContent className="font-nunito text-gray-600">
                Your monthly rent includes all utilities (electricity, water, gas), high-speed internet, weekly cleaning
                of common areas, access to all amenities, and participation in community events. Bed linens and towels
                are also provided.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-white rounded-lg px-6">
              <AccordionTrigger className="font-montserrat font-semibold">
                What's the minimum stay requirement?
              </AccordionTrigger>
              <AccordionContent className="font-nunito text-gray-600">
                Our minimum stay is one month. This allows you to truly integrate into the community and experience the
                full benefits of coliving. We offer discounts for stays of 3 months or longer.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-white rounded-lg px-6">
              <AccordionTrigger className="font-montserrat font-semibold">Can I have guests over?</AccordionTrigger>
              <AccordionContent className="font-nunito text-gray-600">
                Yes! Guests are welcome with 24-hour advance notice. Day guests can visit anytime, and overnight guests
                can stay up to 3 nights per month. We just ask that you inform the community manager and ensure your
                guests respect our house guidelines.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-white rounded-lg px-6">
              <AccordionTrigger className="font-montserrat font-semibold">How do I book a room?</AccordionTrigger>
              <AccordionContent className="font-nunito text-gray-600">
                You can book directly through our website or schedule a virtual tour first. We require a deposit equal
                to one month's rent plus a refundable security deposit. All bookings are subject to a brief application
                process to ensure community fit.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="bg-white rounded-lg px-6">
              <AccordionTrigger className="font-montserrat font-semibold">
                What if I need to cancel my booking?
              </AccordionTrigger>
              <AccordionContent className="font-nunito text-gray-600">
                We offer flexible cancellation policies. Cancellations made 30+ days before arrival receive a full
                refund minus processing fees. Cancellations within 30 days are subject to our standard cancellation
                policy outlined in your booking agreement.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-lagos-blue-green to-lagos-pink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-caveat text-5xl font-bold text-white mb-4">Ready to Join Our Community?</h2>
          <p className="font-nunito text-xl text-white/90 mb-8 text-balance">
            Start your coliving journey in beautiful Lagos, Portugal
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-lagos-blue-green hover:bg-white/90 font-montserrat text-lg px-8 py-3"
            >
              <Link href="/join">Apply Now</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-lagos-blue-green font-montserrat text-lg px-8 py-3 bg-transparent"
            >
              <Link href="#tour">Schedule Tour</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
