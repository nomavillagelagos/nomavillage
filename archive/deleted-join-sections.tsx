// Archived on 2025-09-09
// This file contains the "Inquire Now" section removed from app/join/page.tsx

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

type FormData = {
  // Personal Information
  firstName: string
  lastName: string
  email: string
  phone: string

  // Stay Preferences
  roomType: string
  moveInDate: string
  stayDuration: string
  yogaSurfOctober: boolean

  // Work & Lifestyle
  occupation: string
  workDescription: string
  remoteWork: string
  interests: string[]

  // Special Requirements
  dietaryRestrictions: string
  allergies: string
  specialRequests: string

  // Agreement
  termsAccepted: boolean
  privacyAccepted: boolean
}

// Removed "Inquire Now" Application Form section
export const InquireNowForm = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",

    // Stay Preferences
    roomType: "",
    moveInDate: "",
    stayDuration: "",
    yogaSurfOctober: false,

    // Work & Lifestyle
    occupation: "",
    workDescription: "",
    remoteWork: "",
    interests: [],

    // Special Requirements
    dietaryRestrictions: "",
    allergies: "",
    specialRequests: "",

    // Agreement
    termsAccepted: false,
    privacyAccepted: false,
  })

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-caveat text-5xl font-bold text-gray-900 mb-4">Inquire Now</h2>
          <p className="font-nunito text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Ready to join our community? Send us your details and let's start the conversation. We carefully curate our community to ensure the perfect vibe for everyone.
          </p>
        </div>

        <Card className="border-0 shadow-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-montserrat text-2xl">Step {currentStep} of 3</CardTitle>
              <div className="flex space-x-2">
                {[1, 2, 3].map((step) => (
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
                </div>
              </div>
            )}

            {/* Step 2: Stay Preferences */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="font-montserrat text-xl font-semibold mb-6">Stay Preferences</h3>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg bg-gray-50">
                    <div className="flex items-start justify-between gap-4">
                      <div className="text-left">
                        <div className="font-montserrat font-semibold">October Yoga + Surf Colive</div>
                        <div className="font-nunito text-sm text-gray-600">From 790€</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="yoga-surf-october-790"
                          checked={formData.yogaSurfOctober}
                          onCheckedChange={(checked) => handleInputChange("yogaSurfOctober", checked === true)}
                        />
                        <Label htmlFor="yoga-surf-october-790" className="font-nunito">I want to join this program</Label>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg bg-gray-50">
                    <div className="flex items-start justify-between gap-4">
                      <div className="text-left">
                        <div className="font-montserrat font-semibold">October Yoga + Surf Colive</div>
                        <div className="font-nunito text-sm text-gray-600">1490€ per month</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="yoga-surf-october-1490"
                          checked={formData.yogaSurfOctober}
                          onCheckedChange={(checked) => handleInputChange("yogaSurfOctober", checked === true)}
                        />
                        <Label htmlFor="yoga-surf-october-1490" className="font-nunito">I want to join this program</Label>
                      </div>
                    </div>
                  </div>
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
                        <SelectItem value="two-weeks">Two weeks</SelectItem>
                        <SelectItem value="one-month">One month</SelectItem>
                        <SelectItem value="six-weeks">Six weeks</SelectItem>
                        <SelectItem value="two-months">Two months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Work & Lifestyle + Final Details */}
            {currentStep === 3 && (
              <div className="space-y-8">
                <div className="space-y-6">
                  <h3 className="font-montserrat text-xl font-semibold mb-6">Work & Lifestyle</h3>
                  <div>
                    <Label htmlFor="occupation" className="font-nunito mb-2">
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
                    <Label htmlFor="workDescription" className="font-nunito mb-2">
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
                              if (checked === true) {
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

                {/* Additional Information */}
                <div className="space-y-6 pt-0">
                  <div>
                    <Label htmlFor="specialRequests" className="font-nunito mb-2">
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
                        I agree to the Terms and Conditions and House Rules of Noma Village
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
              {currentStep < 3 ? (
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
  )
}
