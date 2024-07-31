import React, { useEffect, useState } from 'react'
import MainLayout from '@/Layout/MainLayout'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Input } from '@/components/ui/input'
import { AI_PROMPT, SelectBudgetOptions, SelectTravelList } from '@/constants/options'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { chatSession } from '@/service/aiModel'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { setDoc } from 'firebase/firestore'
import { db } from '@/service/firebaseConfig'
import { doc } from 'firebase/firestore'
import { AiOutlineLoading3Quarters } from "react-icons/ai";


const CreateTrip = () => {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (name, value) => {
    if (name == "noOfDays" && value > 5) {
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

  const login = useGoogleLogin({
    onSuccess: (codeRep) => {
      GetUserProfile(codeRep);
    },
    onError: (error) => console.log(error)
  })

  const OnGenerateTrip = async () => {

    const user = localStorage.getItem('user'); //gets the user info
    if (!user) {  //if the user is not find return nothing.
      setOpenDialog(true);
      return;
    }

    if (formData?.noOfDays > 5 && !formData?.location || !formData?.budget || !formData?.traveler) {
      toast("Please fill all details.");
      return;
    }

    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace('{location}', formData?.location?.label).replace('{noOfDays}', formData?.noOfDays).replace('{traveler}', formData?.traveler).replace('{budget}', formData?.budget)
    console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text());
  }

  // add the data to database -> cloud firestore
  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'))
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId
    });

    setLoading(false);
  }

  const GetUserProfile = async (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'Application/json'  //gives the response in json format.
      }
    }).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));  //store the user data in window -> session-storage
      setOpenDialog(false); //the login-dialog box is closed.
      OnGenerateTrip(); //then, the trip plan generation function is called.
    })
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
                  <div key={index} className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer hover:transition-all ${formData?.budget == item.title && 'shadow-lg border-green-500 border-2'}`}
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
                  <div key={index} className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer hover:transition-all ${formData?.traveler == item.people && 'shadow-lg border-green-500 border-2'}`}
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
            <Button onClick={OnGenerateTrip}
              disabled={loading}
            >
              {
                loading ? <AiOutlineLoading3Quarters className='h-5 w-5 animate-spin' /> :
                  'Generate Trip'
              }
            </Button>
          </div>

          {/* login dialog box pop-up */}
          <Dialog open={openDialog}>

            <DialogContent>
              <DialogHeader>

                <DialogDescription>
                  <img src="/globoailogo.svg" alt="logo" className='w-24' />
                  <h2 className='font-bold text-xl text-left text-gray-700 mt-7'>Sign In with Google</h2>
                  <p className='text-left text-gray-500 font-normal text-lg'>Sign in to the app to access Globo AI.</p>
                  <Button className="w-full mt-5 hover:bg-gradient-to-r hover:from-blue-900 hover:to-green-700 transition-all flex gap-3 items-center"
                    onClick={login}>
                    <FcGoogle className='w-5 h-5' />
                    Sign In With Google
                  </Button>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

        </div>
      </MainLayout>
    </>
  )
}

export default CreateTrip
