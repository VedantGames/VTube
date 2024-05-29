import axios from 'axios';
import { Image, Transformation } from 'cloudinary-react';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function SearchPage() {
  const { query } = useParams();

  const [searchData, setSearchData] = useState(null);

  useEffect(() => {
    axios
      .get('/videos/search/'+query)
      .then(({data}) => setSearchData(data.data))
      .catch(err => console.error(err));
  }, [query])

  return (
    <div className='2xl:px-52 mt-10 w-full text-[arial]'>
      {searchData && (
        <div className='w-full'>
          <div className='flex flex-col gap-5'>
            {searchData.channels && searchData.channels.map(channel => (
              <Link to={'/channel/'+channel.userName} key={channel._id} className='flex'>
                <div className='w-96 ml-28'>
                  {channel.img !== '' ? (
                    <Image cloudName='dcpi2varq' publicId={channel.img} className='rounded-full' >
                      <Transformation scale='crop' height='100' width='100'/>
                    </Image>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="2 2 20 20" fill="currentColor" className="w-9/12">
                      <path className='w-full' fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div className='ml-8 w-full'>
                  <div className='mt-5'>
                    <h1 className='text-3xl font-bold'>
                      {channel.name}
                    </h1>
                  </div>
                  <div className='text-[#aaa] mt-3 text-sm'>
                    <div>
                      <h1>
                        @{channel.userName} ‧ {channel.subscribers} subscribers
                      </h1>
                    </div>
                    <div>
                      <h1 className='line-clamp-1'>
                        {channel.bio}
                      </h1>
                    </div>
                  </div>
                </div>
                <div className='flex items-center'>
                  <button className='bg-[#f1f1f1] text-[#0f0f0f] font-bold rounded-full px-3.5 py-2'>
                    Subscribe
                  </button>
                </div>
              </Link>
            ))}
            {searchData.channels && (
              <hr className='my-5 border-[#3f3f3f]' />
            )}
          </div>
          <div className='flex flex-col gap-5'>
            {searchData.videos && searchData.videos.map(video => (
              <Link to={'/video/'+video._id} key={video._id} className='grid grid-cols-[1.35fr_2fr] h-72'>
                <div className='relative h-full'>
                  <Image cloudName='dcpi2varq' publicId={video.thumbnail} className='w-full h-full' >
                    <Transformation scale='crop' height='280' width='500' radius='10' />
                  </Image>
                  <div className='absolute flex justify-center items-center bg-black opacity-60 px-1.5 min-w-8 bottom-1 right-2 rounded-md'>
                    <h1 className='opacity-100 text-sm'>
                      {video.duration}
                    </h1>
                  </div>
                </div>
                <div className='ml-3'>
                  <div>
                    <h1 className='text-2xl font-semibold'>
                      {video.title}
                    </h1>
                  </div>
                  <div className='text-[#aaa] text-sm'>
                    <div>
                      <h1>
                        {video.views} views ‧ {video.timePassed} ago
                      </h1>
                    </div>
                    <div className='flex my-3'>
                      <div className='size-5'>
                        <Image cloudName='dcpi2varq' publicId={video.channelImg} className='size-full rounded-full'>
                          <Transformation scale='crop' height='100' width='100'/>
                        </Image>
                      </div>
                      <div className='ml-2'>
                        <h1>
                          {video.channelName}
                        </h1>
                      </div>
                    </div>
                    <div>
                      <h1 className='line-clamp-1'>
                        {video.description}
                      </h1>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchPage
