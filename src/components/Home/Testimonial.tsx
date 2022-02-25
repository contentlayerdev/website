import Image from 'next/image'

type HomeTestimonialData = {
  quote: string
  name: string
  subtitle: string
  imagePath: string
}

const data: HomeTestimonialData = {
  quote:
    'Laboris laborum veniam est irure incididunt Lorem do ullamco esse. Elit Lorem eu excepteur minim elit sunt adipisicing reprehenderit.',
  name: 'Alvina Walker',
  subtitle: 'Universal systemic benchmark',
  imagePath: '/images/home/fpo-avatar.jpg',
}

export function HomeTestimonial() {
  return (
    <div className="bg-gray-950 py-24">
      <div className="container mx-auto flex items-center">
        <div className="w-36 h-36 relative rounded-full overflow-hidden mr-12">
          <Image alt={data.name} src={data.imagePath} layout="fill" objectFit="cover" objectPosition="center" />
        </div>
        <blockquote>
          <p className="max-w-2xl text-2xl mb-4">&quot;{data.quote}&quot;</p>
          <cite className="not-italic">
            <span className="block mb-1 text-lg text-lime font-bold">{data.name}</span>
            <span className="block text-sm">{data.subtitle}</span>
          </cite>
        </blockquote>
      </div>
    </div>
  )
}
