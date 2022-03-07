import type { InferGetStaticPropsType } from 'next'
import React from 'react'

import { defineStaticProps, toParams } from '../utils/next'
import { LandingPage } from '../components/LandingPage'

export const getStaticProps = defineStaticProps(async (context) => {

  return { props: { } }
})

const Page: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ }) => {

  return <LandingPage  />
}

export default Page
