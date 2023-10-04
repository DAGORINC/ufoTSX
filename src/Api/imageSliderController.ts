import { getShowroomUrl } from '../services/getShowroomUrl';
import axios, { AxiosRequestConfig } from 'axios';
import IResponse from '../interfaces/IResponse';
import { ISlide } from '../interfaces/ISlide';
import ApiHelper from './ApiHelper';

const BASE_URL = `${getShowroomUrl()}api/imageSlider`;

interface IGetAllImages extends IResponse {
    images: ISlide[] | null,
}

const getAllImages = async (): Promise<IGetAllImages> => {
    const url = `${BASE_URL}`

    try {
        const res = await axios.get(url);

        const resoult = {
            ok: true,
            status: res.status,
            message: 'Pobrano slajdy',
            images: res.data.images
        }

        return resoult;

    } catch (error) {

        let message = 'Nie pobrano slajdów'
        let status = 400

        if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 403) message = 'Nie można pobrać slajdów'
            if (error.response.status === 404) message = 'Nie znaleziono slajdów'
        }

        return {
            message,
            status,
            ok: false,
            images: null,
        }
    }
}

interface IAddImages extends IResponse {
    newImage: ISlide | null,
}

export interface IAddSlideDto {
    image: File,
    link: string,
    isVissible: boolean,
}

const addImage = async (image: IAddSlideDto): Promise<IAddImages> => {
    const url = BASE_URL;
    const config: AxiosRequestConfig = {
        headers: ApiHelper.createHeaderForFiles(),
    }

    try {
        const res = await axios.post(url, image, config)

        const resoult = {
            ok: true,
            status: res.status,
            message: 'Dodano slajd',
            newImage: res.data.newImage
        }

        return resoult
    } catch (error) {

        let message = 'Nie dodano slajdu'
        let status = 400

        if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 403) message = 'Nie można dodać slajdu'
            if (error.response.status) status = error.response.status
        }

        return {
            message,
            status,
            ok: false,
            newImage: null
        }
    }
}

interface IDeleteImage extends IResponse { }

const deleteImage = async (_id: string): Promise<IDeleteImage> => {
    const url = `${BASE_URL}/${_id}`;
    const config: AxiosRequestConfig = {
        headers: ApiHelper.createHeader()
    }

    try {
        const res = await axios.delete(url, config)

        const resoult = {
            ok: true,
            status: res.status,
            message: 'Usunięto zdjęcie',
        }

        return resoult
    } catch (error) {

        let message = 'Nie usunięto zdjęcia'
        let status = 400

        if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 403) message = 'Nie możesz tego zrobić'
            if (error.response.status === 404) message = 'Nie znaleziono zdjęcia'
            if (error.response.status) status = error.response.status
        }

        return {
            message,
            ok: false,
            status,
        }
    }
}

const imageSliderController = {
    getAllImages,
    addImage,
    deleteImage,
};

export default imageSliderController;