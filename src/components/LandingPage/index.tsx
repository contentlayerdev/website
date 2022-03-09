import React from 'react'
import { Header } from '../Header'
import { Hero } from './Hero'
import { Support } from './Support'
import { Testimonials } from './Testimonials'
import { Features } from './Features'
import { type CodeSnippets, HowItWorks } from './HowItWorks'
import { Playground } from './Playground'

export const LandingPage: React.FC<{ codeSnippets: CodeSnippets; usedByCount: number }> = ({
  codeSnippets,
  usedByCount,
}) => {
  return (
    <div>
      <Header />
      <div className="h-full pt-[57px]">
        <Hero />
        <Support />
        <Testimonials usedByCount={usedByCount} />
        <Features />
        <HowItWorks codeSnippets={codeSnippets} />
        <hr className="my-64" />
        <Playground />
      </div>
    </div>
  )
}
