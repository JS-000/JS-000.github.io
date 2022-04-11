import { useState, useCallback } from "react";

function useHttp(requestFunction) {
    const [responseStatus, changeResponseStatus] = useState({
        sending: false,
        error: false,
        success: false,
        data: null
    })

    const sendRequest = useCallback(async (args) => {
        changeResponseStatus(state => {return {
            sending: true,
            error: false,
            success: false,
            data: null
        }})
        try {
            const data = await requestFunction(args)
            changeResponseStatus(state => {return {
                sending: false,
                error: false,
                success: true,
                data
            }})
        } catch(err) {
            changeResponseStatus(state => {return {
                sending: false,
                error: true,
                success: false,
                data: null
            }})
        }
    }, [requestFunction])

    return [
        sendRequest,
        responseStatus.sending,
        responseStatus.error,
        responseStatus.success,
        responseStatus.data
    ]
}

export default useHttp