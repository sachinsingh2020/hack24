import { useEffect,useState } from "react";
import Repo from "./Repo";
import axios from "axios";
const Repos = () => {
    const [myRepo, setmyRepo] = useState([]);
    
    useEffect(() => {
        const fetchMyRepos = async () => {
          try {
            const response = await axios.get('https://iiit-colloboration-app-backend-2.vercel.app/api/v1/getmyrepos', {
                withCredentials: true, // Include credentials with the request
              });
              console.log({response})
            setmyRepo(response?.data?.myRepos);
          } catch (err) {
            console.log(err)
          }
        };
    
        fetchMyRepos()
      }, []);
   console.log(myRepo);
	return (
		<div className={`lg:w-2/3 w-full bg-glass rounded-lg px-8 py-6`}>
			<ol className='relative border-s border-gray-200'>
                {
                    myRepo.map((user)=>(
                        <Repo user={user}/>
                    ))
                }
				
				
			</ol>
		</div>
	);
};

export default Repos;