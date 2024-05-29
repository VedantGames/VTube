import React, { useContext, useEffect, useState } from 'react'
import { User } from '../../Contexts/User.Context'
import axios from 'axios';
import VideoCard from '../VideoCard';

function VideoSection() {
  const { user } = useContext(User);

  // if (!user) return <Navigate to={'/register'} />;

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios
      .get('videos/channel-videos/'+user._id)
      .then(({data}) => setVideos(data.data))
      .catch(err => console.log(err.response.data));
  }, [user])

  return (
    <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 my-10 gap-5 sm:px-0 px-2'>
      {videos.length > 0 && videos.map(video => (
        <VideoCard video={video} />
      ))}
    </div>
  )
}

export default VideoSection
