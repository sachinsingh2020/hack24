import { IoLocationOutline } from "react-icons/io5";
import { RiGitRepositoryFill, RiUserFollowFill, RiUserFollowLine } from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";
import { TfiThought } from "react-icons/tfi";
import { FaEye } from "react-icons/fa";

const ProfileInfo = () => {
	const userProfile = {
		avatar_url: "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745",
		bio: "DK Fashions die heart fans",
		email: "dkfashion@gmail.com",
		followers: 23,
		following: 200,
		html_url: "https://github.com/burakorkmez",
		location: "Somewhere, Earth",
		name: "DK Fashion",
		public_gists: 100,
		public_repos: 100,
		
	};

	return (
		<div className='lg:w-1/3 w-full flex flex-col gap-2 md:sticky md:top-10'>
			<div className='bg-glass rounded-lg p-4'>
				<div className='flex gap-4 items-center'>
					{/* User Avatar */}
					<a href={userProfile?.html_url} target='_blank' rel='noreferrer'>
						<img src={userProfile?.avatar_url} className='rounded-md w-24 h-24 mb-2' alt='' />
					</a>
					{/* View on Github
					<div className='flex gap-2 items-center flex-col'>
						<a
							href={userProfile.html_url}
							target='_blank'
							rel='noreferrer'
							className='bg-glass font-medium w-full text-xs p-2 rounded-md cursor-pointer border border-blue-400 flex items-center gap-2'
						>
							<FaEye size={16} />
							View on Github
						</a>
					</div> */}
				</div>

				{/* User Bio */}
				{userProfile?.bio ? (
					<div className='flex items-center gap-2'>
						<TfiThought />
						<p className='text-sm'>{userProfile?.bio.substring(0, 60)}...</p>
					</div>
				) : null}

				{/* Location */}
				{userProfile?.location ? (
					<div className='flex items-center gap-2'>
						<IoLocationOutline />
						{userProfile?.location}
					</div>
				) : null}

				{/* Twitter Username */}
				{/* {userProfile?.twitter_username ? (
					<a
						href={`https://twitter.com/${userProfile.twitter_username}`}
						target='_blank'
						rel='noreferrer'
						className='flex items-center gap-2 hover:text-sky-500'
					>
						<FaXTwitter />
						{userProfile?.twitter_username}
					</a>
				) : null} */}

				{/* Member Since Date */}
				<div className='my-2'>
					<p className='text-gray-600 font-bold text-sm'>Member since</p>
					<p className=''>21 Sep, 2023</p>
				</div>

				{/* Email Address */}
				{userProfile?.email && (
					<div className='my-2'>
						<p className='text-gray-600 font-bold text-sm'>Email address</p>
						<p className=''>{userProfile.email}</p>
					</div>
				)}

				{/* Full Name */}
				{userProfile?.name && (
					<div className='my-2'>
						<p className='text-gray-600 font-bold text-sm'>Full name</p>
						<p className=''>{userProfile?.name}</p>
					</div>
				)}

				{/* Username */}
				
			</div>

		</div>
	);
};

export default ProfileInfo;