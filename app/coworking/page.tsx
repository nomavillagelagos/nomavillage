import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wifi, Printer, Coffee, Users, Clock, CheckCircle, Star, Headphones, Monitor, Waves, MapPin } from "lucide-react"
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
      name: "Fabienne",
      role: "Coach",
      company: "Berlin",
      image: "/young-woman-smiling.webp",
      quote: "Noma Village transformed my remote work experience. The community is incredible and the location in Lagos is absolutely unbeatable!",
    },
    {
      name: "Bart",
      role: "Social Engineer",
      company: "Amsterdam",
      image: "/young-bearded-man-headshot.webp",
      quote: "Perfect balance of work and Portuguese coastal life. I've never been more productive while enjoying such an amazing lifestyle and authentic cultural experience.",
    },
    {
      name: "Kiki",
      role: "Copywriter",
      company: "Holland",
      image: "/professional-headshot-of-young-woman-with-curly-ha.webp",
      quote: "The curated community and networking opportunities at Noma Village have been invaluable for my business growth and personal development.",
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
          <h1
            className="font-montserrat font-light text-[40px] md:text-[64px] lg:text-[72px] leading-[1.05] tracking-[-0.03em] text-white text-balance mb-4"
            style={{ textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
          >
            <span className="font-caveat relative inline-block mx-2 align-baseline text-[1.25em]">
              <span className="relative z-10">Coworking</span>
              <span
                className="absolute left-[-10%] right-[-10%] bottom-[0%] h-[16px] md:h-[20px] lg:h-[24px] w-[120%]
                           bg-[url('/brush-underline.webp')] bg-no-repeat bg-center bg-[length:100%_100%]
                           -rotate-1 -z-10 brightness-0 invert opacity-80"
              />
            </span>
            <span className="inline-block text-white/90 text-[0.6em] md:text-[0.55em] tracking-[0.02em] align-baseline whitespace-nowrap mx-1">in</span>
            <span className="opacity-95">Lagos</span>
          </h1>
          <p className="font-nunito text-xl md:text-2xl text-balance">
            Get work done without being alone
          </p>
          <p className="font-nunito text-base md:text-lg text-white/90 mt-2">
            Permanently open from October to end of April.
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
            <p className="font-nunito text-base text-gray-600 max-w-3xl mx-auto mt-4">
              Permanently open from October to end of April.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-lagos-blue-green/20 rounded-lg flex items-center justify-center mb-3">
                <Users className="h-8 w-8 text-lagos-blue-green" />
              </div>
              <h3 className="font-montserrat text-base font-semibold text-center">Two Coworking Spaces</h3>
            </div>
            
            <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-lagos-pink/20 rounded-lg flex items-center justify-center mb-3">
                <Monitor className="h-8 w-8 text-lagos-pink" />
              </div>
              <h3 className="font-montserrat text-base font-semibold text-center">Large Tables & Chairs</h3>
            </div>
            
            <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-lagos-amber/20 rounded-lg flex items-center justify-center mb-3">
                <Headphones className="h-8 w-8 text-lagos-amber" />
              </div>
              <h3 className="font-montserrat text-base font-semibold text-center">Living Room</h3>
            </div>
            
            <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-lagos-blue-green/20 rounded-lg flex items-center justify-center mb-3">
                <Coffee className="h-8 w-8 text-lagos-blue-green" />
              </div>
              <h3 className="font-montserrat text-base font-semibold text-center">Two Fully Equipped Kitchens</h3>
            </div>
            
            <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-lagos-aquamarine/20 rounded-lg flex items-center justify-center mb-3">
                <Waves className="h-8 w-8 text-lagos-aquamarine" />
              </div>
              <h3 className="font-montserrat text-base font-semibold text-center">Balcony with Seaview</h3>
            </div>
            
            <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-lagos-pink/20 rounded-lg flex items-center justify-center mb-3">
                <Monitor className="h-8 w-8 text-lagos-pink" />
              </div>
              <h3 className="font-montserrat text-base font-semibold text-center">Desks in Every Room</h3>
            </div>
            
            <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-lagos-amber/20 rounded-lg flex items-center justify-center mb-3">
                <Wifi className="h-8 w-8 text-lagos-amber" />
              </div>
              <h3 className="font-montserrat text-base font-semibold text-center">Wifi 500 Mbps ↓ 120 Mbps ↑</h3>
            </div>
            
            <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-lagos-blue/20 rounded-lg flex items-center justify-center mb-3">
                <MapPin className="h-8 w-8 text-lagos-blue" />
              </div>
              <h3 className="font-montserrat text-base font-semibold text-center">Close to Beach</h3>
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

      


      <Footer />
    </div>
  )
}
