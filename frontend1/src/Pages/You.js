import React, { useContext, useEffect, useState } from 'react'
import { User } from '../Contexts/User.Context';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Image, Transformation } from 'cloudinary-react';

function YouPage() {
  const { user } = useContext(User);
  const navigate = useNavigate();

  const [userHistory, setUserHistory] = useState(null);
  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    if (!user) navigate('/register');
    else {
      axios
        .get('/users/you-history/' + user._id)
        .then(({data}) => setUserHistory(data.data))
        .catch(err => console.log(err));
      axios
        .get('/videos/all-playlists/' + user._id)
        .then(({data}) => setPlaylists(data.data))
        .catch(err => console.log(err));
    }
  }, [user])

  return (
    <div className='font-[arial] w-screen'>
      <div className='mt-5'>
        <div className='flex justify-between mx-6'>
          <div>
            <h1 className='text-lg font-bold'>
              History
            </h1>
          </div>
          <div>
            <Link to={'/history'} className='rounded-full text-[0.7rem] px-2 py-1 border border-slate-500'>
              View all
            </Link>
          </div>
        </div>
        <div className='px-5 flex gap-2 overflow-x-scroll hide-scrollbar mt-2'>
          {userHistory && userHistory.map((video, i) => (
            <Link to={'/video/' + video._id} key={i} className='min-w-40 h-full'>
              <div className='h-full'>
                <Image cloudName='dcpi2varq' publicId={video.thumbnail}>
                  <Transformation crop='scale' radius='25' height='300' width='530' />
                </Image>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className='mt-10'>
        <div className='flex justify-between mx-6'>
          <div>
            <h1 className='text-lg font-bold'>
              Playlists
            </h1>
          </div>
          <div>
            <Link to={'/playlists'} className='rounded-full text-[0.7rem] px-2 py-1 border border-slate-500'>
              View all
            </Link>
          </div>
        </div>
        <div className='px-5 flex gap-2 overflow-x-scroll hide-scrollbar mt-2'>
          {playlists && playlists.map((playlist, i) => (
            <Link to={'/playlist/' + playlist._id} key={i} className='min-w-40 h-full'>
              <div className='relative h-full'>
                <Image cloudName='dcpi2varq' publicId={playlist.thumbnail}>
                  <Transformation crop='scale' radius='25' height='300' width='530' />
                </Image>
                <div className='absolute flex justify-center items-center bg-[#000a] px-3 py-1 min-w-8 bottom-1 right-2 rounded-sm'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                  </svg>
                  <h1 className='text-sm font-bold'>
                    {playlist.videos.length} Videos
                  </h1>
                </div>
              </div>
              <div className='mt-1'>
                <h1 className='font-bold'>
                  {playlist.name}
                </h1>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  )
}

export default YouPage
