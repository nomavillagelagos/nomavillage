import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Bath, Maximize, Wifi, AirVent, Car, Utensils, Shirt, CheckCircle, Calendar, Eye, Star } from "lucide-react"
import Link from "next/link"

export default function RoomsPage() {
  const roomTypes = [
    {
      id: "ocean-suite",
      name: "Ocean View Suite",
      price: 850,
      size: "25m²",
      bathroom: "Private",
      view: "Ocean",
      available: 2,
      images: [
        "/luxury-ocean-view-bedroom-with-balcony.png",
        "/private-bathroom-with-modern-fixtures.png",
        "/ocean-view-balcony-with-seating.png",
      ],
      features: [
        "King-size bed with premium mattress",
        "Private bathroom with rainfall shower",
        "Ocean-facing balcony with seating",
        "Work desk with ergonomic chair",
        "Built-in wardrobe with safe",
        "Air conditioning & heating",
        "Blackout curtains",
        "Premium bed linens included",
      ],
      description: "Our premium suite offers breathtaking ocean views and maximum comfort for the discerning traveler.",
    },
    {
      id: "garden-room",
      name: "Garden Room",
      price: 650,
      size: "18m²",
      bathroom: "Shared",
      view: "Garden",
      available: 3,
      images: [
        "/cozy-garden-view-bedroom-with-plants.png",
        "/shared-bathroom-modern-design.png",
        "/garden-terrace-with-outdoor-seating.png",
      ],
      features: [
        "Queen-size bed with quality mattress",
        "Large windows with garden views",
        "Work desk with natural lighting",
        "Built-in storage solutions",
        "Air conditioning & heating",
        "Shared bathroom (2 people max)",
        "Access to garden terrace",
        "Weekly linen service",
      ],
      description: "Perfect balance of comfort and value with serene garden views and natural light.",
    },
    {
      id: "standard-room",
      name: "Standard Room",
      price: 550,
      size: "15m²",
      bathroom: "Shared",
      view: "City",
      available: 0,
      images: [
        "/compact-modern-bedroom-with-desk.png",
        "/shared-bathroom-clean-design.png",
        "/city-view-window-with-desk.png",
      ],
      features: [
        "Comfortable single bed",
        "Compact work area",
        "Built-in storage",
        "City views",
        "Air conditioning",
        "Shared bathroom (3 people max)",
        "Weekly linen service",
        "Essential furnishing",
      ],
      description: "Great value option for budget-conscious travelers who want quality accommodation.",
    },
  ]

  const includedAmenities = [
    { icon: Wifi, title: "High-Speed Internet", description: "Fiber optic connection" },
    { icon: Utensils, title: "Kitchen Access", description: "Fully equipped shared kitchen" },
    { icon: Shirt, title: "Laundry", description: "Washing machine & dryer" },
    { icon: AirVent, title: "Climate Control", description: "AC & heating in all rooms" },
    { icon: Car, title: "Parking", description: "Available upon request" },
    { icon: Bath, title: "Cleaning", description: "Weekly room & common area cleaning" },
  ]

  const comparisonFeatures = [
    "Room Size",
    "Bathroom Type",
    "View",
    "Balcony/Terrace",
    "Work Desk",
    "Storage",
    "Air Conditioning",
    "Weekly Cleaning",
    "Linen Service",
    "Kitchen Access",
    "Parking Available",
  ]

  const comparisonData = {
    "Ocean View Suite": ["25m²", "Private", "Ocean", "✓", "✓", "Built-in wardrobe", "✓", "✓", "Premium", "✓", "✓"],
    "Garden Room": ["18m²", "Shared", "Garden", "Garden access", "✓", "Built-in", "✓", "✓", "Standard", "✓", "✓"],
    "Standard Room": ["15m²", "Shared", "City", "✗", "✓", "Basic", "✓", "✓", "Standard", "✓", "✓"],
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/beautiful-coliving-rooms-showcase.png')",
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="font-caveat text-6xl md:text-7xl font-bold mb-4">Private Rooms</h1>
          <p className="font-nunito text-xl md:text-2xl text-balance">
            More than just a place to sleep
          </p>
        </div>
      </section>

      {/* Room Showcase */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-caveat text-5xl font-bold text-gray-900 mb-4">Our Private Rooms</h2>
            <p className="font-nunito text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Welcome to your own little private oasis at our Coliving & Coworking Space! Our rooms are designed with your comfort and privacy in mind. Each room features its own private bathroom, so you can enjoy your personal space without any interruptions.
            </p>
            <p className="font-nunito text-lg text-gray-600 max-w-4xl mx-auto mt-4 leading-relaxed">
              Feel right at home and start your day feeling refreshed and rejuvenated. Our rooms are tastefully decorated with a welcoming ambiance. You'll find yourself sinking into a big-sized, super comfortable bed, ensuring a restful night's sleep. Natural daylight fills the space through large sliding doors, creating a bright and light-flooded environment.
            </p>
          </div>

          <div className="space-y-16">
            {roomTypes.map((room, index) => (
              <div
                key={room.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                  <div className="flex items-center gap-4 mb-4">
                    <h3 className="font-caveat text-4xl font-bold text-gray-900">{room.name}</h3>
                    {room.available > 0 ? (
                      <Badge className="bg-green-500">{room.available} Available</Badge>
                    ) : (
                      <Badge className="bg-red-500">Waitlist Only</Badge>
                    )}
                  </div>

                  <div className="flex items-baseline mb-6">
                    <span className="text-4xl font-bold text-lagos-blue-green font-montserrat">€{room.price}</span>
                    <span className="font-nunito text-gray-600 ml-2">/month</span>
                  </div>

                  <p className="font-nunito text-lg text-gray-600 mb-6 leading-relaxed">{room.description}</p>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <Maximize className="h-6 w-6 text-lagos-amber mx-auto mb-2" />
                      <div className="font-montserrat font-semibold">{room.size}</div>
                      <div className="font-nunito text-sm text-gray-600">Size</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <Bath className="h-6 w-6 text-lagos-amber mx-auto mb-2" />
                      <div className="font-montserrat font-semibold">{room.bathroom}</div>
                      <div className="font-nunito text-sm text-gray-600">Bathroom</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <Eye className="h-6 w-6 text-lagos-amber mx-auto mb-2" />
                      <div className="font-montserrat font-semibold">{room.view}</div>
                      <div className="font-nunito text-sm text-gray-600">View</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8">
                    {room.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center font-nunito text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      className={`font-montserrat ${
                        room.available > 0 ? "bg-lagos-pink hover:bg-lagos-pink/90" : "bg-gray-400 cursor-not-allowed"
                      }`}
                      disabled={room.available === 0}
                    >
                      {room.available > 0 ? "Book Now" : "Join Waitlist"}
                    </Button>
                    <Button variant="outline" className="font-montserrat bg-transparent">
                      Virtual Tour
                    </Button>
                  </div>
                </div>

                <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                  <Tabs defaultValue="0" className="w-full">
                    <div className="relative">
                      <img
                        src={room.images[0] || "/placeholder.svg"}
                        alt={`${room.name} main view`}
                        className="w-full h-96 object-cover rounded-lg shadow-xl"
                      />
                    </div>
                    <TabsList className="grid w-full grid-cols-3 mt-4">
                      {room.images.map((_, idx) => (
                        <TabsTrigger key={idx} value={idx.toString()} className="font-nunito">
                          {idx === 0 ? "Room" : idx === 1 ? "Bathroom" : "View"}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    {room.images.map((image, idx) => (
                      <TabsContent key={idx} value={idx.toString()}>
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`${room.name} ${idx === 0 ? "room" : idx === 1 ? "bathroom" : "view"}`}
                          className="w-full h-96 object-cover rounded-lg shadow-xl"
                        />
                      </TabsContent>
                    ))}
                  </Tabs>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-caveat text-5xl font-bold text-gray-900 mb-4">What's Included</h2>
            <p className="font-nunito text-xl text-gray-600">
              Every room comes with these essential amenities at no extra cost
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-lagos-blue-green/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Bath className="h-8 w-8 text-lagos-blue-green" />
              </div>
              <h3 className="font-montserrat text-lg font-semibold mb-2">Private Bathroom</h3>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-lagos-pink/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Bath className="h-8 w-8 text-lagos-pink" />
              </div>
              <h3 className="font-montserrat text-lg font-semibold mb-2">Desk & Chair</h3>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-lagos-amber/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Bath className="h-8 w-8 text-lagos-amber" />
              </div>
              <h3 className="font-montserrat text-lg font-semibold mb-2">Large, comfy Bed</h3>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-lagos-aquamarine/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Wifi className="h-8 w-8 text-lagos-aquamarine" />
              </div>
              <h3 className="font-montserrat text-lg font-semibold mb-2">WiFi</h3>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-lagos-blue-green/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shirt className="h-8 w-8 text-lagos-blue-green" />
              </div>
              <h3 className="font-montserrat text-lg font-semibold mb-2">Towels & Sheets</h3>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-lagos-pink/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Bath className="h-8 w-8 text-lagos-pink" />
              </div>
              <h3 className="font-montserrat text-lg font-semibold mb-2">Hair Dryer</h3>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-lagos-amber/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Bath className="h-8 w-8 text-lagos-amber" />
              </div>
              <h3 className="font-montserrat text-lg font-semibold mb-2">Cleaning Service</h3>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-lagos-aquamarine/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <AirVent className="h-8 w-8 text-lagos-aquamarine" />
              </div>
              <h3 className="font-montserrat text-lg font-semibold mb-2">AC / Heater</h3>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-lagos-pink/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Bath className="h-8 w-8 text-lagos-pink" />
              </div>
              <h3 className="font-montserrat text-lg font-semibold mb-2">Flatscreen TV</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-caveat text-5xl font-bold text-gray-900 mb-4">Compare Rooms</h2>
            <p className="font-nunito text-xl text-gray-600">
              Find the perfect room that matches your needs and budget
            </p>
          </div>

          <Card className="border-0 shadow-xl overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-montserrat font-semibold">Features</TableHead>
                      <TableHead className="font-montserrat font-semibold text-center">Ocean View Suite</TableHead>
                      <TableHead className="font-montserrat font-semibold text-center">Garden Room</TableHead>
                      <TableHead className="font-montserrat font-semibold text-center">Standard Room</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="bg-lagos-aquamarine/10">
                      <TableCell className="font-montserrat font-semibold">Monthly Price</TableCell>
                      <TableCell className="text-center font-nunito font-bold text-lagos-blue-green">€850</TableCell>
                      <TableCell className="text-center font-nunito font-bold text-lagos-blue-green">€650</TableCell>
                      <TableCell className="text-center font-nunito font-bold text-lagos-blue-green">€550</TableCell>
                    </TableRow>
                    {comparisonFeatures.map((feature, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-nunito font-medium">{feature}</TableCell>
                        <TableCell className="text-center font-nunito">
                          {comparisonData["Ocean View Suite"][index]}
                        </TableCell>
                        <TableCell className="text-center font-nunito">
                          {comparisonData["Garden Room"][index]}
                        </TableCell>
                        <TableCell className="text-center font-nunito">
                          {comparisonData["Standard Room"][index]}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Availability Calendar Preview */}
      <section className="py-20 bg-lagos-aquamarine/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-caveat text-5xl font-bold text-gray-900 mb-4">Check Availability</h2>
            <p className="font-nunito text-xl text-gray-600">See real-time availability and book your perfect room</p>
          </div>

          <Card className="border-0 shadow-xl">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600 font-montserrat mb-2">2</div>
                  <div className="font-nunito text-gray-600">Ocean Suites Available</div>
                </div>
                <div className="text-center p-6 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600 font-montserrat mb-2">3</div>
                  <div className="font-nunito text-gray-600">Garden Rooms Available</div>
                </div>
                <div className="text-center p-6 bg-red-50 rounded-lg">
                  <div className="text-3xl font-bold text-red-600 font-montserrat mb-2">0</div>
                  <div className="font-nunito text-gray-600">Standard Rooms (Waitlist)</div>
                </div>
              </div>

              <div className="text-center">
                <Calendar className="h-16 w-16 text-lagos-blue-green mx-auto mb-6" />
                <h3 className="font-montserrat text-2xl font-semibold mb-4">Interactive Calendar</h3>
                <p className="font-nunito text-gray-600 mb-6">
                  Select your check-in and check-out dates to see detailed availability and pricing
                </p>
                <Button size="lg" className="bg-lagos-pink hover:bg-lagos-pink/90 text-white font-montserrat">
                  Open Calendar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-caveat text-5xl font-bold text-gray-900 mb-4">What Our Residents Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-lagos-amber fill-current" />
                  ))}
                </div>
                <p className="font-nunito text-gray-600 mb-6 leading-relaxed">
                  "The Ocean View Suite is absolutely stunning. Waking up to ocean views every morning has been
                  incredible!"
                </p>
                <div className="flex items-center">
                  <img src="/happy-resident-woman.png" alt="Maria" className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <div className="font-montserrat font-semibold">Maria Santos</div>
                    <div className="font-nunito text-sm text-gray-500">Ocean View Suite</div>
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
                <p className="font-nunito text-gray-600 mb-6 leading-relaxed">
                  "Perfect balance of privacy and community. The Garden Room is my peaceful sanctuary."
                </p>
                <div className="flex items-center">
                  <img src="/happy-resident-man.png" alt="Tom" className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <div className="font-montserrat font-semibold">Tom Wilson</div>
                    <div className="font-nunito text-sm text-gray-500">Garden Room</div>
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
                <p className="font-nunito text-gray-600 mb-6 leading-relaxed">
                  "Great value for money. Everything I need for comfortable living at an affordable price."
                </p>
                <div className="flex items-center">
                  <img src="/happy-resident-young-woman.png" alt="Lisa" className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <div className="font-montserrat font-semibold">Lisa Chen</div>
                    <div className="font-nunito text-sm text-gray-500">Standard Room</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-lagos-blue-green to-lagos-pink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-caveat text-5xl font-bold text-white mb-4">Find Your Perfect Room</h2>
          <p className="font-nunito text-xl text-white/90 mb-8 text-balance">
            Book your ideal space in our beautiful Lagos coliving community
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-lagos-blue-green hover:bg-white/90 font-montserrat text-lg px-8 py-3"
            >
              <Link href="/join">Book Your Room</Link>
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
