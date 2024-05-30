import React, { useContext, useEffect, useState } from 'react'
import { User } from '../Contexts/User.Context'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Image, Transformation } from 'cloudinary-react';

function Subscriptions() {
  const { user } = useContext(User);
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/register');
    else
      axios
        .get('/videos/subscriptions/' + user._id)
        .then(({data}) => setVideos(data.data))
        .catch(err => console.log(err));
  }, [user]);

  return (
    <div className='allVideosContainer'>
      {videos.length > 0 && videos.map(video => (
        <Link to={'video/'+video._id} key={video._id} className=''>
          <div className=''>
            <div className='relative'>
              <Image cloudName='dcpi2varq' publicId={video.thumbnail} className='relative'>
                <Transformation crop='scale' height='300' width='530' radius='10' />
              </Image>
              <div className='absolute flex justify-center items-center bg-black opacity-60 px-1.5 min-w-8 bottom-1 right-2 rounded-md'>
                <h1 className='opacity-100 text-xs'>
                  {video.duration}
                </h1>
              </div>
            </div>
          </div>
          <div className="flex sm:gap-4 gap-2 mt-3">
            <Link to={'/channel/'+video.channelName} className="md:min-w-10 md:max-w-10 md:min-h-10 md:max-h-10 min-w-8 max-w-8 min-h-8 max-h-8">
              {video.channelImg !== '' ? (
                <Image to={'/channel/'+video.channelName} cloudName='dcpi2varq' publicId={video.channelImg} className='rounded-full'>
                  <Transformation crop='scale' radius='100'/>
                </Image>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="2 2 20 20" fill="currentColor" className="size-11/12">
                  <path className='w-full' fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                </svg>
              )}
            </Link>
            <div style={{fontFamily: 'arial'}}>
              <h1 className='title font-semibold text-gray-100 max-h-12 lg:text-base sm:text-sm text-[0.7rem] line-clamp-3'>
                {video.title}
              </h1>
              <div className='othText font-medium text-gray-400 lg:text-sm text-[0.55rem]'>
                <h2>
                  {video.channelName}
                </h2>
                <h2>
                  {video.views} views • {video.timePassed} ago
                </h2>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Subscriptions
