// Archived on 2025-09-08
// This file contains sections removed from app/rooms/page.tsx

import { Card, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"

// Comparison data
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
  "Parking Available"
]

const comparisonData = {
  "Ocean View Suite": ["25m²", "Private", "Ocean", "✓", "✓", "Built-in wardrobe", "✓", "✓", "Premium", "✓", "✓"],
  "Garden Room": ["18m²", "Shared", "Garden", "Garden access", "✓", "Built-in", "✓", "✓", "Standard", "✓", "✓"],
  "Standard Room": ["15m²", "Shared", "City", "✗", "✓", "Basic", "✓", "✓", "Standard", "✓", "✓"],
}

// Removed "Compare Rooms" section
export const CompareRoomsSection = () => (
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
)
