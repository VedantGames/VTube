import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import SidePanel from './SidePanel';

function Layout({ showSidePanel, setShowSidePanel }) {
  return (
    <div className='relative h-screen bg-primary text-white'>
      <Header />
      <div className='flex'>
        <SidePanel showSidePanel={showSidePanel} setShowSidePanel={setShowSidePanel} />
        <Outlet className='h-full overflow-scroll' showSidePanel={showSidePanel} setShowSidePanel={setShowSidePanel} />
      </div>
      <Footer />
    </div>
  )
}

export default Layout
