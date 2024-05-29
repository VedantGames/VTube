import axios from 'axios';
import { Image, Transformation, Video } from 'cloudinary-react';
import React, { useContext, useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import { User } from '../../Contexts/User.Context';

function VideoUploader({setShowVideoUploader}) {
  const {user, setUser} = useContext(User);
  const [videoURL, setVideoURL] = useState('');
  const [duration, setVideoDuration] = useState(0);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnailURL, setThumbnailURL] = useState(['', '', '']);
  const [selectedThumbnail, setSelectedThumbnail] = useState(0);
  const [madeForKids, setMadeForKids] = useState(false);
  const [visiblity, setVisiblity] = useState('Public');

  function publishVideo() {
    const data = {
      owner: user._id,
      videoURL,
      thumbnail: thumbnailURL[selectedThumbnail],
      title,
      description,
      duration,
      visiblity,
      madeForKids
    }

    toast.promise(
      axios.post('videos/publish-video', data),
      {
        pending: 'Publishing video',
        error: {
          render({data}) {
            return data.response.data.message;
          }
        },
        success: {
          render({data}) {
            setShowVideoUploader(false);
            setUser(data.data.data.user);
            return 'Video published successfully';
          }
        }
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
  }

  function uploadVieo(e) {
    const file = e.target.files[0];
    const data = new FormData();
    data.append('video', file);

    toast.promise(
      axios.post('videos/upload-video', data),
      {
        pending: {
          render() {
            return 'Uploading video'
          }
        },
        error: {
          render({data}) {
            return data.response.data.message;
          }
        },
        success: {
          render({data}) {
            setVideoURL(data.data.data.public_id);
            setVideoDuration(data.data.data.duration);
            return 'Video uploaded successfully';
          }
        }
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
  }

  function uploadThumbnail(e) {
    const file = e.target.files[0];
    const data = new FormData();
    data.append('image', file);

    toast.promise(
      axios.post('videos/upload-thumbnail', data),
      {
        pending: {
          render() {
            return 'Uploading thumbnail'
          }
        },
        error: {
          render({data}) {
            return data.response.data.message;
          }
        },
        success: {
          render({data}) {
            setThumbnailURL([data.data.data, thumbnailURL[0], thumbnailURL[1]]);
            return 'Thumbnail uploaded successfully';
          }
        }
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
  }

  return (
    <div className='absolute top-0 left-0 flex items-center justify-center h-svh w-full'>
      <div className='bg-[#282828] rounded-lg w-[65rem] h-[45rem]'>
        <div className='flex justify-between px-6 py-4'>
          <h1 className='text-2xl font-semibold'>
            {videoURL === '' ? 'Upload video' : (title === '' ? 'Title' : title)}
          </h1>
          <div className='cursor-pointer' onClick={() => setShowVideoUploader(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
        {videoURL === '' ? (
          <div className='flex justify-center items-center flex-col h-[40rem]'>
            <div>
              <div className='rounded-full cursor-pointer bg-[#1f1f1f] size-32 flex justify-center items-center'>
                <label>
                  <input type="file" className='hidden' onChange={e => uploadVieo(e)} />
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#aaa" className="size-14">
                    <path fillRule="evenodd" d="M11.47 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06l-3.22-3.22V16.5a.75.75 0 0 1-1.5 0V4.81L8.03 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5ZM3 15.75a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                  </svg>
                </label>
              </div>
            </div>
            <div className='flex items-center flex-col mt-4 font-[arial]'>
              <span>Select your video file to upload</span>
              <span className='text-xs text-[#aaa]'>Yout videos will be private until you publish them</span>
            </div>
          </div>
        ) : (
          <div className=''>
            <div className='flex px-5'>
              <div className='w-full max-h-[37rem] flex flex-col font-[arial] overflow-auto mb-2'>
                <h1 className='text-2xl mb-2'>
                  Details
                </h1>
                <input 
                  type="text"
                  placeholder='Title (required)'
                  className='bg-transparent border border-[#221919] hover:border-[#909090] outline-none focus-visible:border-none focus-visible:outline-none focus-visible:outline focus-visible:outline-[#3ea6ff] rounded-xm mb-3 px-3 py-2'
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
                <div className='h-32'>
                  <textarea 
                    type="text"
                    placeholder='Description'
                    className='bg-transparent w-full h-full border border-[#221919] hover:border-[#909090] outline-none focus-visible:border-none focus-visible:outline-none focus-visible:outline focus-visible:outline-[#3ea6ff] rounded-xm mb-4 px-3 py-2'
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />
                </div>
                <h1 className='font-semibold text-sm mb-2'>
                  Thumbnail
                </h1>
                <h2 className='text-xs text-[#aaa]'>
                  Select or upload a picture that shows what's in your video. A good thumbnail stands out and draws viewers' attention.
                </h2>
                <div className='h-16 flex gap-2 mb-4'>
                  <label className='flex flex-col cursor-pointer h-full w-full justify-center items-center border border-stone-700'>
                    <input type="file" className='hidden' onChange={e => uploadThumbnail(e)}/>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                      <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" />
                    </svg>
                    <h1 className='text-xs'>
                      Upload thumbnail
                    </h1>
                  </label>
                  {thumbnailURL.length > 0 && thumbnailURL.map((thumbnail, i) => 
                    <div className={'h-full w-full ' + (selectedThumbnail === i ? 'outline outline-offset-1' : 'opacity-75')} onClick={() => setSelectedThumbnail(i)}>
                      {thumbnail === '' ? (
                        <Video cloudName='dcpi2varq' publicId={videoURL+'.jpg'} >
                          <Transformation startOffset="auto" radius='10'/> 
                        </Video>
                      ) : (
                        <Image cloudName='dcpi2varq' publicId={thumbnail} >
                          <Transformation crop='scale' height='64' width='120'/>
                        </Image>
                      )}
                    </div>
                  )}
                </div>
                <h1 className='font-semibold text-sm mb-1'>
                  Audience
                </h1>
                <h2 className='text-xs font-semibold mb-1'>
                  Is this video 'Made for Kids'? (required)
                </h2>
                <h3 className='text-xs text-[#aaa] mb-3'>
                  Regardless of your location, you're legally required to comply with the Children's Online Privacy Protection Act (COPPA) and/or other laws. You're required to tell us whether your videos are 'Made for Kids'.
                </h3>
                <div className='flex flex-col gap-1 mb-4'>
                  <div className='flex relative'>
                    <span className='flex justify-center items-center size-5 border-2 mr-2 border-gray-400 rounded-full' onClick={() => setMadeForKids(true)}>
                      {madeForKids && (
                        <span className='bg-gray-400 size-2.5 rounded-full'></span>
                      )}
                    </span>
                    <h1>
                      Yes, it's 'Made for Kids'.
                    </h1>
                  </div>
                  <div className='flex relative'>
                    <span className='flex justify-center items-center size-5 border-2 mr-2 border-gray-400 rounded-full' onClick={() => setMadeForKids(false)}>
                      {!madeForKids && (
                        <span className='bg-gray-400 size-2.5 rounded-full'></span>
                      )}
                    </span>
                    <h1>
                      No, it's not 'Made for Kids'
                    </h1>
                  </div>
                </div>
                <div>
                  <h1 className='font-semibold text-lg mb-1'>
                    Visiblity
                  </h1>
                  <h2 className='text-base font-semibold mb-1'>
                    Save or publish
                  </h2>
                  <h3 className='text-xs text-[#aaa] mb-3'>
                    Make your video <b>public</b>, <b>unlisted</b> or <b>private</b>
                  </h3>
                  <div className='flex flex-col gap-2'>
                    <div className='flex items-center'>
                      <span className="flex justify-center items-center size-5 border-2 mr-2 border-gray-400 rounded-full" onClick={() => setVisiblity('Public')}>
                        {visiblity === 'Public' && (
                          <span className='bg-gray-400 size-2.5 rounded-full'></span>
                        )}
                      </span>
                      <h1 className='text-lg'>Public</h1>
                    </div>
                    <div className='flex items-center'>
                      <span className="flex justify-center items-center size-5 border-2 mr-2 border-gray-400 rounded-full" onClick={() => setVisiblity('Unlisted')}>
                        {visiblity === 'Unlisted' && (
                          <span className='bg-gray-400 size-2.5 rounded-full'></span>
                        )}
                      </span>
                      <h1 className='text-lg'>Unlisted</h1>
                    </div>
                    <div className='flex items-center'>
                      <span className="flex justify-center items-center size-5 border-2 mr-2 border-gray-400 rounded-full" onClick={() => setVisiblity('Private')}>
                        {visiblity === 'Private' && (
                          <span className='bg-gray-400 size-2.5 rounded-full'></span>
                        )}
                      </span>
                      <h1 className='text-lg'>Private</h1>
                    </div>
                  </div>
                </div>
              </div>
              <div className='w-full'>
                <div className='px-4'>
                  <Video cloudName='dcpi2varq' publicId={videoURL} controls='true'>
                  </Video>
                </div>
              </div>
            </div>
            <hr className='border-[#aaa] mb-2' />
            <div className='flex justify-end'>
              <button className='bg-[#3ea6ff] text-black px-7 py-2 mr-2' onClick={publishVideo}>Next</button>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  )
}

export default VideoUploader
