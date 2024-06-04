import React, { useContext, useEffect, useState } from 'react'
import { User } from '../Contexts/User.Context'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Image, Transformation } from 'cloudinary-react';

function PlaylistsPage() {
  const { user, setUser } = useContext(User);
  const navigate = useNavigate();

  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    if (!user) navigate('/register');
    else
      axios
        .get('/videos/all-playlists/' + user._id)
        .then(({data}) => setPlaylists(data.data))
        .catch(err => console.log(err));
  }, [user]);

  return (
    <div className='2xl:px-48 xl:px-28 lg:px-10 sm:px-20 px-5 lg:pt-5 '>
      <div>
        <h1 className='lg:text-4xl text-xl font-bold'>
          Playlists
        </h1>
      </div>
      <div className='md:flex flex-row grid grid-cols-2 gap-3 mt-10 w-full'>
        {playlists && playlists.map(playlist => (
          <Link to={playlist.name == 'Likes' ? '/liked' : (playlist.name == 'Watch Later' ? '/watch-later' : ('/playlist/' + playlist._id))} key={playlist._id}>
            <div className='relative'>
              <Image cloudName='dcpi2varq' publicId={playlist.thumbnail}>
                <Transformation crop='scale' radius='10' width='255' height='143' />
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
              <h1 className='text-lg font-bold'>
                {playlist.name}
              </h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default PlaylistsPage
