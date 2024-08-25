import React from 'react'
import { useNavigate } from 'react-router-dom'

const SortRepo = () => {
	const navigate = useNavigate();

	const handleUploadClick = () => {
		navigate('/upload')
	}
	return (
		<div className='mb-2 flex justify-center lg:justify-end'>
			<button
				onClick={handleUploadClick}
				type='button'
				className={`py-2.5 px-5 me-2 mb-2 bg-[#196ee6] text-xs sm:text-sm font-medium focus:outline-none rounded-lg bg-glass`}
			>
				Upload New Project
			</button>
			<button
				type='button'
				className={`py-2.5 px-5 me-2 mb-2 text-xs sm:text-sm font-medium focus:outline-none rounded-lg bg-glass`}
			>
				Most Recent
			</button>
			<button
				type='button'
				className={`py-2.5 px-5 me-2 mb-2  text-xs sm:text-sm font-medium focus:outline-none rounded-lg bg-glass`}
			>
				Most Stars
			</button>
			<button
				type='button'
				className={`py-2.5 px-5 me-2 mb-2  text-xs sm:text-sm font-medium focus:outline-none rounded-lg bg-glass`}
			>
				Most Forks
			</button>
		</div>
	)
}

export default SortRepo