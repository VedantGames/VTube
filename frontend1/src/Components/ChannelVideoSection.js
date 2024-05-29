import axios from 'axios';
import React, { useEffect, useState } from 'react'
import VideoCard from './VideoCard';

function ChannelVideoSection({channelId}) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios
      .get('videos/channel-videos/' + channelId)
      .then(({data}) => setVideos(data.data))
      .catch(err => console.log(err))
  }, [channelId]);

  return (
    <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 my-10 gap-5 sm:px-0 px-2'>
      {videos.length > 0 && videos.map(video => (
        <VideoCard video={video} />
      ))}
    </div>
  )
}

export default ChannelVideoSection
