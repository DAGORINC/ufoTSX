import axios, { AxiosRequestConfig } from 'axios';
import { getShowroomUrl } from '../services/getShowroomUrl';
import { ICollection } from '../interfaces/ICollection';
import IResponse from '../interfaces/IResponse';
import ApiHelper from './ApiHelper';

const BASE_URL = `${getShowroomUrl()}api/collections`;


interface IGetAllCollections extends IResponse {
    collections: ICollection[],
}

const getAllCollections = async (): Promise<IGetAllCollections> => {
    const url = BASE_URL;
    try {
        const res = await axios.get(url);

        const resoult = {
            ok: true,
            status: res.status,
            message: 'Pobrano kolekcje',
            collections: res.data.collections,
        }

        return resoult;

    } catch (error) {
        let message = 'Nie udało się pobrać kolekcji';
        let status = 400;

        if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 404) message = 'Nie znaleziono kolekcji'
            if (error.response.status === 403) message = 'Niedostępne'
        }

        return {
            message,
            status,
            ok: false,
            collections: [],
        }
    }

}

interface IAddCollection extends IResponse {
    collection: ICollection | null,
}

export interface IAddCollectionDto {
    name: string,
    producer: string,
    image: string,
}

const addCollection = async (collection: IAddCollectionDto): Promise<IAddCollection> => {

    const url = BASE_URL;

    const collectionConfig: AxiosRequestConfig = {
        headers: ApiHelper.createHeaderForFiles(),
    }

    try {
        const response = await axios.post(url, collection, collectionConfig)

        const resoult = {
            collection: response.data.newCollection,
            message: 'Kolekcja dodana',
            ok: true,
            status: response.status,
        }

        return resoult
    } catch (error) {

        let message = 'Nie udało się dodać kolekcji'
        let status = 400;

        if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 403) message = 'Nie można dodać kolejcji'
            if (error.response.status) status = error.response.status;
        }

        return {
            message,
            status,
            ok: false,
            collection: null,
        }

    }
}

interface IUpdateCollectionResponse extends IResponse {
    updatedCollection: ICollection | null,
}

const editCollection = async (collection: ICollection): Promise<IUpdateCollectionResponse> => {

    const url = `${BASE_URL}/${collection._id}`

    const collectionConfig: AxiosRequestConfig = {
        headers: ApiHelper.createHeaderForFiles(),
    }

    try {
        const response = await axios.put(url, collection, collectionConfig)

        const resoult = {
            updatedCollection: response.data.collection,
            message: 'Kolekcja została edytowana',
            ok: true,
            status: response.status
        }

        return resoult
    } catch (error) {

        let message = 'Nie udało się edytować kolekcji'
        let status = 400;

        if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 404) message = 'Nie znaleziono kolekcji'
            if (error.response.status === 403) message = 'Niedostępne'
            if (error.response.status) status = error.response.status;
        }

        return {
            message,
            status,
            ok: false,
            updatedCollection: null,
        }
    }
}

interface IDeleteCollection extends IResponse { }

const deleteCollection = async (_id: string): Promise<IDeleteCollection> => {

    const url = `${BASE_URL}/${_id}`;
    const config: AxiosRequestConfig = {
        headers: ApiHelper.createHeader(),
    }

    try {
        const res = await axios.delete(url, config)

        const resoult = {
            ok: true,
            status: res.status,
            message: 'Kolekcja usunięta',
        }

        return resoult

    } catch (error) {

        let message = 'Nie usunięto kolekcji'
        let status = 400

        if (axios.isAxiosError(error) && error.response) {
            if (error.response.status === 404) message = 'Nie znaleziono kolekcji'
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

const collectionsController = {
    getAllCollections,
    addCollection,
    editCollection,
    deleteCollection
};

export default collectionsController;