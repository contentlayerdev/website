import {
  HomeCommunity,
  HomeFeatures,
  HomeHero,
  HomeHowItWorks,
  HomeIntegrations,
  HomePlayground,
  HomeTestimonial,
  HomeTestimonialTweets,
} from '../components/Home'

export default function HomePage() {
  return (
    <div className="bg-gray-925 min-h-full">
      <HomeHero />
      <HomeFeatures />
      <HomeTestimonial />
      <HomeHowItWorks />
      <HomePlayground />
      <HomeCommunity />
      <HomeTestimonialTweets />
      <HomeIntegrations />
    </div>
  )
}
