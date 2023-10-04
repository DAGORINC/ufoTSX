import { IProducer } from '../interfaces/IProducer';
import IResponse from '../interfaces/IResponse';
import { getShowroomUrl } from '../services/getShowroomUrl';
import axios, { AxiosRequestConfig } from 'axios';
import ApiHelper from './ApiHelper';

const BASE_URL = `${getShowroomUrl()}api/producers`;

interface IGetAllProducers extends IResponse {
    producers: IProducer[] | null,
}

const getAllProducers = async (): Promise<IGetAllProducers> => {
    const url = BASE_URL;
    try {
        const res = await axios.get(url)
        
        const resoult = {
            producers: res.data.producers,
            message: 'Pobrano producentów',
            ok: true,
            status: res.status,
        }

        return resoult
    } catch (error) {
        
        let message = 'Nie pobrano producentów'
        let status = 400

        if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 403) message = 'Nie możesz pobrać producentów'
            if (error.response.status) status = error.response.status
        }

        return {
            message,
            status,
            ok: false,
            producers: null,
        }
    }
}

interface IAddProducer extends IResponse {
    newProducer: IProducer | null,
}

export interface IAddProducerDto {
    name: string,
    link: string | null,
    logo: File,
}

const addProducer = async (producer: IAddProducerDto): Promise<IAddProducer> => {

    const url = BASE_URL
    const config: AxiosRequestConfig = {
        headers: ApiHelper.createHeaderForFiles(),
    }

    try {
        const res = await axios.post(url, producer, config)

        const resoult = {
            ok: true,
            message: 'Dodano producenta',
            status: res.status,
            newProducer: res.data.newProducer
        }

        return resoult
    } catch (error) {
        
        let message = 'Nie dodano producenta'
        let status = 400

        if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 403) message = 'Nie możesz tego zrobić'
            if (error.response.status) status = error.response.status
        }

        return {
            message,
            status,
            ok: false,
            newProducer: null,
        }
    }
}

interface IEditProducer extends IResponse {
    editedProducer: IProducer | null,
}

export interface IEditProducerDto {
    _id: string,
    name: string,
    link: string,
    logo: File,
}

const editProducer = async (producer: IEditProducerDto): Promise<IEditProducer> => {

    const url = `${BASE_URL}/${producer._id}`
    const config: AxiosRequestConfig = {
        headers: ApiHelper.createHeaderForFiles(),
    }

    try {
        const res = await axios.put(url, producer, config)

        const resoult = {
            ok: true,
            message: 'Dodano producenta',
            status: res.status,
            editedProducer: res.data.editedProducer,
        }

        return resoult
    } catch (error) {
        
        let message = 'Nie dodano producenta'
        let status = 400

        if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 403) message = 'Nie możesz tego zrobić'
            if (error.response.status === 404) message = 'Nie znelzeiono producenta'
            if (error.response.status) status = error.response.status
        }

        return {
            ok: false,
            status,
            message,
            editedProducer: null,
        }
    }
}

interface IDeleteFurniture extends IResponse { }

const deleteProducer = async (_id: any): Promise<IDeleteFurniture> => {
    const url = `${BASE_URL}/${_id}`
    const config: AxiosRequestConfig = {
        headers: ApiHelper.createHeader(),
    }

    try {
        const res = await axios.delete(url, config)

        const resoult = {
            ok: true,
            status: res.status,
            message: 'Usunięto producenta',
        }

        return resoult
    } catch (error) {
        
        let message = 'Nie usunięto producenta'
        let status = 400

        if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 403) message = 'Nie możesz tego zrobić'
            if (error.response.status === 404) message = 'Nie znaleziono producenta'
            if (error.response.status) status = error.response.status
        }

        return {
            message,
            status,
            ok: false,
        }
    }
}

const producersController = {
    getAllProducers,
    addProducer,
    editProducer,
    deleteProducer,
};

export default producersController;