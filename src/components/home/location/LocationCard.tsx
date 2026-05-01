import Image, { StaticImageData } from 'next/image'

type Props = {
  item: {
      title: string,
    location: string,
    cities: string,
    places: string,
    image: string

   }
}

const LocationCard = ({item}:Props) => {
  return (
    <div className='group rounded-2xl overflow-hidden shadow-md'>
      {/* Image */}
      <div className='relative w-full h-60'>
        <Image fill src={item.image} alt={item.title} className='object-cover w-full h-full transition duration-500 group-hover:scale-110'>

        </Image>
        {/* overlay  */}
        <div className='absolute inset-0 transition bg-black/20 group-hover:bg-black/40'></div>
        {/* content image */}
        <div className='absolute bottom-4 left-4 text-white'>
          <h2 className='text-xl font-bold'>{ item.title}</h2>

        </div>

      </div>
      {/* bottom section */}
      <div>
        
      </div>
    </div>
  )
}

export default LocationCard