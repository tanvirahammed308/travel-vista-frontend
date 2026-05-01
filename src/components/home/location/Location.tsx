import React from 'react'
import LocationCard from './LocationCard';

const locations = [
  {
    title: "Cox's Bazar",
    location: "Chattogram",
    cities: "3",
    places: "15",
    image: '/images/location/india.jpg',
  },
  {
    title: "Sajek Valley",
    location: "Rangamati",
    cities: "2",
    places: "10",
    image: '/images/location/italy.jpg',
  },
  {
    title: "Sylhet",
    location: "Sylhet Division",
    cities: "4",
    places: "20",
   image: '/images/location/japan.jpg',
  },
  {
    title: "Sundarbans",
    location: "Khulna",
    cities: "2",
    places: "8",
    image: '/images/location/location1.jpg',
  },
  {
    title: "Sundarbans",
    location: "Khulna",
    cities: "2",
    places: "8",
    image: '/images/location/location2.jpg',
  },
  {
    title: "Sundarbans",
    location: "Khulna",
    cities: "2",
    places: "8",
    image: '/images/location/location3.jpg',
  },
  {
    title: "Sundarbans",
    location: "Khulna",
    cities: "2",
    places: "8",
    image: '/images/location/location4.jpg',
  },
  {
    title: "Sundarbans",
    location: "Khulna",
    cities: "2",
    places: "8",
    image: '/images/location/vanice.jpg',
  },
];
const Location = () => {
  return (
    <section className="py-12 px-4 md:px-10">
      
      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800">
          Explore Top Locations
        </h1>
        <p className="text-gray-500 mt-2">
          Discover the best places in Bangladesh
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {locations.map((item, index) => (
          <LocationCard key={index} item={item} />
        ))}
      </div>
    </section>
  )
}

export default Location