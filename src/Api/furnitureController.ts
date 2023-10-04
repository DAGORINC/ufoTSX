import axios, { AxiosRequestConfig } from 'axios';
import { getShowroomUrl } from '../services/getShowroomUrl';
import IResponse from '../interfaces/IResponse';
import { IFurniture } from '../interfaces/IFurniture';
import ApiHelper from './ApiHelper';

const BASE_URL = `${getShowroomUrl()}api/furniture`;

interface IGetAllFurniture extends IResponse {
    furniture: IFurniture[] | null,
}

const getAllFurniture = async (): Promise<IGetAllFurniture> => {

    const url = BASE_URL;

    try {
        const res = await axios.get(url);

        const resoult = {
            message: 'Pobrano meble',
            status: res.status,
            furniture: res.data.furniture,
            ok: true,
        }

        return resoult;
    } catch (error) {
        return {
            message: 'Nie pobrano mebli',
            status: 400,
            furniture: null,
            ok: false,
        };
    }
}

interface IGetPieceOfFurniture extends IResponse {
    furniture: IFurniture | null
}

const getPieceOfFurniture = async (_id: string | null): Promise<IGetPieceOfFurniture> => {

    const url = `${BASE_URL}/${_id}`

    try {
        const res = await axios.get(url);

        const resoult = {
            furniture: res.data.furniture,
            message: 'Pobrano informacje o meblu',
            ok: true,
            status: res.status,
        }

        return resoult

    } catch (error) {
        let message = 'Nie udało się pobrać infmacji o meblu'
        let status = 400;

        if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 403) message = 'Nie można pobrać mebla'
            if (error.response.status) status = error.response.status;
        }

        return {
            message,
            status,
            ok: false,
            furniture: null,
        }
    }
}

interface IAddFurniture extends IResponse {
    newFurniture: IFurniture | null,
}

export interface IAddFurnitureDto {
    name: string,
    producer: string,
    partCollection: string | null,
    price: number | null,
    width: number | null,
    depth: number | null,
    height: number | null,
    crossed: number | null,
    isPriceVissible: boolean,
    designedForTheLivingRoom: boolean,
    designedForTheKitchen: boolean,
    designedForTheBedroom: boolean,
    designedForTheOffice: boolean,
    designedForTheYouthRoom: boolean,
    designedForTheHallway: boolean,
    designedForTheChildrensRoom: boolean,
    designedForTheBathroom: boolean,
    categories: string | null,
    image: File,
    description: string | null,
}

const addFurniture = async (furniture: IAddFurnitureDto): Promise<IAddFurniture> => {

    const url = BASE_URL;
    const addFurnitureConfig: AxiosRequestConfig = {
        headers: ApiHelper.createHeaderForFiles(),
    }

    try {
        const res = await axios.post(url, furniture, addFurnitureConfig)

        const resoult = {
            newFurniture: res.data.newFurniture,
            message: 'Mebel dodany',
            ok: true,
            status: res.status,
        }

        return resoult
    } catch (error) {

        let message = 'Nie udalo się dodać mebla'
        let status = 400

        if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 403) message = 'Nie można dodać mebla'
            if (error.response.status) status = error.response.status
        }

        return {
            message,
            status,
            ok: false,
            newFurniture: null
        }
    }
}

interface IEditFurniture extends IResponse {
    editedFurniture: IFurniture | null,
}

export interface IEditFurnitureDto {
    _id: string,
    name: string,
    producer: string,
    partCollection: string | null,
    price: number | null,
    width: number | null,
    depth: number | null,
    height: number | null,
    crossed: number | null,
    isPriceVissible: boolean,
    designedForTheLivingRoom: boolean,
    designedForTheKitchen: boolean,
    designedForTheBedroom: boolean,
    designedForTheOffice: boolean,
    designedForTheYouthRoom: boolean,
    designedForTheHallway: boolean,
    designedForTheChildrensRoom: boolean,
    designedForTheBathroom: boolean,
    categories: string | null,
    image: File,
    description: string | null,
}

const editFurniture = async (furniture: IEditFurnitureDto): Promise<IEditFurniture> => {

    const url = `${BASE_URL}/${furniture._id}`
    const editFurnitureConfig: AxiosRequestConfig = {
        headers: ApiHelper.createHeaderForFiles(),
    }

    try {
        const res = await axios.put(url, furniture, editFurnitureConfig)

        const resoult = {
            editedFurniture: res.data.editedFurniture,
            message: 'Mebel edytowany',
            ok: true,
            status: res.status,
        }

        return resoult
    } catch (error) {
        let message = 'Nie udało się edytować mebla'
        let status = 400

        if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 403) message = 'Nie można edytować mebla'
            if (error.response.status) status = error.response.status
        }

        return {
            message,
            status,
            ok: false,
            editedFurniture: null,
        }
    }
}

interface IDeleteFurniture extends IResponse {}

const deleteFurniture = async (_id: string): Promise<IDeleteFurniture> => {

    const url = `${BASE_URL}/${_id}`;
    const config: AxiosRequestConfig = {
        headers: ApiHelper.createHeader(),
    }

    try {
        const res = await axios.delete(url, config);

        const resoult = {
            ok: true,
            status: res.status,
            message: 'Usunięto mebel'
        }

        return resoult
    } catch (error) {

        let message = 'Nie usunięto mebla'
        let status = 400

        if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 404) message = 'Nie znaleziono mebla'
            if (error.response.status === 403) message = 'Nie możesz tego zrobić'
            if (error.response.status) status = error.response.status
        }

        return {
            message,
            status,
            ok: false,
        }
    }
}


const furnitureController = {
    getAllFurniture,
    getPieceOfFurniture,
    addFurniture,
    editFurniture,
    deleteFurniture,
}

export default furnitureController;