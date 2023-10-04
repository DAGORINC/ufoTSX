import axios, { AxiosRequestConfig } from 'axios';
import { getShowroomUrl } from '../services/getShowroomUrl';
import { tokenController } from './tokenController';

const BASE_URL = `${getShowroomUrl()}api/storage`;
const token = tokenController();

const downloadStorageFolder = async () => {
    try {

        const url = `${BASE_URL}/download`;
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            responseType: 'arraybuffer', // Ustawienie responseType na 'arraybuffer'
        }

        const response = await axios.get(url, config);

        if (response.status === 200) {
            // Utworzenie pliku na podstawie bufora danych
            const blob = new Blob([response.data]);
            const url = window.URL.createObjectURL(blob);

            // Tworzenie linku do pobrania pliku
            const a = document.createElement('a');
            a.href = url;
            a.download = 'storage.zip';
            document.body.appendChild(a);
            a.click();

            // Zwolnienie zasobów
            window.URL.revokeObjectURL(url);
        } else {
            console.error('Błąd pobierania folderu:', response.statusText);
        }
    } catch (err) {
        console.error('Wystąpił błąd:', err);
    }
};


const storageController = {
    downloadStorageFolder,
};

export default storageController;