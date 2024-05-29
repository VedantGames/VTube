import axios from 'axios';
import { Image, Transformation } from 'cloudinary-react';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import VideoSection from '../Components/User/VideoSection';
import ChannelVideoSection from '../Components/ChannelVideoSection';
import { User } from '../Contexts/User.Context';
import { Navigate } from 'react-router-dom';

function ChannelPage() {
  const {user, setUser} = useContext(User);

  const { channelName } = useParams();
  const [channel, setChannel] = useState(null);

  const [selectedTab, setSelectedTab] = useState('Home');

  const getTabBtnStyle = tabName => {
    return selectedTab === tabName ? 'border-b-2 border-[#f1f1f1] text-[#f1f1f1]' : 'text-[#AAA] hover:border-b-2 hover:border-[#AAA]';
  }

  const subscribe = () => {
    if (!user) return <Navigate to={'/login'} />;
    axios
      .post('/users/subscribe', { userId: user._id, channelId: channel._id })
      .then(({data}) => {
        setUser(data.data.user);
        setChannel(data.data.channel);
      })
      .catch(err => console.log(err))
  }

  const unsubscribe = () => {
    axios
      .post('/users/unsubscribe', { userId: user._id, channelId: channel._id })
      .then(({data}) => {
        setUser(data.data.user);
        setChannel(data.data.channel);
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    axios
      .get('/users/channel/'+channelName)
      .then(({data}) => setChannel(data.data))
      .catch(err => console.log(err));
  }, [channelName])

  return (
    <div className='w-full'>
      {channel && (
        <div className='relative w-full 2xl:px-56 md:px-14 sm:px-10 px-2'>
          <div>
            <div className='flex flex-col w-full'>
              <div className='flex justify-center w-full max-h-[200px] mb-8'>
                <Image cloudName='dcpi2varq' publicId={channel.bannerImage} className='rounded-xl'>
                  <Transformation crop='scale' width='1200' height='200' radius='10' />
                </Image>
              </div>
              <div className='flex mb-4'>
                <div>
                  {channel.profileImage ? (
                    <Image cloudName='dcpi2varq' publicId={channel.profileImage} className='rounded-full'>
                      <Transformation crop='scale' width='160' height='160' />
                    </Image>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="2 2 20 20" fill="currentColor" className="w-7/12 sm:pl-20">
                      <path className='w-full' fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <div style={{fontFamily: 'arial'}} className='flex flex-col ml-2'>
                  <div>
                    <div className='mb-1'>
                      <h1 className='sm:text-4xl text-lg font-bold'>
                        {channel.fullName}
                      </h1>
                    </div>
                    <div className='text-[#AAA] sm:text-sm text-[0.7rem] ml-1'>
                      <div className='mb-1'>
                        <h1>
                          @{channel.userName} {channel.subscribers > 0 && ('‧ ' + channel.subscribers + ' subscribers')} {channel?.videos?.length > 0 && (' ‧ ' + channel.videos.length + ' videos')}
                        </h1>
                      </div>
                      <div className='flex'>
                        <span className='max-w-min block'>
                          <h1 className='line-clamp-1'>
                            {channel.bio !== '' ? (channel.bio) : ('More about this channel')}
                          </h1>
                        </span>{'>'}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className='flex gap-2 mt-5'>
                      {(user && user.subscriptions.some(subscription => subscription == channel._id)) ? (
                        <button className='bg-[#272727] hover:bg-[#333] text-[#f1f1f1] font-bold rounded-full px-3.5 py-2' onClick={unsubscribe}>
                          Subscribed
                        </button>
                      ) : (
                      <button className='bg-[#f1f1f1] hover:bg-[#ddd] text-[#0f0f0f] font-bold rounded-full px-3.5 py-2' onClick={subscribe}>
                        Subscribe
                      </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className='mt-3 font-semibold'>
                <div className='flex gap-5' style={{fontFamily: 'arial'}}>
                  <button className={'pb-1.5 ' + getTabBtnStyle('Home')} onClick={() => setSelectedTab('Home')}>Home</button>
                  <button className={'pb-1.5 ' + getTabBtnStyle('Videos')} onClick={() => setSelectedTab('Videos')}>Videos</button>
                  <button className={'pb-1.5 ' + getTabBtnStyle('Shorts')} onClick={() => setSelectedTab('Shorts')}>Shorts</button>
                  <button className={'pb-1.5 ' + getTabBtnStyle('Tweets')} onClick={() => setSelectedTab('Tweets')}>Tweets</button>
                </div>
              </div>
            </div>
            <hr className='border-[#AAA] border-b border-t-0 w-full'/>
            {(selectedTab === 'Videos' || selectedTab === 'Home') && (
              <div>
                <ChannelVideoSection channelId={channel._id}></ChannelVideoSection> 
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ChannelPage
