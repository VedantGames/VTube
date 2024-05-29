import axios from 'axios';
import { Image, Transformation, Video } from 'cloudinary-react';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { User } from '../Contexts/User.Context';

function VideoPage({ showSidePanel, setShowSidePanel }) {
  const { videoId } = useParams();
  const { user } = useContext(User);

  setShowSidePanel(false);

  const [video, setVideo] = useState(null);
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    axios
      .get('videos/video/' + (user ? user._id + '/' : '') + videoId)
      .then(({data}) => {
        setVideo(data.data.video);
        setChannel(data.data.channel);
        console.log(video, channel);
      })
      .catch(err => console.log(err));
  }, [videoId]);

  return (
    <div className='h-full min-h-[93.3vh] px-20 pt-5 text-[#f1f1f1] font-[arial]'>
      {(video && channel) && (
        <div className='flex'>
          <div>
            <div>
              <Video cloudName='dcpi2varq' publicId={video.videoFile} controls='true' className='rounded-xl'>
              </Video>
            </div>
            <div className='mt-2'>
              <h1 className='text-xl font-bold'>
                {video.title}
              </h1>
            </div>
            <div className='mt-2'>
              <div className='flex justify-between'>
                <div className='flex gap-3'>
                  <div className='size-10'>
                    <Image cloudName='dcpi2varq' publicId={channel.profileImage} className='rounded-full'>

                    </Image>
                  </div>
                  <div>
                    <div>
                      <h1 className='font-bold'>
                        {channel.fullName}
                      </h1>
                    </div>
                    <div>
                      <h2 className='text-[#AAA] text-xs'>
                        {channel.subscribers} subscribers
                      </h2>
                    </div>
                  </div>
                  <div className='ml-3'>
                    <button className='bg-[#f1f1f1] text-[#0f0f0f] font-semibold text-sm w-full h-full max-h-9 min-w-24 rounded-full'>
                      Subscribe
                    </button>
                  </div>
                </div>
                <div className='flex gap-2 h-9'>
                  <div className='flex items-center bg-[#272727] h-9 w-full min-w-[9rem] rounded-full'>
                    <button className='flex items-center bg-[#272727] hover:bg-[#3f3f3f] rounded-s-full min-w-[5.5rem] w-full h-9'>
                      <div className='ml-4'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                        </svg>
                      </div>
                      <div className='w-full pr-3'>
                        <h1>
                          {video.likes}
                        </h1>
                      </div>
                    </button>
                    <div className='w-0 border border-[#525252] h-1/2'></div>
                    <button className='flex items-center justify-center bg-[#272727] hover:bg-[#3f3f3f] rounded-e-full w-full h-9'>
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                        </svg>
                      </div>
                    </button>
                  </div>
                  <button className='flex items-center bg-[#272727] hover:bg-[#3f3f3f] rounded-full px-5'>
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                    </div>
                    <div className='ml-1'>
                      <h1 className='font-semibold text-sm'>
                        Share
                      </h1>
                    </div>
                  </button>
                  <button className='flex items-center bg-[#272727] hover:bg-[#3f3f3f] rounded-full px-5'>
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className='ml-1'>
                      <h1 className='font-semibold text-sm'>
                        Download
                      </h1>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='w-full max-w-[27.5rem]'>

          </div>
        </div>
      )}
    </div>
  )
}

export default VideoPage