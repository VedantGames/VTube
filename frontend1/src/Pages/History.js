import React, { useContext, useEffect, useState } from 'react'
import { User } from '../Contexts/User.Context';
import axios from 'axios';
import { Image, Transformation } from 'cloudinary-react';
import { Link } from 'react-router-dom';

function HistoryPage() {
  const { user } = useContext(User);

  const [userHistory, setUserHistory] = useState(null);

  useEffect(() => {
    if (user)
      axios
        .get('/users/user-history/' + user._id)
        .then(({data}) => setUserHistory(data.data))
        .catch(err => console.log(err));
  }, [user])

  return (
    <div className='2xl:px-48 xl:px-28 lg:px-10 sm:px-20 px-5 lg:pt-5 '>
      <div>
        <h1 className='lg:text-4xl text-xl font-bold'>
          Watch history
        </h1>
      </div>
      <div className='flex flex-col gap-5 2xl:mt-20 lg:mt-10 mt-5 2xl:pr-[20rem] lg:pr-28'>
        {userHistory && userHistory.map((video, i) => (
          <Link to={'/video/'+video._id} key={i} className='grid grid-cols-[1fr_2.5fr] w-full'>
            <div className='relative'>
              <Image cloudName='dcpi2varq' publicId={video.thumbnail} >
                <Transformation crop='scale' radius='10' height='300' width='530' />
              </Image>
              <div className='absolute z-10 flex justify-center items-center md:text-base text-xs bg-black opacity-60 px-1.5 bottom-1 right-2 rounded-md'>
                <h1 className='opacity-100'>
                  {video.duration}
                </h1>
              </div>
            </div>
            <div className='ml-4'>
              <div>
                <h1 className='lg:text-lg md:text-base sm:text-sm text-[0.6rem] font-semibold line-clamp-3'>
                  {video.title}
                </h1>
              </div>
              <div className='text-[#AAA] sm:text-xs text-[0.5rem]'>
                <div>
                  {video.channelName} ‧ {video.views} views
                </div>
                <div className='md:mt-2 md:line-clamp-2 line-clamp-1'>
                  <h1>
                    {video.description}
                  </h1>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default HistoryPage
