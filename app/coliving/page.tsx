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
          <h1 className="font-caveat text-6xl md:text-7xl font-bold mb-4">Coliving in Lagos</h1>
          <p className="font-nunito text-xl md:text-2xl text-balance">
            Your home away from home on the Portuguese coast
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-caveat text-5xl font-bold text-gray-900 mb-6">Our Coliving Philosophy</h2>
              <p className="font-nunito text-lg text-gray-600 mb-6 leading-relaxed">
                At Lagos Living, we believe that the best experiences come from meaningful connections. Our coliving
                space is designed to foster community, creativity, and personal growth while maintaining the perfect
                balance between social interaction and personal space.
              </p>
              <p className="font-nunito text-lg text-gray-600 mb-8 leading-relaxed">
                Whether you're here for a month or a year, you'll find yourself part of a supportive community of
                like-minded individuals who share your passion for remote work, travel, and authentic experiences.
              </p>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-lagos-blue-green font-montserrat">50+</div>
                  <div className="font-nunito text-sm text-gray-600">Happy Residents</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-lagos-blue-green font-montserrat">4.9</div>
                  <div className="font-nunito text-sm text-gray-600">Average Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-lagos-blue-green font-montserrat">25+</div>
                  <div className="font-nunito text-sm text-gray-600">Nationalities</div>
                </div>
              </div>
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
            <h2 className="font-caveat text-5xl font-bold text-gray-900 mb-4">Choose Your Space</h2>
            <p className="font-nunito text-xl text-gray-600">All rooms come fully furnished with premium amenities</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {roomTypes.map((room, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="relative">
                  <img
                    src={room.image || "/placeholder.svg"}
                    alt={room.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {!room.available && <Badge className="absolute top-4 right-4 bg-red-500">Waitlist</Badge>}
                  {room.available && <Badge className="absolute top-4 right-4 bg-green-500">Available</Badge>}
                </div>
                <CardHeader>
                  <CardTitle className="font-montserrat text-xl">{room.name}</CardTitle>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-lagos-blue-green font-montserrat">{room.price}</span>
                    <span className="font-nunito text-gray-600 ml-1">{room.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {room.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center font-nunito text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full font-montserrat ${
                      room.available ? "bg-lagos-pink hover:bg-lagos-pink/90" : "bg-gray-400 cursor-not-allowed"
                    }`}
                    disabled={!room.available}
                  >
                    {room.available ? "Book Now" : "Join Waitlist"}
                  </Button>
                </CardContent>
              </Card>
            ))}
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
