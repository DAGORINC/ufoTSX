import axios, { AxiosRequestConfig } from 'axios';
import { getShowroomUrl } from '../services/getShowroomUrl';
import IResponse from '../interfaces/IResponse';
import { IFurniture } from '../interfaces/IFurniture';
import ApiHelper from './ApiHelper';
import { IPromotionalFurniture } from '../interfaces/IPromotionalFurniture';

const BASE_URL = `${getShowroomUrl()}api/promotionalFurniture`;

interface IGetAllFurniture extends IResponse {
    furniture: IFurniture[] | null
}

const getAllFurniture = async (): Promise<IGetAllFurniture> => {

    const url = BASE_URL

    try {
        const res = await axios.get(url)

        const resoult = {
            ok: true,
            status: res.status,
            message: 'Pobrano meble',
            furniture: res.data.furniture
        }

        return resoult
    } catch (error) {

        let message = 'Nie pobrano mebli'
        let status = 400

        if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 403) message = 'Nie możesz tego zrobić'
            if (error.response.status) status = error.response.status
        }

        return {
            message,
            ok: false,
            status,
            furniture: null,
        }
    }
}

interface IGetPieceOfFurniture extends IResponse {
    furniture: IFurniture | null,
}


const getPieceOfFurniture = async (_id: string): Promise<IGetPieceOfFurniture> => {
    const url = `${BASE_URL}/${_id}`

    try {
        const res = await axios.get(url)

        const resoult = {
            ok: true,
            message: 'Pobrano meble',
            status: res.status,
            furniture: res.data.furniture
        }

        return resoult
    } catch (error) {

        let message = 'Nie pobrano wiadomości'
        let status = 400

        if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 403) message = 'Nie możesz tego zrobić'
            if (error.response.status) status = error.response.status
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
    newFurniture: IPromotionalFurniture | null,
}

export interface IAddFurnitureDto {
    name: string,
    description: string | null,
    price: number | null,
    width: number | null,
    depth: number | null,
    height: number | null,
    crossed: number | null,
    isPriceVissible: boolean,
    image: File
}

const addFurniture = async (furniture: IAddFurnitureDto): Promise<IAddFurniture> => {

    const url = BASE_URL;
    const config: AxiosRequestConfig = {
        headers: ApiHelper.createHeaderForFiles(),
    }

    try {
        const res = await axios.post(url, furniture, config)

        const resoult = {
            newFurniture: res.data.newFurniture,
            ok: true,
            message: 'Dodano mebel',
            status: res.status
        }

        return resoult
    } catch (error) {

        let message = 'Nie dodano mebla'
        let status = 400

        if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 403) message = 'Nie możesz tego zrobić'
            if (error.response.status) status = error.response.status
        }

        return {
            message,
            status,
            ok: false,
            newFurniture: null,
        }
    }

}

interface IEditFurniture extends IResponse {
    editedFurniture: IPromotionalFurniture | null,
}

export interface IEditPromotionalFurnitureDto {
    _id: string,
    name: string,
    description: string | null,
    price: number | null,
    width: number | null,
    depth: number | null,
    height: number | null,
    crossed: number | null,
    isPriceVissible: boolean | null,
    image: File | null
}

const editFurniture = async (furniture: IEditPromotionalFurnitureDto): Promise<IEditFurniture> => {

    const url = `${BASE_URL}/${furniture._id}`
    const config: AxiosRequestConfig = {
        headers: ApiHelper.createHeaderForFiles()
    }

    try {
        const res = await axios.put(url, furniture, config)
        
        const resoult = {
            message: 'Edytowano mebel',
            status: res.status,
            ok: true,
            editedFurniture: res.data.editedFurniture,
        }
        
        return resoult
    } catch (error) {
        
        let message = 'Nie edytowano mebla'
        let status = 400

        if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 403) message = 'Nie możesz tego zrobić'
            if (error.response.status === 404) message = 'Nie znaleziono mebla'
            if (error.response.status) status = error.response.status
        }

        return {
            message,
            ok: false,
            status,
            editedFurniture: null,
        }
    }
}

interface IDeletePromotionalFurniture extends IResponse { }

const deleteFurniture = async (_id: string): Promise<IDeletePromotionalFurniture> => {
    
    const url = `${BASE_URL}/${_id}`
    const config: AxiosRequestConfig = {
        headers: ApiHelper.createHeader()
    }

    try {
        const res = await axios.delete(url, config)

        const resoult = {
            ok: true,
            message: 'Usunięto mebel',
            status: res.status,
        }

        return resoult
    } catch (error) {
        
        let message = 'Nie usunięto mebla'
        let status = 400

        if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 403) message = 'Nie możesz tego zrobić'
            if (error.response.status === 404) message = 'Nie znaleziono tego mebla'
            if (error.response.status) status = error.response.status
        }

        return {
            ok: false,
            status,
            message
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