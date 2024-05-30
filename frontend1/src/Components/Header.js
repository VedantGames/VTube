import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { User } from '../Contexts/User.Context';
import { Image, Transformation } from 'cloudinary-react';

function Header() {
  const {user} = useContext(User);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [navigateQuery, setNavigateQuery] = useState('');

  const search1 = () => setNavigateQuery('search/'+searchQuery);

  const [timeout, st] = useState(null);
  
  const search = () => {
    clearTimeout(timeout);

    if (searchQuery !== '')
      st(setTimeout(() => navigate('search/'+searchQuery), 200));
  };

  useEffect(() => {
    navigate(navigateQuery);
  }, [navigateQuery])

  return (
    <div className="md:px-5 px-2 py-3 flex justify-between">
      <div className="mr-0 flex">
        <div className="lg:flex items-center hidden">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </div>
        <Link to={'/'} className="relative flex items-center md:pl-5 pl-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 z-10" viewBox="0 0 576 512"><path fill="#ff0000" d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z"/></svg>
          <span className="absolute bg-white h-2 w-4 ml-3"></span>
          <h1 className="font-bold text-xl mt-0.5 ml-1" style={{fontFamily: 'arial'}}>VTube</h1>
        </Link>
      </div>
      <div className="h-10 lg:flex md:flex justify-center hidden" style={{width: "40%"}}>
        <div className="flex items-center w-full border-2 border-stone-800 px-4 rounded-s-full">
          <input 
            type="text" 
            placeholder="Search" 
            id='searchBar'
            className="w-full outline-none bg-primary"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onKeyUp={event => search()}
          />
        </div>
        <div className="flex justify-center items-center w-16 bg-stone-800 rounded-e-full">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </div>
        <div className="flex justify-center items-center ml-2">
          <div className="flex justify-center items-center bg-stone-800 rounded-full h-full w-10">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
              <path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-5 justify-end">
        <div className="block md:hidden lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </div>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
          </svg>
        </div>
        <div>
          {user ? (
            <Link to="/account" className="flex justify-center items-center bg-slate-800 h-9 w-9 rounded-full">
              {user.profileImage ? (
                <Image cloudName='dcpi2varq' publicId={user.profileImage} className='rounded-full'>
                  <Transformation crop='scale' width='176' height='176' radius='100'/>
                </Image>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10/12 h-10/12">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              )}
              <img src={user.profileImage} />
            </Link>
          ) : (
            <Link to="/register" className="flex justify-center items-center bg-slate-800 h-9 w-9 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10/12 h-10/12">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;