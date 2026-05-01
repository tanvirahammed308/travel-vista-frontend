import Carousel from '@/components/home/hero/Carousel'
import HowItWorks from '@/components/home/howItWorks/HowItWorks'
import Location from '@/components/home/location/Location'
import Popular from '@/components/home/popular/Popular'
import Price from '@/components/home/price/Price'
import Special from '@/components/home/specialOffer/Special'
import Subscribe from '@/components/home/subscribe/Subscribe'
import Transport from '@/components/home/transport/Transport'

const HomePage = () => {
  return (
    <div>
      <Carousel />
      <Location/>
      <Popular />
      <Special />
      <Transport />
      <Price />
      <HowItWorks />
      <Subscribe/>
    </div>
  )
}

export default HomePage