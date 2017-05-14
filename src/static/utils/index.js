
export const dataRequestAction = (actionType) => {
    return {
        type: actionType
    }
}

export const dataReceivedAction = (actionType, data) => {
    return {
        type: actionType,
        payload: {
            data
        }
    }
}

export const statusAction = (actionType, statusText) => {
    return {
        type: actionType,
        payload: {
            statusText
        }
    }
}

export const checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300){
        return response
    } else {
        let error = new Error(response.statusText)
        error.response = response
        throw error
    }
}

export const parseResponse = (response) => {
    return response.json()
}

