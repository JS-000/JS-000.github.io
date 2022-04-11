import { Redirect } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom'
import React, { Suspense } from 'react'
import Layout from './components/layout/Layout';

import NotFound from './pages/NotFound';
import LoadingSpinner from './components/UI/LoadingSpinner';

const NewQuote = React.lazy(() => import('./pages/NewQuote'))
const AllQuotes = React.lazy(() => import('./pages/AllQuotes'))
const QuoteDetails = React.lazy(() => import('./pages/QuoteDetails'))


function App() {
  return (
    <Layout>
      <Suspense fallback={
        <div className='centered'><LoadingSpinner /></div>
      }>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/quotes' />
          </Route>
          <Route path='/quotes' exact>
            <AllQuotes />
          </Route>
          <Route path='/quotes/:quoteId'>
            <QuoteDetails />
          </Route>
          <Route path='/new-quote'>
            <NewQuote />
          </Route>
          <Route path='*'>
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
