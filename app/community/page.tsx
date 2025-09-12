import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, MapPin, Users, Heart, Globe, MessageCircle, Camera, Waves } from "lucide-react"
import Link from "next/link"
import { UTMAnchor } from "@/components/utm-link"

export default function CommunityPage() {
  const communityMembers = [
    {
      name: "Alex Thompson",
      role: "Software Engineer",
      country: "Canada",
      duration: "8 months",
      image: "/community-member-alex.png",
      story:
        "Moved to Lagos to escape the cold Canadian winters and found an incredible community of like-minded professionals. The work-life balance here is unmatched.",
      skills: ["React", "Node.js", "Surfing"],
    },
    {
      name: "Isabella Rodriguez",
      role: "Digital Marketer",
      country: "Spain",
      duration: "1 year",
      image: "/community-member-isabella.png",
      story:
        "As a Spanish speaker, I felt immediately at home in Portugal. The community has helped me grow my freelance business while enjoying the coastal lifestyle.",
      skills: ["Marketing", "Photography", "Yoga"],
    },
    {
      name: "James Park",
      role: "UX Designer",
      country: "South Korea",
      duration: "6 months",
      image: "/community-member-james.png",
      story:
        "The creative energy here is incredible. I've collaborated on three projects with fellow residents and learned Portuguese along the way.",
      skills: ["Design", "Prototyping", "Cooking"],
    },
    {
      name: "Emma Nielsen",
      role: "Content Creator",
      country: "Denmark",
      duration: "4 months",
      image: "/community-member-emma.png",
      story:
        "Lagos Living gave me the perfect backdrop for my travel content. The community is supportive and the location is simply magical.",
      skills: ["Content Creation", "Video Editing", "Hiking"],
    },
  ]

  const upcomingEvents = [
    {
      date: "2024-03-15",
      title: "Welcome Dinner for New Members",
      time: "7:00 PM",
      location: "Community Kitchen",
      type: "Social",
      attendees: 12,
    },
    {
      date: "2024-03-18",
      title: "Sunrise Yoga Session",
      time: "7:00 AM",
      location: "Rooftop Terrace",
      type: "Wellness",
      attendees: 8,
    },
    {
      date: "2024-03-20",
      title: "Portuguese Language Exchange",
      time: "6:30 PM",
      location: "Common Area",
      type: "Learning",
      attendees: 15,
    },
    {
      date: "2024-03-22",
      title: "Beach Cleanup & BBQ",
      time: "10:00 AM",
      location: "Praia do Camilo",
      type: "Community Service",
      attendees: 20,
    },
    {
      date: "2024-03-25",
      title: "Startup Pitch Night",
      time: "7:00 PM",
      location: "Coworking Space",
      type: "Professional",
      attendees: 25,
    },
  ]

  const communityValues = [
    {
      icon: Heart,
      title: "Respect & Kindness",
      description:
        "We treat everyone with respect and create an inclusive environment for all backgrounds and cultures.",
    },
    {
      icon: Users,
      title: "Collaboration",
      description:
        "We believe in the power of working together and supporting each other's personal and professional growth.",
    },
    {
      icon: Globe,
      title: "Cultural Exchange",
      description: "We celebrate diversity and encourage sharing of different cultures, languages, and perspectives.",
    },
    {
      icon: MessageCircle,
      title: "Open Communication",
      description: "We maintain transparent, honest communication and address conflicts constructively and promptly.",
    },
  ]

  const galleryImages = [
    { src: "/community-cooking-together.jpg", caption: "Community dinner" },
    { src: "/beach-volleyball-game.jpg", caption: "Beaches next door" },
    { src: "/coworking-collaboration.jpg", caption: "Yoga and Meditation by the Pool" },
    { src: "/rooftop-sunset-gathering.jpg", caption: "Cowork Space" },
    { src: "/portuguese-language-class.jpg", caption: "Pedalboard and Surfing" },
    { src: "/hiking-group-adventure.jpg", caption: "Workout and Yoga Shala" },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/community.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center 30%',
            transform: 'scale(1.1)'
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="font-montserrat text-6xl md:text-7xl font-bold mb-4">Community</h1>
          <p className="font-nunito text-xl md:text-2xl text-balance">
            Make Friends you haven't met yet
          </p>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-16 bg-lagos-aquamarine/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="font-nunito text-gray-600">Age Range</div>
              <div className="text-3xl font-bold text-lagos-blue-green font-montserrat">25 - 45 years</div>
            </div>
            <div className="space-y-2">
              <div className="font-nunito text-gray-600">Ø Age</div>
              <div className="text-3xl font-bold text-lagos-blue-green font-montserrat">33 years</div>
            </div>
            <div className="space-y-2">
              <div className="font-nunito text-gray-600">Ø Stay</div>
              <div className="text-3xl font-bold text-lagos-blue-green font-montserrat">1.5 months</div>
            </div>
            <div className="space-y-2">
              <div className="font-nunito text-gray-600">Gender Ratio</div>
              <div className="text-3xl font-bold text-lagos-blue-green font-montserrat">♀ 60% - ♂ 40%</div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Philosophy */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-caveat text-5xl font-bold text-gray-900 mb-4">What Makes Us Different</h2>
            <p className="font-nunito text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              At Noma Village, it's not just about Coliving & Coworking; it's also about Community. Set in the stunning Algarve region of Portugal, we're a community bringing together like-minded entrepreneurial people who are seeking meaningful connections and a beautiful life.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <p className="font-nunito text-lg text-gray-600 leading-relaxed">
              In probably every advertisement for a Coliving space, you'll find the term "like-minded people". But what truly defines this "mind" that unites everyone? In most cases, it's just the fact that they share the attribute of working remotely. We differ from the most typical Colivings. We aim to attract a special kind of people because the most beautiful magic and synchronicity unfold when these individuals come together.
            </p>
            <p className="font-nunito text-lg text-gray-600 leading-relaxed">
              As a Digital Nomad, travelling to a new country can sometimes feel lonely, particularly if you don't know anyone in your destination. It takes time to settle, meet others and discover the area. But no worries, this time of loneliness is over! From your arrival in Noma Village, you'll find yourself immersed in our wonderful Community.
            </p>
            <p className="font-nunito text-lg text-gray-600 leading-relaxed">
              What sets us apart is the way we live together as flatmates. It's not just about finding a place to stay; it's about willingly integrating yourself into our Community. We encourage you to be an active part of the collective and similarly respect the need for personal time and space.
            </p>
          </div>
        </div>
      </section>
      
      {/* Activities */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-caveat text-5xl font-bold text-gray-900 mb-4">Activities</h2>
            <p className="font-nunito text-xl text-gray-600">
              From spiritual practices to beach adventures - there's always something happening
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {/* Row 1 */}
            <div className="text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-lagos-pink/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Heart className="h-8 w-8 text-lagos-pink" />
              </div>
              <h3 className="font-montserrat text-base sm:text-lg font-semibold">Spiritual Practices</h3>
            </div>
            
            <div className="text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-lagos-blue-green/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="h-8 w-8 text-lagos-blue-green" />
              </div>
              <h3 className="font-montserrat text-base sm:text-lg font-semibold">Yoga & Sports</h3>
            </div>
            
            <div className="text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-lagos-amber/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Globe className="h-8 w-8 text-lagos-amber" />
              </div>
              <h3 className="font-montserrat text-base sm:text-lg font-semibold">Group Meals</h3>
            </div>
            
            <div className="text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-lagos-aquamarine/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <MapPin className="h-8 w-8 text-lagos-aquamarine" />
              </div>
              <h3 className="font-montserrat text-base sm:text-lg font-semibold">Hiking</h3>
            </div>
            
            {/* Row 2 */}
            <div className="text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-lagos-pink/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <MessageCircle className="h-8 w-8 text-lagos-pink" />
              </div>
              <h3 className="font-montserrat text-base sm:text-lg font-semibold">Ecstatic Dance</h3>
            </div>
            
            <div className="text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-lagos-amber/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Waves className="h-8 w-8 text-lagos-amber" />
              </div>
              <h3 className="font-montserrat text-base sm:text-lg font-semibold">Surfing</h3>
            </div>
            
            <div className="text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-lagos-aquamarine/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <MessageCircle className="h-8 w-8 text-lagos-aquamarine" />
              </div>
              <h3 className="font-montserrat text-base sm:text-lg font-semibold">Workshops</h3>
            </div>
            
            <div className="text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-lagos-pink/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Globe className="h-8 w-8 text-lagos-pink" />
              </div>
              <h3 className="font-montserrat text-base sm:text-lg font-semibold">Volleyball</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Member Profiles - Removed as we'll focus on activities instead */}

      {/* Community Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-caveat text-5xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="font-nunito text-xl text-gray-600">
              The principles that guide our community and create lasting connections
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {communityValues.map((value, index) => (
              <Card key={index} className="border-0 shadow-lg text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-lagos-pink/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <value.icon className="h-8 w-8 text-lagos-pink" />
                  </div>
                  <h3 className="font-montserrat text-xl font-semibold mb-4">{value.title}</h3>
                  <p className="font-nunito text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* Photo Gallery */}
      <section className="py-20 bg-lagos-aquamarine/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-caveat text-5xl font-bold text-gray-900 mb-4">Community Life</h2>
            <p className="font-nunito text-xl text-gray-600">Moments from our daily life and special events</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div key={index} className="relative group overflow-hidden rounded-lg shadow-lg">
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.caption}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 text-white">
                    <div className="flex items-center space-x-2">
                      <Camera className="h-4 w-4" />
                      <span className="font-nunito text-sm">{image.caption}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Communication */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-caveat text-5xl font-bold text-gray-900 mb-4">Stay Connected</h2>
          <p className="font-nunito text-xl text-gray-600 mb-12">
            Join our community channels to stay updated and connect with fellow members
          </p>

          <div className="flex justify-center">
            <Card className="border-0 shadow-lg max-w-md">
              <CardContent className="p-8 text-center">
                <MessageCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
                <h3 className="font-montserrat text-2xl font-semibold mb-4">WhatsApp Group</h3>
                <p className="font-nunito text-gray-600 mb-6">
                  Join our active WhatsApp group for daily updates, event announcements, and quick community chat.
                </p>
                <Button 
                  asChild
                  className="bg-green-500 hover:bg-green-600 text-white font-montserrat"
                >
                  <Link href="https://api.whatsapp.com/send/?phone=4917669299755&text&type=phone_number&app_absent=0" target="_blank">
                    Talk to us on WhatsApp
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-lagos-blue-green to-lagos-pink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-caveat text-5xl font-bold text-white mb-4">Ready to Join Our Community?</h2>
          <p className="font-nunito text-xl text-white/90 mb-8 text-balance">
            Become part of our vibrant international community in beautiful Lagos
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-lagos-blue-green hover:bg-white/90 font-montserrat text-lg px-8 py-3"
            >
              <UTMAnchor baseUrl="https://forms.fillout.com/t/aKuWaUwvaVus" target="_blank" rel="noopener noreferrer">Apply Now</UTMAnchor>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-lagos-blue-green font-montserrat text-lg px-8 py-3 bg-transparent"
            >
              <a href="https://calendly.com/nomavillagelagos/short-intro" target="_blank" rel="noopener noreferrer">Book Call</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
