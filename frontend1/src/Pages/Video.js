import axios from 'axios';
import { Image, Transformation, Video } from 'cloudinary-react';
import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { User } from '../Contexts/User.Context';

function VideoPage({ showSidePanel, setShowSidePanel }) {
  const { videoId } = useParams();
  const { user, setUser } = useContext(User);
  const navigate = useNavigate();

  setShowSidePanel(false);

  const [video, setVideo] = useState(null);
  const [channel, setChannel] = useState(null);

  const [recommendations, setRecommendations] = useState(null);

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  const [videoLiked, setVideoLiked] = useState(false);
  const [videoDisliked, setVideoDisliked] = useState(false);

  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    axios
      .get('videos/video/' + (user !== null ? user._id + '/' : '') + videoId)
      .then(({data}) => {
        setVideo(data.data.video);
        setChannel(data.data.channel);
        setUser(data.data.user);
        console.log(data, channel, data.data.channel);
      })
      .catch(err => console.log(err));
    axios
      .get('videos/all-videos')
      .then(({data}) => setRecommendations(data.data))
      .catch(err => console.log(err));
    }, [videoId]);
    
    useEffect(() => {
      setVideoLiked(user?.likes?.Videos?.some(lvideo => lvideo == videoId));
      setVideoDisliked(user?.dislikes?.Videos?.some(lvideo => lvideo == videoId));
      
    axios
      .get('videos/comments/' + videoId)
      .then(({data}) => setComments(data.data))
      .catch(err => console.log(err));
  }, [videoId, user])

  const subscribe = () => {
    if (!user) return <Navigate to={'/register'} />;
    axios
      .post('videos/subscribe', { userId: user._id, channelId: channel._id })
      .then(({data}) => {
        setUser(data.data.user);
        setChannel(data.data.channel);
      })
      .catch(err => console.log(err))
  }

  const unsubscribe = () => {
    axios
      .post('/videos/unsubscribe', { userId: user._id, channelId: channel._id })
      .then(({data}) => {
        setUser(data.data.user);
        setChannel(data.data.channel);
      })
      .catch(err => console.log(err))
  }

  const like = () => {
    if (!user) return <Navigate to={'/register'} />;
    axios
      .post('/videos/like', { userId: user._id, videoId: video._id})
      .then(({data}) => {
        setUser(data.data.user);
        setVideo(data.data.video)
      })
      .catch(err => console.log(err))
  };
  
  const unlike = () => {
    if (!user) return <Navigate to={'/register'} />;
    axios
      .post('/videos/unlike', { userId: user._id, videoId: video._id})
      .then(({data}) => {
        setUser(data.data.user);
        setVideo(data.data.video)
      })
      .catch(err => console.log(err))
  };

  const dislike = () => {
    if (!user) return <Navigate to={'/register'} />;
    axios
      .post('/videos/dislike', { userId: user._id, videoId: video._id})
      .then(({data}) => {
        setUser(data.data.user);
        setVideo(data.data.video)
      })
      .catch(err => console.log(err))
  };

  const undislike = () => {
    if (!user) return <Navigate to={'/register'} />;
    axios
      .post('/videos/undislike', { userId: user._id, videoId: video._id})
      .then(({data}) => {
        setUser(data.data.user);
        setVideo(data.data.video)
      })
      .catch(err => console.log(err))
  };

  const commentOnVideo = () => {
    axios
      .post('comments/add-comment', { owner: user._id, video: videoId, content: comment })
      .then(({data}) => {
        setComment('');
        setUser(data.data.user)
        setVideo(data.data.video);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='h-full min-h-[93.3vh] w-full md:px-20 px-7 pt-5 text-[#f1f1f1] font-[arial]'>
      {(video && channel) && (
        <div className='flex lg:flex-row lg:gap-0 flex-col gap-10'>
          <div className='w-full'>
            <div>
              <Video cloudName='dcpi2varq' publicId={video.videoFile} controls='true' className='rounded-xl'>
              </Video>
            </div>
            <div className='mt-2'>
              <h1 className='sm:text-xl font-bold'>
                {video.title}
              </h1>
            </div>
            <div className='md:mt-2 mt-4'>
              <div className='flex justify-between md:flex-row flex-col md:gap-0 gap-3'>
                <div className='flex gap-3'>
                  <div className='size-10'>
                    {channel.profileImage !== '' ? (
                      <Image cloudName='dcpi2varq' publicId={channel.profileImage} className='rounded-full'>

                      </Image>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="2 2 20 20" fill="currentColor" className="size-11/12">
                        <path className='w-full' fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <div>
                      <h1 className='font-bold sm:text-base text-sm'>
                        {channel.fullName} 
                      </h1>
                    </div>
                    <div>
                      <h2 className='text-[#AAA] text-xs'>
                        {channel.subscribers} subscribers
                      </h2>
                    </div>
                  </div>
                  <div className='sm:ml-3'>
                    {(user && user.subscriptions.some(subscription => subscription == channel._id)) ? (
                      <button className='bg-[#272727] hover:bg-[#333] text-[#f1f1f1] font-semibold sm:text-sm text-xs p-2 rounded-full' onClick={unsubscribe}>
                        Subscribed
                      </button>
                    ) : (
                      <button className='bg-[#f1f1f1] hover:bg-[#ddd] text-[#0f0f0f] font-semibold sm:text-sm text-xs p-2 rounded-full' onClick={subscribe}>
                        Subscribe
                      </button>
                    )}
                  </div>
                </div>
                <div className='flex justify-between gap-2 h-9'>
                  <div className='flex items-center bg-[#272727] h-9 w-full min-w-36 max-w-36 rounded-full'>
                    <button className='flex items-center bg-[#272727] hover:bg-[#3f3f3f] rounded-s-full min-w-[5.5rem] w-full h-9' onClick={(!videoLiked ? like : unlike)}>
                      <div className='ml-4'>
                        {videoLiked ? (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                          </svg>
                        )}
                      </div>
                      <div className='w-full pr-3'>
                        <h1>
                          {video.likes}
                        </h1>
                      </div>
                    </button>
                    <div className='w-0 border border-[#525252] h-1/2'></div>
                    <button className='flex items-center justify-center bg-[#272727] hover:bg-[#3f3f3f] rounded-e-full w-full h-9' onClick={(!videoDisliked ? dislike : undislike)}>
                      <div>
                        {videoDisliked ? (
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path d="M15.73 5.5h1.035A7.465 7.465 0 0 1 18 9.625a7.465 7.465 0 0 1-1.235 4.125h-.148c-.806 0-1.534.446-2.031 1.08a9.04 9.04 0 0 1-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.499 4.499 0 0 0-.322 1.672v.633A.75.75 0 0 1 9 22a2.25 2.25 0 0 1-2.25-2.25c0-1.152.26-2.243.723-3.218.266-.558-.107-1.282-.725-1.282H3.622c-1.026 0-1.945-.694-2.054-1.715A12.137 12.137 0 0 1 1.5 12.25c0-2.848.992-5.464 2.649-7.521C4.537 4.247 5.136 4 5.754 4H9.77a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23ZM21.669 14.023c.536-1.362.831-2.845.831-4.398 0-1.22-.182-2.398-.52-3.507-.26-.85-1.084-1.368-1.973-1.368H19.1c-.445 0-.72.498-.523.898.591 1.2.924 2.55.924 3.977a8.958 8.958 0 0 1-1.302 4.666c-.245.403.028.959.5.959h1.053c.832 0 1.612-.453 1.918-1.227Z" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                          </svg>
                        )}
                      </div>
                    </button>
                  </div>
                  <div className='flex gap-2'>
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
            <div className='w-full p-3 mt-3 rounded-xl font-[arial] bg-[#272727]'>
                <div>
                  <h1 className='font-bold text-sm'>
                    {video.views} views {video.timePassed} ago
                  </h1>
                </div>
                <div className='flex'>
                  <h1 className={'mt-2 max-w-[73rem] font-medium text-sm ' + (!showDescription ? 'line-clamp-2' : '')}>
                    {video.description}
                  </h1>
                  <div className='flex items-end'>
                    <button className='font-semibold -mb-0.5' onClick={() => setShowDescription(!showDescription)}>{showDescription ? ('hide') : ('...more')}</button>
                  </div>
                </div>
            </div>
            <div className='mt-3 font-[arial]'>
              <div>
                <h1 className='text-2xl font-bold'>
                  {video.comments.length} Comments
                </h1>
              </div>
              <div className='mb-5'>
                <div className='flex flex-col'>
                  <div className='flex items-center mt-2'>
                    <div className='size-12'>
                      {user?.profileImage !== '' ? (
                        <Image cloudName='dcpi2varq' publicId={user?.profileImage} className='rounded-full'>

                        </Image>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="2 2 20 20" fill="currentColor" className="size-11/12">
                          <path className='w-full' fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className='w-full pl-5'>
                      <input 
                        type="text" 
                        className='bg-transparent w-full text-[15px] border-b border-[#3f3f3f] focus-visible:border-[#f1f1f1] focus-visible:border-b-2 focus-visible:outline-none'
                        placeholder='Add a comment...'
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className={'flex justify-end w-full gap-2 py-1 ' + (comment === '' && 'hidden')}>
                    <button className='text-sm font-semibold px-4 py-2 rounded-full hover:bg-[#1f1f1f]' onClick={() => setComment('')}>Cancel</button>
                    <button className='text-sm font-semibold px-4 py-2 rounded-full hover:bg-[hsl(208,100%,67%)] bg-[#3ea6ff] text-[#0f0f0f]' onClick={commentOnVideo}>Comment</button>
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-5'>
                {comments.length > 0 && comments.map(comment => (
                  <div key={comment._id} className='flex gap-2 font-[arial]'>
                    <div className='size-12'>
                      {comment.owner.profileImage !== '' ? (
                        <Image cloudName='dcpi2varq' publicId={comment.owner.profileImage} className='rounded-full'>

                        </Image> 
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="2 2 20 20" fill="currentColor" className="size-11/12">
                          <path className='w-full' fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className='w-5/6'>
                      <div className='flex items-center'>
                        <h1 className='text-sm font-semibold text-[#f1f1f1]'>
                          @{comment.owner.userName}
                        </h1>
                        <h2 className='text-xs text-[#aaa] ml-1'>
                          {comment.timePassed}
                        </h2>
                      </div>
                      <div>
                        <h1 className='text-sm text-[#f1f1f1] my-2'>
                          {comment.content}
                        </h1>
                      </div>
                      <div>
                        <div className='flex gap-2'>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                          </svg>
                          <h1>
                            {comment.likes}
                          </h1>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='flex flex-col md:gap-3 gap-6 w-full lg:max-w-[27.5rem] md:justify-start justify-center sm:pl-10'>
            {recommendations && recommendations.map((video, i) => (
              <Link to={'/video/'+video._id} key={i} className='lg:grid xl:grid-cols-[1.4fr_2fr] w-full flex flex-col justify-center'>
                <div className='relative flex flex-col'>
                  <Image cloudName='dcpi2varq' publicId={video.thumbnail} >
                    <Transformation crop='scale' radius='10' height='300' width='530' />
                  </Image>
                  <div className='absolute z-10 flex justify-center items-center md:text-base text-xs bg-black opacity-60 px-1.5 bottom-1 right-2 rounded-md'>
                    <h1 className='opacity-100'>
                      {video.duration}
                    </h1>
                  </div>
                </div>
                <div className='sm:ml-4 ml-1 sm:mt-0 mt-1'>
                  <div>
                    <h1 className='lg:text md:text-base sm:text-sm text-lg font-semibold line-clamp-2'>
                      {video.title}
                    </h1>
                  </div>
                  <div className='text-[#AAA] sm:text-xs text-xs'>
                    <div>
                      {video.channelName} ‧ {video.views} views ‧ {video.timePassed} ago
                    </div>
                    <div className='md:mt-2 md:line-clamp-2 line-clamp-1'>
                      <h1>
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

export default VideoPage