const FIREBASE_URL = 'https://quotes-335ea-default-rtdb.firebaseio.com'

async function getAllQuotes() {
    const response = await fetch(`${FIREBASE_URL}/quotes.json`)

    if(!response.ok) {
        throw new Error('Cannot get quotes!')
    }

    const data = await response.json()
    let transformedQuotes = []
    for(let key in data) {
        transformedQuotes.push({...data[key], id: key})
    }
    return transformedQuotes
}

async function getSingleQuote(quoteId) {
    const response = await fetch(`${FIREBASE_URL}/quotes/${quoteId}.json`)

    if(!response.ok) {
        throw new Error('Cannot get quote!')
    }

    const data = await response.json()
    return data
}

async function addQuote(quote) {
    const response = await fetch(`${FIREBASE_URL}/quotes.json`, {
        method: 'POST',
        body: JSON.stringify(quote),
        headers: {
            'Content-type': 'application/json'
        }
    })

    if(!response.ok) {
        throw new Error('Cannot add quote!')
    }

    const data = await response.json()
    return data
}

async function addComment(comment) {
    const response = await fetch(`${FIREBASE_URL}/comments/${comment.quoteId}.json`, {
        method: 'POST',
        body: JSON.stringify(comment),
        headers: {
            'Content-type': 'application/json'
        }
    })

    if(!response.ok) {
        throw new Error('Cannot add comment!')
    }

    const data = await response.json()
    return data
}

async function getAllComments(quoteId) {
    const response = await fetch(`${FIREBASE_URL}/comments/${quoteId}.json`)

    if(!response.ok) {
        throw new Error('Cannot load comments!')
    }

    const data = await response.json()
    let transformedComments = []
    for(let key in data) {
        transformedComments.push({...data[key], id: key})
    }

    return transformedComments
}

export { getAllQuotes, getSingleQuote, addQuote, addComment, getAllComments }