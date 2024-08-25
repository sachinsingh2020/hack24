import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LikesPage = () => {
	const [repos, setRepos] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		console.log({ repos })
	}, [repos])

	useEffect(() => {
		const fetchLikedRepos = async () => {
			try {
				const response = await axios.get('https://iiit-colloboration-app-backend-2.vercel.app/api/v1/mylikedrepos', {
					withCredentials: true, // Include credentials with the request
				});
				setRepos(response?.data?.myLikedRepos);
			} catch (err) {
				setError(err.message);
			}
		};

		fetchLikedRepos();
	}, []);

	// const uploadedDate = new Date(repos?.uploadedAt);
	//   const formattedDate = uploadedDate.toLocaleDateString('en-US', {
	//     year: 'numeric',
	//     month: 'long',
	//     day: 'numeric',
	//   });

	return (
		<div className='relative overflow-x-auto shadow-md rounded-lg px-4'>
			<table className='w-full text-sm text-left rtl:text-right bg-glass overflow-hidden'>
				<thead className='text-xs uppercase bg-glass'>
					<tr>
						{/* <th scope='col' className='p-4'>
							<div className='flex items-center'>No</div>
						</th> */}
						<th scope='col' className='px-6 py-3'>
							Repository Name
						</th>
						<th scope='col' className='px-6 py-3'>
							Date
						</th>
						<th scope='col' className='px-6 py-3'>
							Type
						</th>

						<th scope='col' className='px-6 py-3'>
							Uploaded By
						</th>
					</tr>
				</thead>
				<tbody>
					{
						repos.map((user) => (
							<tr className='bg-glass border-b'>

								<td className='w-4 p-4'>
									{user.name}
								</td>

								<td className='w-4 p-4'>
									{user.uploadedAt}
								</td>

								<td className='w-4 p-4'>
									{user.type}
								</td>
								<td className='w-4 p-4'>
									{user.uploadedBy}
								</td>
							</tr>
						))
					}


				</tbody>
			</table>
		</div>
	)
}

export default LikesPage