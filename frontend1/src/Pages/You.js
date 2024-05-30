import React, { useContext, useEffect, useState } from 'react'
import { User } from '../Contexts/User.Context';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Image, Transformation } from 'cloudinary-react';

function YouPage() {
  const { user } = useContext(User);

  const [userHistory, setUserHistory] = useState(null);

  useEffect(() => {
    if (user)
      axios
        .get('/users/you-history/' + user._id)
        .then(({data}) => setUserHistory(data.data))
        .catch(err => console.log(err));
  }, [user])

  return (
    <div className='font-[arial] w-screen'>
      <div className='mt-2'>
        <div className='flex justify-between mx-5'>
          <div>
            <h1 className='text-lg font-bold'>
              History
            </h1>
          </div>
          <div>
            <Link to={'/history'} className='rounded-full text-[0.7rem] px-2 py-1 border-[1.9px] border-slate-500'>
              View all
            </Link>
          </div>
        </div>
        <div className='px-5 flex gap-2 overflow-x-scroll hide-scrollbar mt-2'>
          {userHistory && userHistory.map((video, i) => (
            <Link key={i} className='min-w-32 h-full'>
              <div className='h-full'>
                <Image cloudName='dcpi2varq' publicId={video.thumbnail}>
                  <Transformation crop='scale' radius='25' height='300' width='530' />
                </Image>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default YouPage
