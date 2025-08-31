"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, CreditCard, Shield, Users, Wifi, Heart } from "lucide-react"

export default function JoinPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nationality: "",
    dateOfBirth: "",

    // Stay Preferences
    roomType: "",
    moveInDate: "",
    stayDuration: "",

    // Work & Lifestyle
    occupation: "",
    workDescription: "",
    remoteWork: "",
    interests: [],

    // References
    reference1Name: "",
    reference1Email: "",
    reference2Name: "",
    reference2Email: "",

    // Special Requirements
    dietaryRestrictions: "",
    allergies: "",
    specialRequests: "",

    // Agreement
    termsAccepted: false,
    privacyAccepted: false,
  })

  const whyChooseUs = [
    {
      icon: Users,
      title: "Vibrant Community",
      description: "Connect with 50+ international professionals and digital nomads",
    },
    {
      icon: Wifi,
      title: "Premium Workspace",
      description: "High-speed internet, ergonomic furniture, and quiet zones",
    },
    {
      icon: Heart,
      title: "Coastal Lifestyle",
      description: "Minutes from stunning beaches and Portuguese culture",
    },
    {
      icon: Shield,
      title: "All-Inclusive",
      description: "Utilities, cleaning, events, and amenities included",
    },
  ]

  const roomPricing = [
    { name: "Standard Room", price: 550, features: ["15m²", "Shared bathroom", "City view", "Basic furnishing"] },
    { name: "Garden Room", price: 650, features: ["18m²", "Shared bathroom", "Garden view", "Premium furnishing"] },
    { name: "Ocean Suite", price: 850, features: ["25m²", "Private bathroom", "Ocean view", "Luxury furnishing"] },
  ]

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/application-form-hero-image.png')",
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="font-caveat text-6xl md:text-7xl font-bold mb-4">Join Our Community</h1>
          <p className="font-nunito text-xl md:text-2xl text-balance">
            Start your journey to the perfect work-life balance in Lagos
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-lagos-aquamarine/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-caveat text-5xl font-bold text-gray-900 mb-4">Why Choose Lagos Living?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <Card key={index} className="border-0 shadow-lg text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-lagos-blue-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <item.icon className="h-8 w-8 text-lagos-blue-green" />
                  </div>
                  <h3 className="font-montserrat text-xl font-semibold mb-4">{item.title}</h3>
                  <p className="font-nunito text-gray-600 leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-caveat text-5xl font-bold text-gray-900 mb-4">Application Form</h2>
            <p className="font-nunito text-xl text-gray-600">
              Tell us about yourself so we can find your perfect match
            </p>
          </div>

          <Card className="border-0 shadow-xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-montserrat text-2xl">Step {currentStep} of 5</CardTitle>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((step) => (
                    <div
                      key={step}
                      className={`w-3 h-3 rounded-full ${step <= currentStep ? "bg-lagos-pink" : "bg-gray-300"}`}
                    />
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h3 className="font-montserrat text-xl font-semibold mb-6">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName" className="font-nunito">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        className="font-nunito"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="font-nunito">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        className="font-nunito"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="font-nunito">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="font-nunito"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="font-nunito">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="font-nunito"
                      />
                    </div>
                    <div>
                      <Label htmlFor="nationality" className="font-nunito">
                        Nationality
                      </Label>
                      <Select onValueChange={(value) => handleInputChange("nationality", value)}>
                        <SelectTrigger className="font-nunito">
                          <SelectValue placeholder="Select your nationality" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="de">Germany</SelectItem>
                          <SelectItem value="fr">France</SelectItem>
                          <SelectItem value="es">Spain</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="dateOfBirth" className="font-nunito">
                        Date of Birth
                      </Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                        className="font-nunito"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Stay Preferences */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h3 className="font-montserrat text-xl font-semibold mb-6">Stay Preferences</h3>
                  <div>
                    <Label className="font-nunito mb-4 block">Preferred Room Type</Label>
                    <RadioGroup
                      value={formData.roomType}
                      onValueChange={(value) => handleInputChange("roomType", value)}
                    >
                      {roomPricing.map((room) => (
                        <div key={room.name} className="flex items-center space-x-3 p-4 border rounded-lg">
                          <RadioGroupItem value={room.name} id={room.name} />
                          <div className="flex-1">
                            <Label htmlFor={room.name} className="font-montserrat font-semibold cursor-pointer">
                              {room.name} - €{room.price}/month
                            </Label>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {room.features.map((feature, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="moveInDate" className="font-nunito">
                        Preferred Move-in Date
                      </Label>
                      <Input
                        id="moveInDate"
                        type="date"
                        value={formData.moveInDate}
                        onChange={(e) => handleInputChange("moveInDate", e.target.value)}
                        className="font-nunito"
                      />
                    </div>
                    <div>
                      <Label htmlFor="stayDuration" className="font-nunito">
                        Expected Stay Duration
                      </Label>
                      <Select onValueChange={(value) => handleInputChange("stayDuration", value)}>
                        <SelectTrigger className="font-nunito">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-3">1-3 months</SelectItem>
                          <SelectItem value="3-6">3-6 months</SelectItem>
                          <SelectItem value="6-12">6-12 months</SelectItem>
                          <SelectItem value="12+">12+ months</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Work & Lifestyle */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h3 className="font-montserrat text-xl font-semibold mb-6">Work & Lifestyle</h3>
                  <div>
                    <Label htmlFor="occupation" className="font-nunito">
                      Occupation/Job Title
                    </Label>
                    <Input
                      id="occupation"
                      value={formData.occupation}
                      onChange={(e) => handleInputChange("occupation", e.target.value)}
                      className="font-nunito"
                    />
                  </div>
                  <div>
                    <Label htmlFor="workDescription" className="font-nunito">
                      Describe your work and what you do
                    </Label>
                    <Textarea
                      id="workDescription"
                      value={formData.workDescription}
                      onChange={(e) => handleInputChange("workDescription", e.target.value)}
                      className="font-nunito"
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label className="font-nunito mb-4 block">Do you work remotely?</Label>
                    <RadioGroup
                      value={formData.remoteWork}
                      onValueChange={(value) => handleInputChange("remoteWork", value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="full-time" id="full-time" />
                        <Label htmlFor="full-time" className="font-nunito">
                          Full-time remote
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="hybrid" id="hybrid" />
                        <Label htmlFor="hybrid" className="font-nunito">
                          Hybrid (some remote)
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="freelance" id="freelance" />
                        <Label htmlFor="freelance" className="font-nunito">
                          Freelance/Consultant
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="entrepreneur" id="entrepreneur" />
                        <Label htmlFor="entrepreneur" className="font-nunito">
                          Entrepreneur
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div>
                    <Label className="font-nunito mb-4 block">Interests & Hobbies (select all that apply)</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {[
                        "Surfing",
                        "Yoga",
                        "Hiking",
                        "Photography",
                        "Cooking",
                        "Music",
                        "Art",
                        "Languages",
                        "Fitness",
                      ].map((interest) => (
                        <div key={interest} className="flex items-center space-x-2">
                          <Checkbox
                            id={interest}
                            checked={formData.interests.includes(interest)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                handleInputChange("interests", [...formData.interests, interest])
                              } else {
                                handleInputChange(
                                  "interests",
                                  formData.interests.filter((i) => i !== interest),
                                )
                              }
                            }}
                          />
                          <Label htmlFor={interest} className="font-nunito text-sm">
                            {interest}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: References */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <h3 className="font-montserrat text-xl font-semibold mb-6">References</h3>
                  <p className="font-nunito text-gray-600 mb-6">
                    Please provide two references who can speak to your character and reliability.
                  </p>
                  <div className="space-y-8">
                    <div>
                      <h4 className="font-montserrat font-semibold mb-4">Reference 1</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="reference1Name" className="font-nunito">
                            Full Name
                          </Label>
                          <Input
                            id="reference1Name"
                            value={formData.reference1Name}
                            onChange={(e) => handleInputChange("reference1Name", e.target.value)}
                            className="font-nunito"
                          />
                        </div>
                        <div>
                          <Label htmlFor="reference1Email" className="font-nunito">
                            Email Address
                          </Label>
                          <Input
                            id="reference1Email"
                            type="email"
                            value={formData.reference1Email}
                            onChange={(e) => handleInputChange("reference1Email", e.target.value)}
                            className="font-nunito"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-montserrat font-semibold mb-4">Reference 2</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="reference2Name" className="font-nunito">
                            Full Name
                          </Label>
                          <Input
                            id="reference2Name"
                            value={formData.reference2Name}
                            onChange={(e) => handleInputChange("reference2Name", e.target.value)}
                            className="font-nunito"
                          />
                        </div>
                        <div>
                          <Label htmlFor="reference2Email" className="font-nunito">
                            Email Address
                          </Label>
                          <Input
                            id="reference2Email"
                            type="email"
                            value={formData.reference2Email}
                            onChange={(e) => handleInputChange("reference2Email", e.target.value)}
                            className="font-nunito"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Final Details */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <h3 className="font-montserrat text-xl font-semibold mb-6">Final Details</h3>
                  <div>
                    <Label htmlFor="dietaryRestrictions" className="font-nunito">
                      Dietary Restrictions or Preferences
                    </Label>
                    <Input
                      id="dietaryRestrictions"
                      value={formData.dietaryRestrictions}
                      onChange={(e) => handleInputChange("dietaryRestrictions", e.target.value)}
                      className="font-nunito"
                      placeholder="e.g., Vegetarian, Vegan, Gluten-free"
                    />
                  </div>
                  <div>
                    <Label htmlFor="allergies" className="font-nunito">
                      Allergies
                    </Label>
                    <Input
                      id="allergies"
                      value={formData.allergies}
                      onChange={(e) => handleInputChange("allergies", e.target.value)}
                      className="font-nunito"
                      placeholder="Any allergies we should know about"
                    />
                  </div>
                  <div>
                    <Label htmlFor="specialRequests" className="font-nunito">
                      Special Requests or Additional Information
                    </Label>
                    <Textarea
                      id="specialRequests"
                      value={formData.specialRequests}
                      onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                      className="font-nunito"
                      rows={4}
                      placeholder="Anything else you'd like us to know?"
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="terms"
                        checked={formData.termsAccepted}
                        onCheckedChange={(checked) => handleInputChange("termsAccepted", checked)}
                      />
                      <Label htmlFor="terms" className="font-nunito text-sm leading-relaxed">
                        I agree to the Terms and Conditions and House Rules of Lagos Living
                      </Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="privacy"
                        checked={formData.privacyAccepted}
                        onCheckedChange={(checked) => handleInputChange("privacyAccepted", checked)}
                      />
                      <Label htmlFor="privacy" className="font-nunito text-sm leading-relaxed">
                        I agree to the Privacy Policy and consent to the processing of my personal data
                      </Label>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="font-montserrat bg-transparent"
                >
                  Previous
                </Button>
                {currentStep < 5 ? (
                  <Button onClick={nextStep} className="bg-lagos-pink hover:bg-lagos-pink/90 font-montserrat">
                    Next Step
                  </Button>
                ) : (
                  <Button
                    className="bg-lagos-blue-green hover:bg-lagos-blue-green/90 font-montserrat"
                    disabled={!formData.termsAccepted || !formData.privacyAccepted}
                  >
                    Submit Application
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing Calculator */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-caveat text-5xl font-bold text-gray-900 mb-4">Pricing Calculator</h2>
            <p className="font-nunito text-xl text-gray-600">
              Calculate your monthly costs with our transparent pricing
            </p>
          </div>

          <Tabs defaultValue="monthly" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="monthly" className="font-montserrat">
                Monthly Pricing
              </TabsTrigger>
              <TabsTrigger value="payment" className="font-montserrat">
                Payment Options
              </TabsTrigger>
            </TabsList>

            <TabsContent value="monthly" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {roomPricing.map((room, index) => (
                  <Card key={index} className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="font-montserrat text-xl">{room.name}</CardTitle>
                      <div className="flex items-baseline">
                        <span className="text-3xl font-bold text-lagos-blue-green font-montserrat">€{room.price}</span>
                        <span className="font-nunito text-gray-600 ml-1">/month</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {room.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center font-nunito text-gray-600">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <div className="font-nunito text-sm text-gray-600">
                          <div className="flex justify-between">
                            <span>Monthly rent:</span>
                            <span>€{room.price}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Security deposit:</span>
                            <span>€{room.price}</span>
                          </div>
                          <div className="flex justify-between font-semibold border-t pt-2 mt-2">
                            <span>Total upfront:</span>
                            <span>€{room.price * 2}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="payment" className="mt-8">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-montserrat text-xl font-semibold mb-4">Accepted Payment Methods</h3>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <CreditCard className="h-6 w-6 text-lagos-blue-green" />
                          <span className="font-nunito">Credit/Debit Cards (Visa, Mastercard)</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <CreditCard className="h-6 w-6 text-lagos-blue-green" />
                          <span className="font-nunito">Bank Transfer (SEPA)</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <CreditCard className="h-6 w-6 text-lagos-blue-green" />
                          <span className="font-nunito">PayPal</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-montserrat text-xl font-semibold mb-4">Payment Schedule</h3>
                      <div className="space-y-3 font-nunito text-gray-600">
                        <div>• First month rent + security deposit due upon booking</div>
                        <div>• Monthly rent due on the 1st of each month</div>
                        <div>• Security deposit refunded within 30 days of checkout</div>
                        <div>• 3+ month stays receive 5% discount</div>
                        <div>• 6+ month stays receive 10% discount</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  )
}
