import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Slider from 'react-slick';

const HomePage = () => {
  const navigate = useNavigate();

  const testimonials = [
    {
      name: 'Aarav K.',
      message: 'Super easy and quick booking!',
    },
    {
      name: 'Sita R.',
      message: 'The UI is beautiful and the booking flow is seamless.',
    },
    {
      name: 'Manish D.',
      message: 'Will use again for my next trip to Chitwan!',
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/buses'); 
  };

  return (
    <div className="min-h-screen">
      <div className="relative h-[75vh] bg-cover bg-center text-white flex items-center justify-center px-6"
        style={{
          backgroundImage: "url('/images/bus.jpg')", 
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="relative z-10 max-w-3xl text-center">
          <h1 className="text-5xl font-bold mb-4">Your Journey Starts Here</h1>
          <p className="text-lg mb-6">Search, select and reserve your bus seat in seconds.</p>

          <form
            onSubmit={handleSearch}
            className="bg-white bg-opacity-90 p-4 rounded-lg flex flex-col md:flex-row gap-4 items-center justify-center"
          >
            <input
              type="text"
              placeholder="From"
              className="p-2 rounded border w-full md:w-40"
              required
            />
            <input
              type="text"
              placeholder="To"
              className="p-2 rounded border w-full md:w-40"
              required
            />
            <input
              type="date"
              className="p-2 rounded border w-full md:w-40"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold"
            >
              <FontAwesomeIcon icon="search" className="mr-1" />
              Find Buses
            </button>
          </form>
        </div>
      </div>

      <div className="py-16 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold text-blue-700 mb-6">What Travelers Say</h2>
        <div className="max-w-3xl mx-auto px-6">
          <Slider {...settings}>
            {testimonials.map((t, i) => (
              <div key={i}>
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <p className="italic text-gray-700">“{t.message}”</p>
                  <p className="mt-4 font-semibold text-blue-600">– {t.name}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
