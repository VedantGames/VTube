import React from 'react'

function SearchPageMobile() {
  return (
    <div className='flex justify-center items-center gap-2 px-3 w-full'>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
          <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
        </svg>
      </div>
      <div className='w-full'>
        <div className="flex items-center w-full bg-gray-800 px-4 py-1 rounded-full">
          <input 
            type="text" 
            placeholder="Search" 
            id='searchBar'
            className="w-full outline-none bg-transparent"
            // value={searchQuery}
            // onChange={e => setSearchQuery(e.target.value)}
            // onKeyUp={event => search()}
          />
        </div>
      </div>
      <div className="flex justify-center items-center p-1.5 bg-gray-800 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
              <path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z" />
            </svg>
        </div>
    </div>
  )
}

export default SearchPageMobile
