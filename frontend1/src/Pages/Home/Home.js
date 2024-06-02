import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import './Home.css';
import axios from 'axios';
import { Image, Transformation, Video } from 'cloudinary-react';
import { User } from '../../Contexts/User.Context';
import { toast, ToastContainer } from 'react-toastify';

function Home({ showSidePanel, setShowSidePanel }) {
  const { user, setUser } = useContext(User);
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  const [hoveredVideo, setHoveredVideo] = useState(videos.length);
  const [showMnu, setShowMnu] = useState(false);

  const [timeouts, setTimeouts] = useState(null);
  const [canCancel, setCanCancel] = useState(false);

  const [showAddToPlaylistMenu, setShowAddToPlaylistMenu] = useState(false);
  const [playlists, setPlaylists] = useState(null);
  const [selectedPlaylists, setSelectedPlaylists] = useState([]);
  const [selectedVid, setSelectedVid] = useState(-1);

  setShowSidePanel(true);

  useEffect(() => {
    axios.get('videos/all-videos').then(({data}) => setVideos(data.data)).catch(err => console.error(err));
  }, [])

  useEffect(() => {
    setHoveredVideo(videos.length);
    setShowMnu(false);
  }, [videos]);

  const showMenu = ev => {
    ev.preventDefault();
    ev.stopPropagation();
    setShowMnu(true);
  }
  
  const menuClick = ev => {
    ev.preventDefault();
    ev.stopPropagation();
    setTimeout(() => setShowMnu(false), 100)
  };
    
  const handelHover = id => {
    setCanCancel(false);
    clearTimeout(timeouts);

    if (!showMnu)
      setTimeouts(setTimeout(() => {
        if (!canCancel)
          setHoveredVideo(id)
      }, 1000))
  }

  const addToWatchLater = id => {
    if (user === null) navigate('/register');
    else
      toast.promise(
        axios.post('/users/add-to-watch-later', { userId: user._id, videoId: videos[id]._id }),
        {
          loading: 'Adding to watch later...',
          success: {
            render({data}) {
              setUser(data.data.data.user);
              return 'Video added to watch later';
            }
          },
          error: 'Error adding to watch later'
        },
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      )
  };

  const openSaveToPlaylist = id => {
    if (user === null) navigate('/register');
    else
      axios
        .get('/videos/all-playlists/' + user._id)
        .then(({data}) => {
          setPlaylists(data.data)
          setShowAddToPlaylistMenu(true);
          setSelectedVid(id);
        })
        .catch(err => console.log(err));
  }

  const selectPlaylist = (plInd) => {
    if (selectedPlaylists.length > 0) {
      if ((selectedPlaylists && selectedPlaylists.find(p => p == plInd)) !== 0) {
        delFromPlaylist(plInd, selectedVid);
        setSelectedPlaylists(selectedPlaylists.filter(p => p != plInd));
      }
      else {
        saveToPlaylist(plInd, selectedVid);
        setSelectedPlaylists(...selectedPlaylists, plInd);
      }
    }
    else {
      saveToPlaylist(plInd, selectedVid);
      setSelectedPlaylists([plInd]);
    }
  }

  const saveToPlaylist = (playlistInd, videoInd) => {
    console.log(playlists, playlistInd, videos, videoInd)
    axios
      .post('/users/add-to-playlist', { userId: user._id, playlistId: playlists[playlistInd]._id, videoId: videos[videoInd]._id })
      .then(({data}) => setUser(data.data))
      .catch(err => console.log(err));
    };
    
  const delFromPlaylist = (playlistInd, videoInd) => {
      axios
        .post('/users/del-from-playlist', { userId: user._id, playlistId: playlists[playlistInd]._id, videoId: videos[videoInd]._id })
        .then(({data}) => setUser(data.data))
        .catch(err => console.log(err));
    };

  return (
    <div className='allVideosContainer'>
      {videos.length > 0 && videos.map((video, i) => (
        <Link to={'video/'+video._id} key={video._id} className='' onMouseOver={() => handelHover(i)} onMouseLeave={() => {if (!showMnu) { setHoveredVideo(videos.length); setCanCancel(true) }}}>
          <div className=''>
            <div className='relative'>
              {hoveredVideo == i ? (
                <Video cloudName='dcpi2varq' publicId={video.videoFile} autoplay='true' className='rounded-lg'>
                  <Transformation crop='scale' height='300' width='530' radius='10' />
                </Video>
              ) : (
                <Image cloudName='dcpi2varq' publicId={video.thumbnail} className='relative'>
                  <Transformation crop='scale' height='300' width='530' radius='10' />
                </Image>
              )}
              <div className='absolute flex justify-center items-center bg-black opacity-60 px-1.5 min-w-8 bottom-1 right-2 rounded-md'>
                <h1 className='opacity-100 text-xs'>
                  {video.duration}
                </h1>
              </div>
            </div>
          </div>
          <div className="flex sm:gap-4 gap-2 mt-3 w-full">
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
            <div className='font-[arial] flex relative w-full'>
              <div className='w-full'>
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
              <div className={hoveredVideo !== i && 'hidden'}>
                <div className={'absolute z-20 w-56 flex flex-col justify-end font-semibold bg-[#282828] bottom-16 left-[105%] rounded-xl text-sm py-2 ' + (!showMnu && 'hidden')} onClick={menuClick}>
                  <div className='flex gap-1 bg-[#282828] hover:bg-[#444] w-full pl-3 py-1' onClick={() => addToWatchLater(i)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <button>Save to Watch Later</button>
                  </div>
                  <div className='flex gap-1 bg-[#282828] hover:bg-[#444] w-full pl-3 py-1' onClick={() => openSaveToPlaylist(i)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                    </svg>
                    <button>Save to playlist</button>
                  </div>
                </div>
                <div className='flex justify-end w-full'>
                  <button onClick={showMenu}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer />
        </Link>
      ))}
      <div className={'absolute flex justify-center items-center top-0 left-0 h-full w-full font-[arial] ' + (!showAddToPlaylistMenu && 'hidden')}>
        <div className='bg-[#212121] text-[#f1f1f1] px-6 py-4 rounded-2xl'>
          <div className='flex justify-between mb-4'>
            <div>
              <h1 className='font-semibold'>
                Save video to...
              </h1>
            </div>
            <div className='cursor-pointer' onClick={() => setShowAddToPlaylistMenu(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
          <div className='flex flex-col gap-4'>
            {playlists && playlists.map((playlist, id) => (
              <div className='flex gap-2 p-0.5 cursor-pointer' onClick={() => selectPlaylist(id)}>
                <div>
                  <div className={'flex justify-center items-center size-5 rounded-sm ' + ((selectedPlaylists && selectedPlaylists.find(sp => sp == id) == 0) ? 'bg-[#3ea6ff]' : 'border-2')}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#212121" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </div>
                </div>
                <div>
                  {playlist.name}
                </div>
              </div>
            ))}
          </div>
          <div className='flex gap-2 mt-4 cursor-pointer'>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </div>
            <div>
              <h1>
                Create new playlist
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
