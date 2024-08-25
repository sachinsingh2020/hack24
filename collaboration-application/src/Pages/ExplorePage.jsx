import React from 'react'
import javaImage from "../assests/java.svg"
import cImage from "../assests/c++.svg"
import pythonImage from "../assests/python.svg"
import javascriptImage from "../assests/javascript.svg"
const ExplorePage = () => {
  return (
    <div className='px-4'>
    <div className='bg-glass max-w-2xl mx-auto rounded-md p-4'>
      <h1 className='text-xl font-bold text-center'>Explore Popular Repositories</h1>
      <div className='flex flex-wrap gap-2 my-2 justify-center'>
        <img
          src={javascriptImage}
          alt='JavaScript ogo'
          className='h-11 sm:h-20 cursor-pointer'
          // onClick={() => exploreRepos("javascript")}
        />
        <img
          src={javascriptImage}
          alt='TypeScript logo'
          className='h-11 sm:h-20 cursor-pointer'
          // onClick={() => exploreRepos("typescript")}
        />
        <img
          src={cImage}
          alt='C++ logo'
          className='h-11 sm:h-20 cursor-pointer'
          // onClick={() => exploreRepos("c++")}
        />
        <img
          src={pythonImage}
          alt='Python logo'
          className='h-11 sm:h-20 cursor-pointer'
          // onClick={() => exploreRepos("python")}
        />
        <img
          src={javaImage}
          alt='Java logo'
          className='h-11 sm:h-20 cursor-pointer'
          // onClick={() => exploreRepos("java")}
        />
      </div>
      {/* {repos.length > 0 && (
        <h2 className='text-lg font-semibold text-center my-4'>
          <span className='bg-blue-100 text-blue-800 font-medium me-2 px-2.5 py-0.5 rounded-full '>
            {selectedLanguage.toUpperCase()}{" "}
          </span>
          Repositories
        </h2>
      )}
      {!loading && repos.length > 0 && <Repos repos={repos} alwaysFullWidth />}
      {loading && <Spinner />} */}
    </div>
  </div>
  )
}

export default ExplorePage