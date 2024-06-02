import { Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout';
import Home from './Pages/Home/Home';
import UserContextProvider from './Contexts/User.Context';
import Register from './Pages/Register';
import Login from './Pages/Login';
import axios from 'axios';
import Account from './Pages/Account';
import VideoPage from './Pages/Video';
import { useState } from 'react';
import HistoryPage from './Pages/History';
import SearchPage from './Pages/Search';
import ChannelPage from './Pages/Channel';
import Subscriptions from './Pages/Subscriptions';
import TrendingPage from './Pages/Trending';
import YouPage from './Pages/You';
import SearchPageMobile from './Pages/SearchPage';
import WatchLaterPage from './Pages/WatchLater';
import LikedPage from './Pages/Liked';
import PlaylistsPage from './Pages/Playlists';

const baseURLS = ['https://vtube-server.vercel.app/api/v1', 'http://localhost:8000/api/v1'];

axios.defaults.baseURL = baseURLS[0];
axios.defaults.withCredentials = true;

function App() {
  const [showSidePanel, setShowSidePanel] = useState(true);

  return (
    <UserContextProvider> 
      <Routes>
        <Route path='/' element={<Layout showSidePanel={showSidePanel} setShowSidePanel={setShowSidePanel} />}>
          <Route index element={<Home showSidePanel={showSidePanel} setShowSidePanel={setShowSidePanel} />} />
          <Route path='/subscriptions' element={<Subscriptions />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/video/:videoId' element={<VideoPage showSidePanel={showSidePanel} setShowSidePanel={setShowSidePanel} />} />
          <Route path='/search/:query' element={<SearchPage />} />
          <Route path='/channel/:channelName' element={<ChannelPage />} />
          <Route path='/account' element={<Account />} />
          <Route path='/history' element={<HistoryPage />} />
          <Route path='/watch-later' element={<WatchLaterPage />} />
          <Route path='/playlists' element={<PlaylistsPage />} />
          <Route path='/liked' element={<LikedPage />} />
          <Route path='/trendings' element={<TrendingPage />} />
          <Route path='/you' element={<YouPage />} />
          <Route path='/search-mobile' element={<SearchPageMobile />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
