import Link from "next/link"
import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-lagos-blue-green rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">L</span>
              </div>
              <span className="font-caveat text-2xl font-bold text-lagos-blue-green">Lagos Living</span>
            </Link>
            <p className="font-nunito text-gray-600 mb-4 max-w-md">
              Experience the perfect blend of work and life in beautiful Lagos, Portugal. Join our vibrant community of
              digital nomads and remote workers.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-lagos-pink transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-lagos-pink transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-montserrat font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["Coliving", "Coworking", "Rooms", "Community", "Join Us"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(" ", "-")}`}
                    className="font-nunito text-gray-600 hover:text-lagos-blue-green transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-montserrat font-semibold text-gray-900 mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-lagos-amber" />
                <span className="font-nunito text-gray-600 text-sm">Lagos, Portugal</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-lagos-amber" />
                <span className="font-nunito text-gray-600 text-sm">+351 XXX XXX XXX</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-lagos-amber" />
                <span className="font-nunito text-gray-600 text-sm">hello@lagosliving.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8">
          <p className="font-nunito text-center text-gray-500 text-sm">© 2024 Lagos Living. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
