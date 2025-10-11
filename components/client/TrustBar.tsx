export function TrustBar() {

  return (
    <section
      className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-y border-gray-700"
    >
      <div className="max-w-6xl mx-auto px-4 py-3 md:py-5">
        <div className="flex flex-wrap items-center justify-center gap-x-4 md:gap-x-8 gap-y-0 text-white/90">
          {/* Individual items with staggered animation */}
          <div className="flex items-center gap-2 text-sm font-nunito animate-fade-in" style={{animationDelay: '100ms', animationFillMode: 'backwards'}}>
            <span className="text-lg">⭐</span>
            <span>4.8 on Google</span>
          </div>
          <div className="hidden sm:block text-white/30 animate-fade-in" style={{animationDelay: '200ms', animationFillMode: 'backwards'}}>•</div>
          <div className="flex items-center gap-2 text-sm font-nunito animate-fade-in" style={{animationDelay: '300ms', animationFillMode: 'backwards'}}>
            <span className="text-lg">🏠</span>
            <span>Private Rooms</span>
          </div>
          <div className="hidden sm:block text-white/30 animate-fade-in" style={{animationDelay: '400ms', animationFillMode: 'backwards'}}>•</div>
          <div className="flex items-center gap-2 text-sm font-nunito animate-fade-in" style={{animationDelay: '500ms', animationFillMode: 'backwards'}}>
            <span className="text-lg">💻</span>
            <span>Dedicated Coworking</span>
          </div>
          <div className="hidden sm:block text-white/30 animate-fade-in" style={{animationDelay: '600ms', animationFillMode: 'backwards'}}>•</div>
          <div className="flex items-center gap-2 text-sm font-nunito animate-fade-in" style={{animationDelay: '700ms', animationFillMode: 'backwards'}}>
            <span className="text-lg">🌍</span>
            <span>International Community</span>
          </div>
          <div className="hidden sm:block text-white/30 animate-fade-in" style={{animationDelay: '800ms', animationFillMode: 'backwards'}}>•</div>
          <div className="flex items-center gap-2 text-sm font-nunito animate-fade-in" style={{animationDelay: '900ms', animationFillMode: 'backwards'}}>
            <span className="text-lg">🏖️</span>
            <span>Beach Lifestyle</span>
          </div>
        </div>
      </div>
    </section>
  )
}
