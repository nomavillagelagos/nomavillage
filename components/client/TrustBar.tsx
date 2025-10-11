export function TrustBar() {

  return (
    <section
      className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-y border-gray-700"
    >
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-white/90">
          <div className="flex items-center gap-2 text-sm font-nunito">
            <span className="text-lg">⭐</span>
            <span>4.8 on Google</span>
          </div>
          <div className="hidden sm:block text-white/30">•</div>
          <div className="flex items-center gap-2 text-sm font-nunito">
            <span className="text-lg">🏠</span>
            <span>Private Rooms</span>
          </div>
          <div className="hidden sm:block text-white/30">•</div>
          <div className="flex items-center gap-2 text-sm font-nunito">
            <span className="text-lg">💻</span>
            <span>Dedicated Coworking</span>
          </div>
          <div className="hidden sm:block text-white/30">•</div>
          <div className="flex items-center gap-2 text-sm font-nunito">
            <span className="text-lg">🌍</span>
            <span>International Community</span>
          </div>
          <div className="hidden sm:block text-white/30">•</div>
          <div className="flex items-center gap-2 text-sm font-nunito">
            <span className="text-lg">🏖️</span>
            <span>Beach Lifestyle</span>
          </div>
        </div>
      </div>
    </section>
  )
}
