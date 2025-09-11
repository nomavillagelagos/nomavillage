'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { X, FileText, MapPin, Users, Loader2, CheckCircle, AlertCircle } from 'lucide-react'

interface GuideModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function GuideModal({ isOpen, onClose }: GuideModalProps) {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus('idle')

    try {
      const response = await fetch('/api/webhook/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          source: 'guide-modal',
          metadata: {
            formType: 'guide-request',
            timestamp: new Date().toISOString(),
            requestType: 'lagos-algarve-guide'
          }
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setMessage('Perfect! Check your email for the guide.')
        setEmail('')
        // Close modal after 2 seconds on success
        setTimeout(() => {
          onClose()
        }, 2000)
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Network error. Please check your connection and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full shadow-2xl animate-in fade-in-0 zoom-in-95 duration-300">
        {/* Header */}
        <div className="relative p-6 pb-4">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-lagos-pink/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-lagos-pink" />
            </div>
            <h2 className="font-montserrat text-2xl font-bold text-gray-900 mb-2">
              Get Our Free Lagos + Coliving Guide
            </h2>
            <p className="font-nunito text-gray-600 text-sm">
              Discover insider secrets about our Coliving and Lagos and exploring the beautiful Algarve region
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-2">
          <div className="grid grid-cols-1 gap-3 mb-6">
            <div className="flex items-center gap-3 p-3 bg-lagos-aquamarine/10 rounded-lg">
              <MapPin className="h-5 w-5 text-lagos-aquamarine flex-shrink-0" />
              <div>
                <div className="font-montserrat font-semibold text-sm text-gray-900">Local Insights</div>
                <div className="font-nunito text-xs text-gray-600">Best beaches, restaurants & hidden gems in and around Lagos</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-lagos-blue-green/10 rounded-lg">
              <Users className="h-5 w-5 text-lagos-blue-green flex-shrink-0" />
              <div>
                <div className="font-montserrat font-semibold text-sm text-gray-900">Community Tips</div>
                <div className="font-nunito text-xs text-gray-600">How to make the most of Coliving life in Lagos</div>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="guide-email" className="font-montserrat text-sm">Email Address</Label>
              <Input
                id="guide-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="font-nunito"
                required
                disabled={isLoading}
                placeholder="your@email.com"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-lagos-pink hover:bg-lagos-pink/90 font-montserrat"
              disabled={isLoading || !email}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending Guide...
                </>
              ) : (
                'Get Guide'
              )}
            </Button>

            {status !== 'idle' && (
              <div className={`flex items-center gap-2 text-sm font-nunito ${
                status === 'success' ? 'text-green-600' : 'text-red-600'
              }`}>
                {status === 'success' ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <AlertCircle className="h-4 w-4" />
                )}
                {message}
              </div>
            )}
          </form>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 rounded-b-xl">
          <p className="font-nunito text-xs text-gray-500 text-center">
            No spam, just valuable insights about Lagos & the Algarve region
          </p>
        </div>
      </div>
    </div>
  )
}
