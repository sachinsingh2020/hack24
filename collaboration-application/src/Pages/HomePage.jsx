import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { addProject } from '../utils/projectsSlice';
import { getProjects } from '../redux/actions/project';
import Search from '../components/Search'
import SortRepo from '../components/SortRepo';
import ProfileInfo from '../components/ProfileInfo'
import Repos from '../components/Repos';
const HomePage = () => {
  const [projects, setProjects] = useState([]);

  const dispatch = useDispatch();

  const getAllProjects = async () => {
    await dispatch(getProjects());
  }

  useEffect(() => {
    getAllProjects();
  }, [])

  // useEffect(async () => {
  //   const response = await axios.get('https://iiit-colloboration-app-backend-2.vercel.app/api/v1/getallpublicrepos');
  //   const data = response.data.publicRepos;
  //   console.log({ data });
  //   setProjects(data);
  //   dispatch(addProject(data));
  // }, [])
  return (
    <div className='m-4'>
      {/* <Search onSearch={onSearch} />
			{repos.length > 0 && <SortRepos onSort={onSort} sortType={sortType} />}
			<div className='flex gap-4 flex-col lg:flex-row justify-center items-start'>
				{userProfile && !loading && <ProfileInfo userProfile={userProfile} />}

				{!loading && <Repos repos={repos} />}
				{loading && <Spinner />}
			</div> */}
      <Search />
      <SortRepo />
      <div
        className='flex gap-4 flex-col lg:flex-row justify-center items-start'
      >
        <ProfileInfo />

        <Repos />
      </div>
    </div>
  )
}

export default HomePage