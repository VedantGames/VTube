import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { User } from '../Contexts/User.Context';
import { Image, Transformation } from 'cloudinary-react';
import axios from "axios";

function SidePanel({ showSidePanel, setShowSidePanel }) {
  const { user } = useContext(User);

  const [currentSlide, setCurrentSlide] = useState('home');
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    if (user)
      axios
        .get('/users/subscriptions/'+user?._id)
        .then(({data}) => setSubscriptions(data.data.subscriptions)) 
        .catch(err => console.log(err));
  }, [user]);

  function getOpacity(slide) {
    if (currentSlide === slide)
      return 'bg-opacity-100';
    return 'bg-opacity-0';
  }

  function selectSlide(slide) {
    setCurrentSlide(slide);
  }

  return (
    <div className={'px-2 pt-2 h-full max-h-[93.3vh] w-60 min-w-60 overflow-x-hidden overflow-y-scroll hidden ' + (showSidePanel && 'lg:block')}>
      <div className='pb-2'>
        <Link to={'/'} className={'flex h-10 py-2.5 bg-zinc-800 hover:bg-opacity-100 w-52 rounded-xl ' + getOpacity('home')} onClick={() => selectSlide('home')}>
          <div className='ml-4 mr-6'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className='font-semibold text-sm'>
            Home
          </h1>
        </Link>
        <Link className={'flex h-10 py-2.5 bg-zinc-800 hover:bg-opacity-100 w-52 rounded-xl ' + getOpacity('shorts')} onClick={() => selectSlide('shorts')}>
          <div className='ml-4 mr-6'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path d="M8 16.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z" />
              <path fillRule="evenodd" d="M4 4a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4Zm4-1.5v.75c0 .414.336.75.75.75h2.5a.75.75 0 0 0 .75-.75V2.5h1A1.5 1.5 0 0 1 14.5 4v12a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 16V4A1.5 1.5 0 0 1 7 2.5h1Z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className='font-semibold text-sm'>
            Shorts
          </h1>
        </Link>
        <Link to={'/subscriptions'} className={'flex h-10 py-2.5 bg-zinc-800 hover:bg-opacity-100 w-52 rounded-xl ' + getOpacity('subscriptions')} onClick={() => selectSlide('subscriptions')}>
          <div className='ml-4 mr-6 mb-1'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
          <h1 className='font-semibold text-sm'>
            Subscriptions
          </h1>
        </Link>
      </div>
      <hr className='border-gray-500'/>
      <div className='my-2'>
        <Link className={'flex h-10 py-2.5 bg-zinc-800 hover:bg-opacity-100 w-52 rounded-xl ' + getOpacity('you')} onClick={() => selectSlide('you')}>
          <h1 className='font-semibold text-base ml-5 mr-6'>
            You
          </h1>
        </Link>
        <Link to={'/account'} className={'flex h-10 py-2.5 bg-zinc-800 hover:bg-opacity-100 w-52 rounded-xl ' + getOpacity('yourChannel')} onClick={() => selectSlide('yourChannel')}>
          <div className='ml-4 mr-6 mb-1'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          </div>
          <h1 className='font-semibold text-sm'>
            Your Channel
          </h1>
        </Link>
        <Link to={'/history'} className={'flex h-10 py-2.5 bg-zinc-800 hover:bg-opacity-100 w-52 rounded-xl ' + getOpacity('history')} onClick={() => selectSlide('history')}>
          <div className='ml-4 mr-6 mb-1'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
          <h1 className='font-semibold text-sm'>
            History
          </h1>
        </Link>
        <Link to={'/playlists'} className={'flex h-10 py-2.5 bg-zinc-800 hover:bg-opacity-100 w-52 rounded-xl ' + getOpacity('playlist')} onClick={() => selectSlide('playlist')}>
          <div className='ml-4 mr-6 mb-1'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
            </svg>
          </div>
          <h1 className='font-semibold text-sm'>
            Playlists
          </h1>
        </Link>
        <Link className={'flex h-10 py-2.5 bg-zinc-800 hover:bg-opacity-100 w-52 rounded-xl ' + getOpacity('yourVideo')} onClick={() => selectSlide('yourVideo')}>
          <div className='ml-4 mr-6 mb-1'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
            </svg>
          </div>
          <h1 className='font-semibold text-sm'>
            Your Videos
          </h1>
        </Link>
        <Link to={'/watch-later'} className={'flex h-10 py-2.5 bg-zinc-800 hover:bg-opacity-100 w-52 rounded-xl ' + getOpacity('Watch Later')} onClick={() => selectSlide('Watch Later')}>
          <div className='ml-4 mr-6 mb-1'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
          <h1 className='font-semibold text-sm'>
            Watch Later
          </h1>
        </Link>
        <Link to={'/liked'} className={'flex h-10 py-2.5 bg-zinc-800 hover:bg-opacity-100 w-52 rounded-xl ' + getOpacity('likedVideos')} onClick={() => selectSlide('likedVideos')}>
          <div className='ml-4 mr-6 mb-1'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
            </svg>
          </div>
          <h1 className='font-semibold text-sm'>
            Liked Videos
          </h1>
        </Link>
      </div>
      {subscriptions.length > 0 && (
        <div>
          <hr className='border-gray-500 py-2'/>
          <div className='mb-2'>
            <h1 className='font-semibold text-base ml-4 mr-6 mb-2'>
              Subscriptions
            </h1>
          {subscriptions.map((subscription, i) => (
            <Link to={'/channel/'+subscription.userName} key={i} className={'flex h-10 py-2.5 bg-zinc-800 hover:bg-opacity-100 w-52 rounded-xl ' + getOpacity(subscription.fullName)} onClick={() => selectSlide(subscription.fullName)}>
              <div className='ml-4 mr-6 mb-1 h-6 w-6'>
                {subscription.profileImage !== '' ? (
                  <Image cloudName='dcpi2varq' publicId={subscription.profileImage} className='rounded-full'>
                    <Transformation crop='scale' height='100' width='100' />
                  </Image>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="2 2 20 20" fill="currentColor" className="size-full">
                    <path className='w-full' fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <h1 className='font-semibold text-sm'>
                {subscription.fullName}
              </h1>
            </Link>
            ))}
          </div>
        </div>
      )}
      <hr className='border-gray-500 py-2'/>
      <div className=''>
        <h1 className='font-semibold text-base ml-3 mr-6 mb-2'>
          Explore
        </h1>
        <Link to={'/trendings'} className={'flex h-10 py-2.5 bg-zinc-800 hover:bg-opacity-100 w-52 rounded-xl ' + getOpacity('trending')} onClick={() => selectSlide('trending')}>
          <div className='ml-4 mr-6 mb-1'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
            </svg>
          </div>
          <h1 className='font-semibold text-sm'>
            Trending
          </h1>
        </Link>
        <Link className={'flex h-10 py-2.5 bg-zinc-800 hover:bg-opacity-100 w-52 rounded-xl ' + getOpacity('music')} onClick={() => selectSlide('music')}>
          <div className='ml-4 mr-6 mb-1'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z" />
            </svg>
          </div>
          <h1 className='font-semibold text-sm'>
            Music
          </h1>
        </Link>
        <Link className={'flex h-10 py-2.5 bg-zinc-800 hover:bg-opacity-100 w-52 rounded-xl ' + getOpacity('films')} onClick={() => selectSlide('films')}>
          <div className='ml-4 mr-6 mb-1'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0 1 18 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0 1 18 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 0 1 6 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5" />
            </svg>
          </div>
          <h1 className='font-semibold text-sm'>
            Films
          </h1>
        </Link>
        <Link className={'flex h-10 py-2.5 bg-zinc-800 hover:bg-opacity-100 w-52 rounded-xl ' + getOpacity('live')} onClick={() => selectSlide('live')}>
          <div className='ml-4 mr-6 mb-1'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
          </div>
          <h1 className='font-semibold text-sm'>
            Live
          </h1>
        </Link>
        <Link className={'flex h-10 py-2.5 bg-zinc-800 hover:bg-opacity-100 w-52 rounded-xl ' + getOpacity('gaming')} onClick={() => selectSlide('gaming')}>
          <div className='ml-4 mr-6 mb-1'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495" />
            </svg>
          </div>
          <h1 className='font-semibold text-sm'>
            Gaming
          </h1>
        </Link>
        <Link className={'flex h-10 py-2.5 bg-zinc-800 hover:bg-opacity-100 w-52 rounded-xl ' + getOpacity('news')} onClick={() => selectSlide('news')}>
          <div className='ml-4 mr-6 mb-1'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
            </svg>
          </div>
          <h1 className='font-semibold text-sm'>
            News
          </h1>
        </Link>
      </div>
    </div>
  )
}

export default SidePanel
