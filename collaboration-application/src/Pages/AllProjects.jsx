import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { openProject } from '../redux/actions/project';

const AllProjects = () => {
    const { projects } = useSelector((state) => state.projects);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const openProjectFunction = async (e, projectId) => {
        e.preventDefault();

        await dispatch(openProject(projectId));
        await navigate(`/project/${projectId}`);
    }

    return (
        <div className='relative overflow-x-auto shadow-md rounded-lg px-4'>
            <table className='w-full text-sm text-left rtl:text-right bg-glass overflow-hidden'>
                <thead className='text-xs uppercase bg-glass'>
                    <tr>
                        <th scope='col' className='p-4'>
                            <div className='flex items-center'>No</div>
                        </th>
                        <th scope='col' className='px-6 py-3'>
                            Project Name
                        </th>
                        <th scope='col' className='px-6 py-3'>
                            Created By
                        </th>
                        <th scope='col' className='px-6 py-3'>
                            Likes
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project, index) => (
                        <tr key={index} className='bg-glass border-b'>
                            <td className='p-4'>{index + 1}</td>
                            <td className='p-4 cursor-pointer' onClick={(e) => openProjectFunction(e, project._id)}>{project.name}</td>
                            <td className='p-4'>{project.uploadedBy}</td>
                            <td className='p-4'>{project.likeCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AllProjects;
