import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './Home.css';
import axios from 'axios';
import { Image, Transformation } from 'cloudinary-react';

function Home({ showSidePanel, setShowSidePanel }) {
  const [videos, setVideos] = useState([]);

  setShowSidePanel(true);

  useEffect(() => {
    axios.get('videos/all-videos').then(({data}) => setVideos(data.data)).catch(err => console.error(err));
  }, [])

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
              <Image to={'/channel/'+video.channelName} cloudName='dcpi2varq' publicId={video.channelImg} className='rounded-full'>
                <Transformation crop='scale' radius='100'/>
              </Image>
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

export default Home
