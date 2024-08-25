import React from 'react'
import SearchBar from './components/SearchBar'
import RecommendCatalog from './components/RecommendCatalog'
import FoodCatalog from './components/FoodCatalog'

const foodCatalogs = [
  {
    imageSrc: "/login/salad.png",
    distance: "0.3 km",
    time: "20 min",
    name: "SaladGo!, PVC Bandung",
    description: "SaladGo! is a leader in providing fresh, healthy salads, wraps, warm protein bowls, and activated smoothies.",
    rating: 4.8
  },
  {
    imageSrc: "/login/salad.png",
    distance: "0.5 km",
    time: "15 min",
    name: "Indojuli",
    description: "Indomaret is a minimarket network that provides basic and daily needs.",
    rating: 4.9
  },
  {
    imageSrc: "/login/salad.png",
    distance: "0.8 km",
    time: "30 min",
    name: "Indo Super, Gado",
    description: "Indo Super provides a variety of daily necessities products with reliable, complete quality, and low prices.",
    rating: 4.5
  },
  {
    imageSrc: "/login/salad.png",
    distance: "1 km",
    time: "35 min",
    name: "Choco Kitchen",
    description: "Choco Kitchen is a well-known cake and chocolate brand in Indonesia which has a variety of signature menus.",
    rating: 4.8
  },
  {
    imageSrc: "/login/salad.png",
    distance: "1.1 km",
    time: "15 min",
    name: "Betamart",
    description: "Betamart is a minimarket network that provides basic and daily needs.",
    rating: 4.9
  },
  {
    imageSrc: "/login/salad.png",
    distance: "1.2 km",
    time: "30 min",
    name: "Pisa Bakery",
    description: "Pisa Bakery is a franchise brand from Indonesia that sells many varieties of bread.",
    rating: 4.5
  },
];


const page = () => {
  return (
    <div className='bg-[#EBF2FA]'>
      <div className='mx-20'>
      <div className='flex flex-col'>
        <div className='flex justify-center items-center mt-10'>
          <SearchBar />
        </div>
        <div className=' mt-10 grid grid-cols-3 gap-6 p-4' >
          {foodCatalogs.map((item, index) => (
            <FoodCatalog
              key={index}
              imagesSRC={item.imageSrc}
              distance={item.distance}
              time={item.time}
              name={item.name}
              description={item.description}
              rating={item.rating}
            />
        ))}
        </div>
      </div>
      </div>
    </div>
  )
}

export default page