import { Fragment } from 'react'
import { useEffect } from 'react'
import NoQuotesFound from '../components/quotes/NoQuotesFound'
import QuoteList from '../components/quotes/QuoteList'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import useHttp from '../hooks/use-http'
import { getAllQuotes } from '../lib/api'

function AllQuotes() {
    const [sendRequest, sending, error, success, data] = useHttp(getAllQuotes)

    useEffect(() => {
        async function wrapperSendRequest() {
            await sendRequest()
        }

        wrapperSendRequest()
    }, [sendRequest])

    return (
        <Fragment>
            <h1>Quote list</h1>
            { sending && <LoadingSpinner /> }
            { error && <h3 className='error'>Failed to load quotes!</h3> }
            { success ? data.length <= 0 ? <NoQuotesFound /> : <QuoteList quotes={data} /> : ''}
        </Fragment>
    )
}

export default AllQuotes