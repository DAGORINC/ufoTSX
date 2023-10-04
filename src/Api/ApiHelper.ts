import { tokenController } from "./tokenController"

const createHeader = () => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenController()}`
    }

    return headers
}

const createHeaderForFiles = () => {
    const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${tokenController()}`
    }

    return headers
}

const ApiHelper = {
    createHeader,
    createHeaderForFiles,
}

export default ApiHelper