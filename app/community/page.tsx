import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, MapPin, Users, Heart, Globe, MessageCircle, Camera } from "lucide-react"
import Link from "next/link"

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
    { src: "/community-cooking-together.png", caption: "Community dinner preparation" },
    { src: "/beach-volleyball-game.png", caption: "Beach volleyball tournament" },
    { src: "/coworking-collaboration.png", caption: "Collaborative work session" },
    { src: "/rooftop-sunset-gathering.png", caption: "Sunset gathering on rooftop" },
    { src: "/portuguese-language-class.png", caption: "Portuguese language exchange" },
    { src: "/hiking-group-adventure.png", caption: "Weekend hiking adventure" },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/diverse-group-of-people-socializing.png')",
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="font-caveat text-6xl md:text-7xl font-bold mb-4">Our Community</h1>
          <p className="font-nunito text-xl md:text-2xl text-balance">
            Meet the amazing people who make Lagos Living special
          </p>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-16 bg-lagos-aquamarine/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-lagos-blue-green font-montserrat">50+</div>
              <div className="font-nunito text-gray-600">Active Members</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-lagos-blue-green font-montserrat">25+</div>
              <div className="font-nunito text-gray-600">Nationalities</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-lagos-blue-green font-montserrat">15+</div>
              <div className="font-nunito text-gray-600">Monthly Events</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-lagos-blue-green font-montserrat">4.9</div>
              <div className="font-nunito text-gray-600">Community Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Member Profiles */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-caveat text-5xl font-bold text-gray-900 mb-4">Meet Our Members</h2>
            <p className="font-nunito text-xl text-gray-600">
              Discover the stories of our diverse community from around the world
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {communityMembers.map((member, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4 mb-6">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={member.image || "/placeholder.svg"} alt={member.name} />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-montserrat text-xl font-semibold">{member.name}</h3>
                      <p className="font-nunito text-gray-600">{member.role}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <Badge variant="outline" className="text-lagos-blue-green border-lagos-blue-green">
                          {member.country}
                        </Badge>
                        <span className="font-nunito text-sm text-gray-500">{member.duration}</span>
                      </div>
                    </div>
                  </div>

                  <p className="font-nunito text-gray-600 mb-4 leading-relaxed italic">"{member.story}"</p>

                  <div className="flex flex-wrap gap-2">
                    {member.skills.map((skill, idx) => (
                      <Badge key={idx} className="bg-lagos-amber/20 text-lagos-amber border-0">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

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

      {/* Events Calendar */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-caveat text-5xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
            <p className="font-nunito text-xl text-gray-600">
              Join us for exciting activities, learning opportunities, and social gatherings
            </p>
          </div>

          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex items-start space-x-4 mb-4 md:mb-0">
                      <div className="text-center min-w-[60px]">
                        <div className="font-montserrat font-bold text-lagos-blue-green">
                          {new Date(event.date).getDate()}
                        </div>
                        <div className="font-nunito text-sm text-gray-600">
                          {new Date(event.date).toLocaleDateString("en", { month: "short" })}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-montserrat text-xl font-semibold mb-2">{event.title}</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4">
                          <div className="flex items-center text-gray-600">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span className="font-nunito text-sm">{event.time}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span className="font-nunito text-sm">{event.location}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Users className="h-4 w-4 mr-1" />
                            <span className="font-nunito text-sm">{event.attendees} attending</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className="bg-lagos-amber/20 text-lagos-amber border-0">{event.type}</Badge>
                      <Button size="sm" className="bg-lagos-pink hover:bg-lagos-pink/90">
                        Join Event
                      </Button>
                    </div>
                  </div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <MessageCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
                <h3 className="font-montserrat text-2xl font-semibold mb-4">WhatsApp Group</h3>
                <p className="font-nunito text-gray-600 mb-6">
                  Join our active WhatsApp group for daily updates, event announcements, and quick community chat.
                </p>
                <Button className="bg-green-500 hover:bg-green-600 text-white font-montserrat">Join WhatsApp</Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <MessageCircle className="h-16 w-16 text-purple-500 mx-auto mb-6" />
                <h3 className="font-montserrat text-2xl font-semibold mb-4">Slack Workspace</h3>
                <p className="font-nunito text-gray-600 mb-6">
                  Access our organized Slack workspace with channels for work, events, local tips, and more.
                </p>
                <Button className="bg-purple-500 hover:bg-purple-600 text-white font-montserrat">Join Slack</Button>
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

          <Button
            asChild
            size="lg"
            className="bg-white text-lagos-blue-green hover:bg-white/90 font-montserrat text-lg px-8 py-3"
          >
            <Link href="/join">Apply to Join</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
