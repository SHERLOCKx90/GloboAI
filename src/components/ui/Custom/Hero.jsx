import React from 'react'
import { Button } from '../button'
import { MoveRight } from 'lucide-react';
import { Link } from 'react-router-dom';


const Hero = () => {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
        <h1 className='font-black text-5xl text-center mt-16'><span className='bg-gradient-to-r from-[#00456D] to-[#00AB03] bg-clip-text text-transparent'>Discover Your Next Adventure with Globo Al<br /></span>Personalized Itineraries at Your Fingertips</h1>
        <p className='text-center text-gray-500 text-xl'>Your personal trip planner and travel curator, <br />creating custom
        itineraries tailored to your interests and budget</p>
        <Link to={`/create-trip`}><Button>Get Started, It's Free <span className='ml-3'><MoveRight className='w-5'/></span></Button></Link>
    </div>
  )
}

export default Hero
