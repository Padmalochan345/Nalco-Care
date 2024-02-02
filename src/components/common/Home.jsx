import React from "react";
import { Carousel } from "flowbite-react";
import { heroImages } from "../../data/data";
import AllDoctors from "../admin/AllDoctors";

const Home = () => {
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel>
        {heroImages.map((item, index) => (
          <img key={index} src={item.img} alt={item.alt} />
        ))}
      </Carousel>
      <AllDoctors />
     
    </div>
  );
};

export default Home;
