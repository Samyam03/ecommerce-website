import React from 'react'
import Banner from '../components/Banner'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import Policy from '../components/Policy'
import NewsLetterBox from '../components/NewsLetterBox'

const Home = () => {
  return (
    <div>
      <Banner/>
      <LatestCollection/>
      <BestSeller/>
      <Policy/>
      <NewsLetterBox />
    </div>
  )
}

export default Home
