import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wifi, Printer, Coffee, Users, Clock, CheckCircle, Star, Headphones, Monitor } from "lucide-react"
import Link from "next/link"

export default function CoworkingPage() {
  const membershipPlans = [
    {
      name: "Day Pass",
      price: "€25",
      period: "/day",
      description: "Perfect for trying out our space",
      features: [
        "8 hours of workspace access",
        "High-speed internet",
        "Coffee & tea included",
        "Access to common areas",
        "Printing (5 pages free)",
      ],
      popular: false,
      cta: "Buy Day Pass",
    },
    {
      name: "Flexible",
      price: "€150",
      period: "/month",
      description: "Ideal for occasional remote workers",
      features: [
        "10 days per month",
        "All workspace amenities",
        "Meeting room (2h/month)",
        "Community events access",
        "Printing credits included",
        "Storage locker",
      ],
      popular: false,
      cta: "Choose Flexible",
    },
    {
      name: "Unlimited",
      price: "€280",
      period: "/month",
      description: "For serious remote professionals",
      features: [
        "24/7 workspace access",
        "Dedicated desk option",
        "Meeting room (10h/month)",
        "Priority event booking",
        "Unlimited printing",
        "Personal storage",
        "Guest day passes (2/month)",
      ],
      popular: true,
      cta: "Go Unlimited",
    },
  ]

  const workspaceFeatures = [
    {
      icon: Wifi,
      title: "Ultra-Fast Internet",
      description: "1GB fiber connection with backup lines ensuring 99.9% uptime",
    },
    {
      icon: Monitor,
      title: "Ergonomic Workstations",
      description: "Height-adjustable desks, ergonomic chairs, and external monitors",
    },
    {
      icon: Headphones,
      title: "Quiet Zones",
      description: "Dedicated silent areas for focused work and important calls",
    },
    {
      icon: Users,
      title: "Meeting Rooms",
      description: "Fully equipped rooms with video conferencing and whiteboards",
    },
    {
      icon: Printer,
      title: "Business Services",
      description: "High-quality printing, scanning, and office supplies",
    },
    {
      icon: Coffee,
      title: "Premium Coffee Bar",
      description: "Specialty coffee, healthy snacks, and refreshments all day",
    },
  ]

  const communityMembers = [
    {
      name: "Elena Rodriguez",
      role: "UX Designer",
      company: "Freelance",
      image: "/professional-woman-working-on-laptop.png",
      quote: "The creative energy here is incredible. I've collaborated on three projects just this month!",
    },
    {
      name: "James Chen",
      role: "Software Engineer",
      company: "Remote Startup",
      image: "/young-man-coding-at-modern-desk.png",
      quote: "Perfect setup for deep work. The internet is blazing fast and the community is supportive.",
    },
    {
      name: "Sofia Andersson",
      role: "Marketing Consultant",
      company: "Digital Agency",
      image: "/blonde-woman-in-video-call.png",
      quote: "I've grown my network significantly here. The events and workshops are top-notch.",
    },
  ]

  const upcomingEvents = [
    {
      date: "Mar 15",
      title: "Startup Pitch Night",
      time: "7:00 PM",
      type: "Networking",
    },
    {
      date: "Mar 18",
      title: "Digital Marketing Workshop",
      time: "2:00 PM",
      type: "Learning",
    },
    {
      date: "Mar 22",
      title: "Friday Social Hour",
      time: "6:00 PM",
      type: "Social",
    },
    {
      date: "Mar 25",
      title: "Productivity Masterclass",
      time: "10:00 AM",
      type: "Workshop",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/modern-coworking-space-with-people-working.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="font-caveat text-6xl md:text-7xl font-bold mb-4">Coworking</h1>
          <p className="font-nunito text-xl md:text-2xl text-balance">
            Get work done without being alone
          </p>
        </div>
      </section>

      {/* Workspace Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-caveat text-5xl font-bold text-gray-900 mb-4">Our Coworking Spaces</h2>
            <p className="font-nunito text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              If you're looking for a space to work and live in sunny Portugal, we've got you covered all beneath the same roof(s). Coworking at Noma Village is more than just a place to work. Let yourself be inspired and motivated by sitting together with our Coliving Community members in the same space, where everyone works on their stuff.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-lagos-blue-green/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-lagos-blue-green" />
              </div>
              <h3 className="font-montserrat text-lg font-semibold mb-2">Two Coworking Spaces</h3>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-lagos-pink/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Monitor className="h-8 w-8 text-lagos-pink" />
              </div>
              <h3 className="font-montserrat text-lg font-semibold mb-2">Large Tables & Chairs</h3>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-lagos-amber/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Headphones className="h-8 w-8 text-lagos-amber" />
              </div>
              <h3 className="font-montserrat text-lg font-semibold mb-2">Living Room</h3>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-lagos-aquamarine/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-lagos-aquamarine" />
              </div>
              <h3 className="font-montserrat text-lg font-semibold mb-2">Shared Bathroom</h3>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-lagos-blue-green/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Coffee className="h-8 w-8 text-lagos-blue-green" />
              </div>
              <h3 className="font-montserrat text-lg font-semibold mb-2">Two fully equipped Kitchen</h3>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-lagos-pink/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Printer className="h-8 w-8 text-lagos-pink" />
              </div>
              <h3 className="font-montserrat text-lg font-semibold mb-2">Balcony</h3>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-lagos-amber/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Wifi className="h-8 w-8 text-lagos-amber" />
              </div>
              <h3 className="font-montserrat text-lg font-semibold mb-2">Wifi 500 Mbps ↓ 120 Mbps ↑</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Workspace Description */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-caveat text-5xl font-bold text-gray-900 mb-4">Two Distinct Spaces</h2>
            <p className="font-nunito text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Our main Coworking Space is a big dedicated flat that we have turned into an office space & living room. No need to work next to the bed in your private room anymore!
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <p className="font-nunito text-lg text-gray-600 mb-6 leading-relaxed">
              Here, you find two big desks, a chillout niche, a fully equipped kitchen and our dreamy balcony on which you can chill or work too. Also ideal for enjoying your morning coffee or tea while catching the first sunrays of the day. If you have a call or meeting, you can use the call booth downstairs to not disturb your coworkers.
            </p>
            <p className="font-nunito text-lg text-gray-600 mb-6 leading-relaxed">
              On the other side of the pool in the second villa, you'll find our little Coworking studio. This one is also equipped with another big desk, a kitchen, toilet and a little winter garden. So in case you should need a change of scenery, just walk over to the other space.
            </p>
            <p className="font-nunito text-lg text-gray-600 leading-relaxed">
              Other than that, you can also find a workplace outside next to our pools. We have a roofed area with WiFi access you can use for working too. If you need some more privacy for coaching calls or deep work, you have a little desk in your private room too.
            </p>
          </div>

        </div>
      </section>

      {/* Community Showcase */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-caveat text-5xl font-bold text-gray-900 mb-4">Meet Our Community</h2>
            <p className="font-nunito text-xl text-gray-600">
              Connect with entrepreneurs, creatives, and innovators from around the world
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {communityMembers.map((member, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-16 h-16 rounded-full mr-4"
                    />
                    <div>
                      <h3 className="font-montserrat font-semibold text-lg">{member.name}</h3>
                      <p className="font-nunito text-gray-600">{member.role}</p>
                      <p className="font-nunito text-sm text-gray-500">{member.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-lagos-amber fill-current" />
                    ))}
                  </div>
                  <p className="font-nunito text-gray-600 italic leading-relaxed">"{member.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Events & Networking */}
      <section className="py-20 bg-lagos-aquamarine/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-caveat text-5xl font-bold text-gray-900 mb-6">Events & Networking</h2>
              <p className="font-nunito text-lg text-gray-600 mb-8 leading-relaxed">
                Our vibrant community hosts regular events, workshops, and networking sessions designed to help you grow
                professionally and personally. From startup pitch nights to skill-building workshops, there's always
                something happening at Lagos Living.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-lagos-blue-green font-montserrat">15+</div>
                  <div className="font-nunito text-sm text-gray-600">Monthly Events</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-lagos-blue-green font-montserrat">200+</div>
                  <div className="font-nunito text-sm text-gray-600">Community Members</div>
                </div>
              </div>

              <Button size="lg" className="bg-lagos-pink hover:bg-lagos-pink/90 text-white font-montserrat">
                View All Events
              </Button>
            </div>

            <div>
              <h3 className="font-montserrat text-2xl font-semibold mb-6">Upcoming Events</h3>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <Card key={index} className="border-0 shadow-md">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <div className="font-montserrat font-bold text-lagos-blue-green">{event.date}</div>
                          </div>
                          <div>
                            <h4 className="font-montserrat font-semibold">{event.title}</h4>
                            <p className="font-nunito text-sm text-gray-600">{event.time}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-lagos-amber border-lagos-amber">
                          {event.type}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking System Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-caveat text-5xl font-bold text-gray-900 mb-4">Book Your Space</h2>
            <p className="font-nunito text-xl text-gray-600">
              Easy online booking for meeting rooms and workspace access
            </p>
          </div>

          <Tabs defaultValue="meeting-rooms" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="meeting-rooms" className="font-montserrat">
                Meeting Rooms
              </TabsTrigger>
              <TabsTrigger value="day-passes" className="font-montserrat">
                Day Passes
              </TabsTrigger>
            </TabsList>

            <TabsContent value="meeting-rooms" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <img
                      src="/modern-coworking-space-with-ocean-view-in-portugal.png"
                      alt="Meeting Room A"
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h3 className="font-montserrat text-xl font-semibold mb-2">Ocean View Conference</h3>
                    <p className="font-nunito text-gray-600 mb-4">Seats 8 • Video conferencing • Whiteboard</p>
                    <div className="flex items-center justify-between">
                      <span className="font-montserrat font-bold text-lagos-blue-green">€15/hour</span>
                      <Button size="sm" className="bg-lagos-pink hover:bg-lagos-pink/90">
                        Book Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <img
                      src="/group-of-digital-nomads-working-on-laptops-by-the-.png"
                      alt="Meeting Room B"
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h3 className="font-montserrat text-xl font-semibold mb-2">Creative Studio</h3>
                    <p className="font-nunito text-gray-600 mb-4">Seats 4 • Brainstorming setup • Natural light</p>
                    <div className="flex items-center justify-between">
                      <span className="font-montserrat font-bold text-lagos-blue-green">€10/hour</span>
                      <Button size="sm" className="bg-lagos-pink hover:bg-lagos-pink/90">
                        Book Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="day-passes" className="mt-8">
              <Card className="border-0 shadow-lg max-w-2xl mx-auto">
                <CardContent className="p-8 text-center">
                  <Clock className="h-16 w-16 text-lagos-amber mx-auto mb-6" />
                  <h3 className="font-montserrat text-2xl font-semibold mb-4">Day Pass Access</h3>
                  <p className="font-nunito text-gray-600 mb-6 leading-relaxed">
                    Get instant access to our coworking space for a full day. Perfect for trying out our community
                    before committing to a monthly membership.
                  </p>
                  <div className="flex items-center justify-center space-x-4 mb-6">
                    <span className="text-3xl font-bold text-lagos-blue-green font-montserrat">€25</span>
                    <span className="font-nunito text-gray-600">/day</span>
                  </div>
                  <Button
                    size="lg"
                    className="bg-lagos-blue-green hover:bg-lagos-blue-green/90 text-white font-montserrat"
                  >
                    Buy Day Pass
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-lagos-blue-green to-lagos-pink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-caveat text-5xl font-bold text-white mb-4">Ready to Boost Your Productivity?</h2>
          <p className="font-nunito text-xl text-white/90 mb-8 text-balance">
            Join our thriving community of remote workers and entrepreneurs
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-lagos-blue-green hover:bg-white/90 font-montserrat text-lg px-8 py-3"
            >
              <Link href="/join">Start Membership</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-lagos-blue-green font-montserrat text-lg px-8 py-3 bg-transparent"
            >
              <Link href="#tour">Book a Tour</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
