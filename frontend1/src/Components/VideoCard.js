import React from 'react'
import { Link, Navigate } from 'react-router-dom';
import { Image, Transformation } from 'cloudinary-react';

function VideoCard({video}) {
  return (
    <Link to={'/video/' + video._id} className='rounded-xl' key={video.thumbnail}>
      <div className='relative'>
        <Image cloudName='dcpi2varq' publicId={video.thumbnail}>
          <Transformation crop='scale' radius='10' height='171' width='300'/>
        </Image>
        <div className='absolute flex justify-center items-center bg-black opacity-60 px-1.5 min-w-8 bottom-1 right-2 rounded-md'>
          <h1 className='opacity-100 text-xs'>
            {video.duration}
          </h1>
        </div>
      </div>
      <div className='flex justify-between mt-1'>
        <div>
          <div>
            <h1 className='font-semibold md:text-base text-sm'>
              {video.title}
            </h1>
          </div>
          <div>
            <div className='mt-1'>
              <h1 className='text-xs font-semibold text-[#aaa]'>
                {video.views} views ‧ {video.timePassed} ago
              </h1>
            </div>
          </div>
        </div>
        <div>
          <div className='mt-2 md:block hidden'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default VideoCard
