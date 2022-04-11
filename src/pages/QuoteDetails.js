import { Fragment } from 'react'
import { Route } from 'react-router-dom'
import { useRouteMatch } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import Comments from '../components/comments/Comments'
import HighlightedQuote from '../components/quotes/HighlightedQuote'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import useHttp from '../hooks/use-http'
import { getAllComments, getSingleQuote } from '../lib/api'
import CommentsList from '../components/comments/CommentsList'

function QuoteDetails() {
    const params = useParams()
    // const [quote] = TestQuotes.filter(quote => quote.id === params.quoteId)
    const [sendRequest, sending, error, success, data] = useHttp(getSingleQuote)
    const [commentSendRequest, sendingComment, errorComment, successComment, commentData] = useHttp(getAllComments)
    const routeMatch = useRouteMatch()

    useEffect(() => {
        async function wrapperSendRequest() {
            await sendRequest(params.quoteId)
        }
        wrapperSendRequest()
        // Suppresses missing dependency warning
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sendRequest, commentSendRequest])

    useEffect(() => {
        async function wrapperSendRequest() {
            await commentSendRequest(params.quoteId)
        }
        wrapperSendRequest()
    }, [commentSendRequest, params])

    return (
        <Fragment>
            <h1>Quote Detail</h1>
            { sending && <LoadingSpinner /> }
            { error && <h3 className='error'>Could not find quote!</h3> }
            { success && <Fragment>
                <HighlightedQuote id={data.id} text={data.text} author={data.author} />
                <Route path={`${routeMatch.url}`} exact>
                    <Link className='btn--flat' to={`${routeMatch.url}/comments`}>
                        Load comments...
                    </Link>
                </Route>
                <Route path={`${routeMatch.url}/comments`}>
                    <Comments />
                    { successComment && <CommentsList comments={commentData} /> }
                    { sendingComment && <LoadingSpinner /> }
                    { errorComment && <h3 className='error'>Error loading comments!</h3> }
                    <Link className='btn--flat' to={`${routeMatch.url}`}>
                        Back
                    </Link>
                </Route>
            </Fragment> }
        </Fragment>
    )
}

export default QuoteDetails