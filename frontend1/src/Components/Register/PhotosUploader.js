import axios from 'axios';
import React from 'react';
import { Image, Transformation } from 'cloudinary-react';

function PhotosUploader({profileImage, setProfileImage, profileBanner, setProfileBanner, toast}) {

  function uploadProfilePicture(e) {
    const file = e.target.files[0];
    const data = new FormData();
    data.append('photos', file);

    toast.promise(
      axios.post('users/upload-profile-image', data),
      {
        pending: {
          render() {
            return 'Uploading profile picture'
          }
        },
        error: {
          render({data}) {
            return data?.response?.data?.message
          }
        },
        success: {
          render({data}) {
            setProfileImage(data.data.data)
            return 'Profile picture uploaded successfully'
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

  function uploadProfileBanner(e) {
    const file = e.target.files[0];
    const data = new FormData();
    data.append('photos', file);

    toast.promise(
      axios.post('users/upload-profile-banner', data),
      {
        pending: {
          render() {
            return 'Uploading profile banner'
          }
        },
        error: {
          render({data}) {
            return data?.response?.data?.message
          }
        },
        success: {
          render({data}) {
            setProfileBanner(data.data.data)
            return 'Profile banner uploaded successfully'
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
    <div className='flex items-center flex-col'>
      <label className='cursor-pointer w-44 h-full block'>
        <input type="file" multiple={false} className='hidden h-full w-full' onChange={e => uploadProfilePicture(e)} />
        {profileImage === '' ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="" className="size-44 fill-gray-700">
            <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
          </svg>
        ) : (
          <div className='size-44 mb-2 bg-transparent'>
            <Image cloudName='dcpi2varq' publicId={profileImage} className='rounded-full'>
              <Transformation crop='scale' width='176' height='176' radius='100'/>
            </Image>
          </div>
        )}
      </label>
      <label className='cursor-pointer w-[30rem] h-full block'>
        <input type="file" multiple={false} className='h-full w-full hidden' onChange={e => uploadProfileBanner(e)} />
        {profileBanner !== '' ? (
          <div className='mb-5'>
            <Image cloudName='dcpi2varq' publicId={profileBanner} className='rounded-xl'>
              <Transformation crop='scale' width='480' height='170' radius='10'/>
            </Image>
          </div>
        ) : (
          <div className='flex justify-end gap-2 pr-10 text-sm text-slate-500'>
            Choose banner 
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
              <path fillRule="evenodd" d="M11.47 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06l-3.22-3.22V16.5a.75.75 0 0 1-1.5 0V4.81L8.03 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5ZM3 15.75a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </label>
    </div>
  )
}

export default PhotosUploader
