import React, { useEffect, useState } from 'react'
import MainLayout from '@/Layout/MainLayout'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Input } from '@/components/ui/input'
import { SelectBudgetOptions, SelectTravelList } from '@/constants/options'
import { Button } from '@/components/ui/button'


const CreateTrip = () => {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);

  const handleInputChange = (name, value) => {
    if(name=="noOfDays" && value>5){
      console.log('Please enter Trip Days less than 5')
      return;
    }
    setFormData({
      ...formData,
      [name]: value
    })
  }

  useEffect(() => {
    console.log(formData);
  }, [formData])  //when the component gets mounted


  const OnGenerateTrip = ()=>{
    if(formData?.noOfDays>5){
      return;
    }
    console.log(formData);
  }
  return (
    <>
      <MainLayout>
        <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
          <h1 className='font-bold text-3xl text-left'>Tell us your travel preferences 🌴</h1>
          <p className='text-left text-gray-500 text-lg'>Just provide some basic information and Globo AI will generate a
            customized itinerary based on your preferences.</p>
          {/* question form */}
          <div className='mt-20 flex flex-col'>
            <div>
              <h2 className='texl-xl my-3 font-medium'>
                What is your destination of choice?
              </h2>
              <GooglePlacesAutocomplete apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                selectProps={{
                  place,
                  onChange: (v) => {
                    setPlace(v);
                    handleInputChange('location', v)
                    console.log(place);
                  }
                }}
              />
              <div className='mt-10'>
                <h2 className='texl-xl my-3 font-medium'>How many days are you planning your trip?</h2>
                <Input placeholder={'Ex.3'} type="number" className="text-gray-500 font-medium border-gray-300"
                  onChange={(e) => handleInputChange('noOfDays', e.target.value)}
                />
              </div>
            </div>
            <div className='mt-10'>
              <h2 className='font-semibold text-xl text-left'>What is your Budget?</h2>
              <p className='text-left text-gray-500 text-lg'>The budget is exclusively allocated for activities and dining purposes.</p>
              <div className='grid grid-cols-3 gap-5 mt-5'>
                {/* budget options */}
                {SelectBudgetOptions.map((item, index) => (
                  <div key={index} className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer hover:translate-y-1 hover:transition-all ${formData?.budget==item.title && 'shadow-lg border-green-500 border-2'}`}
                    onClick={() => handleInputChange('budget', item.title)}>
                    <h2 className='text-4xl'>{item.icon}</h2>
                    <h2 className='text-lg font-semibold mt-5'>{item.title}</h2>
                    <h2 className='text-sm text-gray-500 font-medium'>{item.desc}</h2>
                  </div>
                ))}
              </div>
            </div>
            <div className='mt-10'>
              <h2 className='font-semibold text-xl text-left'>Got any Travel Partner?</h2>
              <p className='text-left text-gray-500 text-lg'>Who do you plan on travelling with on your next adventure?</p>
              {/* Travel Options */}
              <div className='grid grid-cols-3 gap-5 mt-5'>
                {/* budget options */}
                {SelectTravelList.map((item, index) => (
                  <div key={index} className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer hover:translate-y-1 hover:transition-all ${formData?.traveler==item.people && 'shadow-lg border-green-500 border-2'}`}
                    onClick={() => handleInputChange('traveler', item.people)}>
                    <h2 className='text-4xl'>{item.icon}</h2>
                    <h2 className='text-lg font-semibold mt-5'>{item.title}</h2>
                    <h2 className='text-sm text-gray-500 font-medium'>{item.desc}</h2>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='mb-20 mt-10 flex justify-end'>
            <Button onClick={OnGenerateTrip}>Generate Trip</Button>
          </div>

        </div>
      </MainLayout>
    </>
  )
}

export default CreateTrip
