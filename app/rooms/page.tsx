"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bath, Maximize, Wifi, AirVent, Car, Utensils, Shirt, CheckCircle, Calendar, Eye, Star, X, ChevronLeft, ChevronRight, Info, Laptop, Zap, Monitor, Bed, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function RoomsPage() {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [isInfoOpen, setIsInfoOpen] = useState(false)
  const [showInfoOnCalendarOpen, setShowInfoOnCalendarOpen] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth().toString())
  const [selectedRoom, setSelectedRoom] = useState("Room 101")

  // Generate room data based on selected month
  const generateRoomsForMonth = (monthIndex: number) => {
    const currentMonth = new Date().getMonth()
    const baseRooms = [
      { id: 1, name: "Room 101" },
      { id: 2, name: "Room 102" },
      { id: 3, name: "Room 103" },
      { id: 4, name: "Room 104" },
      { id: 5, name: "Room 105" },
      { id: 6, name: "Room 201" },
      { id: 7, name: "Room 202" },
      { id: 8, name: "Room 203" },
      { id: 9, name: "Room 204" },
      { id: 10, name: "Room 205" }
    ]

    // September (month 8) is fully booked
    if (monthIndex === 8) {
      const rooms = baseRooms.map((room) => ({
        ...room,
        status: "booked"
      }))
      // Always mark Room 101 and Room 102 as available
      return rooms.map(r => (r.name === 'Room 101' || r.name === 'Room 102') ? { ...r, status: 'available' } : r)
    } else if (monthIndex === currentMonth) {
      // Current month: 2 available, 8 booked
      const rooms = baseRooms.map((room, index) => ({
        ...room,
        status: index < 2 ? "available" : "booked"
      }))
      return rooms.map(r => (r.name === 'Room 101' || r.name === 'Room 102') ? { ...r, status: 'available' } : r)
    } else if (monthIndex === currentMonth + 1) {
      // Next month: 2 available, 8 booked
      const rooms = baseRooms.map((room, index) => ({
        ...room,
        status: index < 2 ? "available" : "booked"
      }))
      return rooms.map(r => (r.name === 'Room 101' || r.name === 'Room 102') ? { ...r, status: 'available' } : r)
    } else {
      // Month after next: 50% occupation (5 available, 5 booked)
      const rooms = baseRooms.map((room, index) => ({
        ...room,
        status: index < 5 ? "available" : "booked"
      }))
      return rooms.map(r => (r.name === 'Room 101' || r.name === 'Room 102') ? { ...r, status: 'available' } : r)
    }
  }

  // Generate calendar data based on selected room and month
  const generateCalendarData = (date: Date, roomName: string) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const firstDayOfMonth = new Date(year, month, 1).getDay()
    
    const days = []
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null)
    }
    
    // Check if this room is available in the main grid
    const roomsForMonth = generateRoomsForMonth(month)
    const roomData = roomsForMonth.find(room => room.name === roomName)
    const isRoomAvailable = (roomName === 'Room 101' || roomName === 'Room 102') || roomData?.status === "available"
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isPast = new Date(year, month, day) < new Date()
      let isBooked
      
      if (isPast) {
        isBooked = true
      } else if (isRoomAvailable) {
        // If room is available in main grid, show full availability in calendar
        isBooked = false
      } else {
        // If room is booked in main grid, show limited availability
        isBooked = Math.random() < 0.8 // 80% booked
      }
      
      days.push({ day, isBooked, isPast })
    }
    
    return days
  }

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  // Use real-time date for current months only
  const today = new Date()
  const realCurrentDate = new Date(today.getFullYear(), today.getMonth(), 1)
  const currentMonthData = generateCalendarData(realCurrentDate, selectedRoom)
  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1)
  const nextMonthData = generateCalendarData(nextMonth, selectedRoom)

  // Generate room data based on selected month
  const roomsData = generateRoomsForMonth(parseInt(selectedMonth))
  const availableRoomsCount = roomsData.filter(room => room.status === "available").length

  // Get month options (September, current and next two months)
  const getMonthOptions = () => {
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    const options = []
    
    // Add September if not already included
    if (currentMonth !== 8) {
      options.push({
        value: "8",
        label: `September ${currentYear}`
      })
    }
    
    for (let i = 0; i < 3; i++) {
      const monthIndex = (currentMonth + i) % 12
      const year = currentMonth + i >= 12 ? currentYear + 1 : currentYear
      options.push({
        value: (currentMonth + i).toString(),
        label: `${monthNames[monthIndex]} ${year}`
      })
    }
    
    return options
  }
  const roomTypes = [
    {
      id: "premium-room",
      name: "Premium Room",
      price: 1480,
      size: "25m²",
      bathroom: "Private",
      view: "Premium",
      available: 2,
      images: [
        "/luxury-ocean-view-bedroom-with-balcony-2.jpg",
        "/private-bathroom-with-modern-fixtures.jpg",
        "/ocean-view-balcony-with-seatingjpg.jpg",
      ],
      features: [
        "King-size bed with premium mattress",
        "Private bathroom",
        "Work desk with ergonomic chair",
        "Air conditioning & heating",
        "Premium bed linens included",
      ],
      description: "Our premium room offers maximum comfort and luxury amenities for the discerning traveler.",
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
            backgroundImage: "url('/beautiful-coliving-rooms-showcase.jpg')",
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

                  <div className="flex flex-col mb-6">
                    <div className="flex items-baseline mb-2">
                      <span className="text-4xl font-bold text-lagos-blue-green font-montserrat">€{room.price}</span>
                      <span className="font-nunito text-gray-600 ml-2">/month</span>
                    </div>
                    <div className="flex items-baseline">
                      <span className="text-2xl font-bold text-lagos-blue-green font-montserrat">€790</span>
                      <span className="font-nunito text-gray-600 ml-2">/two weeks</span>
                    </div>
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
                      <Laptop className="h-6 w-6 text-lagos-amber mx-auto mb-2" />
                      <div className="font-montserrat font-semibold">Desk & Chair</div>
                      <div className="font-nunito text-sm text-gray-600">Workspace</div>
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
                      asChild
                      className={`font-montserrat ${
                        room.available > 0 ? "bg-lagos-pink hover:bg-lagos-pink/90" : "bg-gray-400 cursor-not-allowed"
                      }`}
                      disabled={room.available === 0}
                    >
                      <a href="#availability">{room.available > 0 ? "Book Now" : "Join Waitlist"}</a>
                    </Button>
                    <Button variant="outline" className="font-montserrat bg-transparent">
                      Get the Guide
                    </Button>
                  </div>
                </div>

                <div className={index % 2 === 1 ? "lg:col-start-1" : ""}>
                  <Tabs defaultValue="0" className="w-full">
                    {room.images.map((image, idx) => (
                      <TabsContent key={idx} value={idx.toString()}>
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`${room.name} ${idx === 0 ? "room" : idx === 1 ? "bathroom" : "view"}`}
                          className="w-full h-96 object-cover rounded-t-lg shadow-xl"
                        />
                      </TabsContent>
                    ))}
                    <TabsList className="grid w-full grid-cols-3 rounded-t-none">
                      {room.images.map((_, idx) => (
                        <TabsTrigger 
                          key={idx} 
                          value={idx.toString()} 
                          className="font-nunito rounded-t-none"
                        >
                          {idx === 0 ? "Room" : idx === 1 ? "Bathroom" : "View"}
                        </TabsTrigger>
                      ))}
                    </TabsList>
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
                <Laptop className="h-8 w-8 text-lagos-pink" />
              </div>
              <h3 className="font-montserrat text-lg font-semibold mb-2">Desk & Chair</h3>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-lagos-amber/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Bed className="h-8 w-8 text-lagos-amber" />
              </div>
              <h3 className="font-montserrat text-lg font-semibold mb-2">Large, comfy Bed (queen size)</h3>
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
                <Zap className="h-8 w-8 text-lagos-pink" />
              </div>
              <h3 className="font-montserrat text-lg font-semibold mb-2">Hair Dryer</h3>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-lagos-amber/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shirt className="h-8 w-8 text-lagos-amber" />
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
                <Monitor className="h-8 w-8 text-lagos-pink" />
              </div>
              <h3 className="font-montserrat text-lg font-semibold mb-2">Flatscreen TV</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Room Availability Grid */}
      <section id="availability" className="py-20 bg-lagos-aquamarine/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-caveat text-5xl font-bold text-gray-900 mb-4">Room Availability</h2>
            <p className="font-nunito text-xl text-gray-600">Current room status for this month</p>
          </div>

          <Card className="border-0 shadow-xl">
            <CardContent className="p-8">
              {/* Booking Information */}
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-lagos-blue-green mt-0.5 flex-shrink-0" />
                  <p className="font-nunito text-gray-700 leading-relaxed">
                    <strong>Important:</strong> Rooms can only be booked after a short call with our team. This helps us ensure the perfect match for your stay and answer any questions you might have.
                  </p>
                </div>
              </div>
              {/* Month Selector and Available Count */}
              <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                <div className="flex items-center gap-4">
                  <label className="font-montserrat font-semibold text-gray-700">Select Month:</label>
                  <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {getMonthOptions().map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 font-montserrat mb-1">{availableRoomsCount}</div>
                  <div className="font-nunito text-gray-600 text-sm">Rooms Available</div>
                </div>
              </div>

              {/* Room Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-8">
                {roomsData.map((room) => (
                  <div
                    key={room.id}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      room.status === "available"
                        ? "bg-green-50 border-green-200 hover:bg-green-100"
                        : "bg-red-50 border-red-200 opacity-75"
                    }`}
                  >
                    <div className="text-center">
                      <div className="font-montserrat font-bold text-lg mb-2">{room.name}</div>
                      <div
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          room.status === "available"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {room.status === "available" ? "Available" : "Booked"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-100 border-2 border-green-200 rounded"></div>
                  <span className="font-nunito text-sm text-gray-600">Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-100 border-2 border-red-200 rounded"></div>
                  <span className="font-nunito text-sm text-gray-600">Booked</span>
                </div>
              </div>

              <div className="text-center">
                <Button 
                  size="lg" 
                  className="bg-lagos-pink hover:bg-lagos-pink/90 text-white font-montserrat"
                  onClick={() => {
                    setIsCalendarOpen(true)
                    setShowInfoOnCalendarOpen(true)
                  }}
                >
                  View Detailed Calendar
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
                  <img src="/young-woman-smiling.webp" alt="Maria" className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <div className="font-montserrat font-semibold">Fabienne</div>
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
                  <img src="/young-bearded-man-headshot.webp" alt="Tom" className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <div className="font-montserrat font-semibold">Bart</div>
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
                  <img src="/professional-headshot-of-young-woman-with-curly-ha.webp" alt="Lisa" className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <div className="font-montserrat font-semibold">Kiki</div>
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

      {/* Calendar Modal */}
      {isCalendarOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-caveat text-3xl font-bold text-gray-900">Select Your Dates</h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => {
                    setIsCalendarOpen(false)
                    setShowInfoOnCalendarOpen(false)
                  }}
                  className="p-2"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Room Selector */}
              <div className="mb-6">
                <div className="flex items-center gap-4">
                  <label className="font-montserrat font-semibold text-gray-700">Viewing Room:</label>
                  <Select value={selectedRoom} onValueChange={setSelectedRoom}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        { name: "Room 101" }, { name: "Room 102" }, { name: "Room 103" },
                        { name: "Room 104" }, { name: "Room 105" }, { name: "Room 201" },
                        { name: "Room 202" }, { name: "Room 203" }, { name: "Room 204" },
                        { name: "Room 205" }
                      ].map((room) => {
                        const isExplicitlyAvailable = room.name === "Room 101" || room.name === "Room 102";
                        const label = isExplicitlyAvailable ? "Available" : "Booked";
                        return (
                          <SelectItem key={room.name} value={room.name}>
                            {room.name} ({label})
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Booking Information Modal inside Calendar */}
              {showInfoOnCalendarOpen && (
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-montserrat text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <Info className="h-5 w-5 text-lagos-blue-green" />
                      Booking Information
                    </h3>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => setShowInfoOnCalendarOpen(false)}
                      className="p-1 h-6 w-6"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="font-nunito text-gray-600 leading-relaxed">
                    Rooms can only be booked after a short call with our team. This helps us ensure the perfect match for your stay and answer any questions you might have.
                  </p>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Current Month */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-montserrat text-xl font-semibold">
                      {monthNames[realCurrentDate.getMonth()]} {realCurrentDate.getFullYear()}
                    </h3>
                  </div>
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="text-center text-sm font-medium text-gray-500 p-2">
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {currentMonthData.map((dayData, index) => (
                      <div key={index} className="aspect-square">
                        {dayData ? (
                          <button
                            className={`w-full h-full text-sm rounded-md transition-colors ${
                              dayData.isBooked
                                ? 'bg-red-100 text-red-800 cursor-not-allowed'
                                : 'bg-green-100 text-green-800 hover:bg-green-200'
                            } ${dayData.isPast ? 'opacity-50' : ''}`}
                            disabled={dayData.isBooked}
                          >
                            {dayData.day}
                          </button>
                        ) : (
                          <div className="w-full h-full"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Next Month */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-montserrat text-xl font-semibold">
                      {monthNames[nextMonth.getMonth()]} {nextMonth.getFullYear()}
                    </h3>
                  </div>
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="text-center text-sm font-medium text-gray-500 p-2">
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {nextMonthData.map((dayData, index) => (
                      <div key={index} className="aspect-square">
                        {dayData ? (
                          <button
                            className={`w-full h-full text-sm rounded-md transition-colors ${
                              dayData.isBooked
                                ? 'bg-red-100 text-red-800 cursor-not-allowed'
                                : 'bg-green-100 text-green-800 hover:bg-green-200'
                            }`}
                            disabled={dayData.isBooked}
                          >
                            {dayData.day}
                          </button>
                        ) : (
                          <div className="w-full h-full"></div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                </div>
              </div>
              
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-green-100 rounded mr-2"></div>
                    <span>Available</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-red-100 rounded mr-2"></div>
                    <span>Booked</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => setShowInfoOnCalendarOpen(!showInfoOnCalendarOpen)}
                    className="flex items-center gap-2"
                  >
                    <Info className="h-4 w-4" />
                    {showInfoOnCalendarOpen ? 'Hide Info' : 'Show Info'}
                  </Button>
                  <Button 
                    onClick={() => {
                      setIsCalendarOpen(false)
                      setShowInfoOnCalendarOpen(false)
                    }}
                    className="bg-lagos-pink hover:bg-lagos-pink/90"
                  >
                    Close Calendar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Info Modal */}
      {isInfoOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-montserrat text-xl font-semibold text-gray-900">Booking Information</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsInfoOpen(false)}
                className="p-2"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-lagos-blue-green mt-0.5 flex-shrink-0" />
              <p className="font-nunito text-gray-600 leading-relaxed">
                Rooms can only be booked after a short call with our team. This helps us ensure the perfect match for your stay and answer any questions you might have.
              </p>
            </div>
            <div className="mt-6 flex justify-end">
              <Button 
                onClick={() => setIsInfoOpen(false)}
                className="bg-lagos-pink hover:bg-lagos-pink/90"
              >
                Got it
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
