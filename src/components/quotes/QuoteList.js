import { Fragment } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';

const QuoteList = (props) => {
  const location = useLocation()
  const history = useHistory()


  const queryParams = new URLSearchParams(location.search)  //URLSear.. is browser implemented class, location.search holds query 
  //string like ?sort=asc, this is changed to js object by URLSear.. class. It returns a map not an object

  const sortAscending = queryParams.get('sort') === 'asc' //IMP: We need to use '.get' as queryParams is not an object it is a map
  // const map1 = new Map()
  // console.log(typeof map1);
  console.log(typeof queryParams) //returns object even if data type is 'map'
  
  function changeSortingHandler() {
    history.push({
      pathname: location.pathname,
      search: `?sort=${sortAscending ? 'desc' : 'asc'}`
    })
    // history.push(`/quotes?sort=${sortAscending ? 'desc' : 'asc'}`)  //changes state, that is why page is revaluated
  }

  props.quotes.sort((q1, q2) => {
    if(sortAscending){
      return q1.publishedOn < q2.publishedOn ? 1 : -1
    }
    else {
      return q1.publishedOn > q2.publishedOn ? 1 : -1
    }
  })

  return (
    <Fragment>
    <div className={classes.sorting}>
      <button onClick={changeSortingHandler}>Sort {sortAscending ? 'Ascending' : 'Descending'}</button>
    </div>
      <ul className={classes.list}>
        {props.quotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
