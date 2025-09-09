// Archived on 2025-09-08
// This file contains the sections removed from app/coworking/page.tsx

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"
import Link from "next/link"

// Removed "Book Your Space" section
export const BookingSystemPreview = () => (
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
)

// Removed "Ready to Boost Your Productivity?" section
export const CtaSection = () => (
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
)
