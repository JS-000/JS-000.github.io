import { Fragment } from 'react'
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import QuoteForm from '../components/quotes/QuoteForm'
import LoadingSpinner from '../components/UI/LoadingSpinner';
import useHttp from '../hooks/use-http';
import { addQuote } from '../lib/api';
import { useCallback } from 'react';

function NewQuote() {
    const [sendRequest, sending, error, success, data] = useHttp(addQuote)
    const history = useHistory()

    
    async function onAddQuote(data) {
        try {
            await sendRequest(data)
            return true
        } catch(err) {
            return false
        }
    }
    
    const redirect = useCallback(() => {
        if(success) {
            history.replace('/quotes')
        }
    }, [history, success])

    useEffect(() => {
        redirect()
    }, [data, redirect])
    
    return (
        <Fragment>
            <h1>New Quote</h1>
            { sending && <LoadingSpinner /> }
            { error && <h3 className='error'>Could not add quote. Please try again later.</h3> }
            <QuoteForm onAddQuote={onAddQuote} redirect={redirect} />
        </Fragment>
    )
}

export default NewQuote