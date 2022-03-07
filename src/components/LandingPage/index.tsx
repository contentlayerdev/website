import React from 'react'
import { Header } from '../Header'
import { Hero } from './Hero'
import { Playground } from './Playground'

export const LandingPage: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="h-full pt-[57px]">
        <Hero />
        <div>Contentlayer</div>
        <Playground />
      </div>
    </div>
  )
}
