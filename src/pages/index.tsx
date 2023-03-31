import { Router, useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { SiPivotaltracker } from 'react-icons/Si';

export default function index() {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router=useRouter();
// eslint-disable-next-line react-hooks/rules-of-hooks
useEffect(()=>{
router.push("/expense")
},[])
 
  return (

    <div className="flex min-h-screen flex-col items-center justify-center py-2">

    <div className='flex  justify-center items-center h-full w-full '>
    <i className=" px-5 text-red-400">
            <SiPivotaltracker className='h-20 w-20' />
          </i>
          <p className="bg-gradient-to-r from-red-700 via-gray-500 to-gray-300 text-4xl inline-block text-transparent bg-clip-text">
            Expenses Tracker
          </p>
              </div>
  </div> )
}
