import axios from 'axios';
const server = "https://iiit-colloboration-app-backend-2.vercel.app/api/v1"

export const getProjects = () => async (dispatch) => {
    try {
        dispatch({ type: 'getProjectsRequest' });

        const response = await axios.get(`${server}/getallpublicrepos`);

        const data = response.data.publicRepos;
        console.log({ data })

        dispatch({ type: 'getProjectsSuccess', payload: data });

    }
    catch (error) {
        dispatch({ type: 'getProjectsFailure', payload: error.response.data.message });
    }
}

export const openProject = (projectId) => async (dispatch) => {
    try {
        dispatch({ type: 'openProjectRequest' });

        const response = await axios.get(`${server}/getrepo/${projectId}`,);

        const data = response.data;
        console.log({ data })

        dispatch({ type: 'openProjectSuccess', payload: data });

    }
    catch (error) {
        dispatch({ type: 'openProjectFailure', payload: error.response.data.message });
    }
}

export const downloadProject = (projectId) => async (dispatch) => {
    try {
        dispatch({ type: 'downloadProjectRequest' });

        console.log({ projectId });
        const response = await axios.get(`${server}/downloadzip/${projectId}`,

        );

        const data = response.data;
        console.log({ data })

        dispatch({ type: 'downloadProjectSuccess', payload: data });

    }
    catch (error) {
        dispatch({ type: 'downloadProjectFailure', payload: error.response.data.message });
    }
}

export const redirectToGoogleDrive = (projectId) => async (dispatch) => {
    try {
        dispatch({ type: 'getRedirectLinkRequest' });

        const response = await axios.get(`${server}/redirect/${projectId}`);

        const data = response.data;
        console.log({ data })

        dispatch({ type: 'getRedirectLinkSuccess', payload: data });

    }
    catch (error) {
        dispatch({ type: 'getRedirectLinkFailure', payload: error.response.data.message });
    }
}