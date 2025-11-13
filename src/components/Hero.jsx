import { ArrowRight } from 'lucide-react'

export default function Hero({ banners = [] }) {
  if (!banners.length) return null
  const [first] = banners
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">{first.title}</h1>
          {first.subtitle && (
            <p className="mt-3 text-white/90">{first.subtitle}</p>
          )}
          {first.cta_text && (
            <a href={first.cta_link || '#'} className="mt-6 inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-4 py-2 rounded-md hover:bg-white/90">
              {first.cta_text} <ArrowRight size={16} />
            </a>
          )}
        </div>
        <div className="rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/20">
          <img src={`${first.image}?w=1200&q=80&auto=format&fit=crop`} alt={first.title} className="w-full h-64 md:h-80 object-cover" />
        </div>
      </div>
    </section>
  )
}
