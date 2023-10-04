import IResponse from '../interfaces/IResponse';
import { getShowroomUrl } from '../services/getShowroomUrl';
import axios from 'axios';

const BASE_URL = `${getShowroomUrl()}api/viewCounter`;

interface IGetAllViews extends IResponse {
    counts: number | null,
}

const getAllViews = async (): Promise<IGetAllViews> => {
    const url = BASE_URL;
    
    try {
        const res = await axios.get(url)

        const resoult = {
            message: 'Pobrano wyświetlenia',
            ok: true,
            status: res.status,
            counts: res.data.counts
        }

        return resoult;
    } catch (error) {

         let message = 'Nie pobrano wyświetleń'
         let status = 400

         if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 403) message = 'Nie możesz tego zrobić'
            if (error.response.status) status = error.response.status
         }

         return {
            message,
            status,
            ok: false,
            counts: null,
         }
    }
}

const newView = async () => {
    const response = await axios.post(`${BASE_URL}`)
    return response;
}

const viewCounterController = {
    getAllViews,
    newView,
};

export default viewCounterController;