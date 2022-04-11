import { useRef } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Fragment } from 'react';
import useHttp from '../../hooks/use-http';
import { addComment } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';

import classes from './NewCommentForm.module.css';
import { Redirect } from 'react-router-dom';

const NewCommentForm = (props) => {
  const commentTextRef = useRef();
  const routeMatch = useRouteMatch()
  const [sendRequest, sending, error, success] = useHttp(addComment)

  const submitFormHandler = (event) => {
    event.preventDefault();
    // optional: Could validate here
    sendRequest({
      text: commentTextRef.current.value,
      quoteId: routeMatch.url.split('/')[2]
    })

    // send comment to server
  };

  return (
    <Fragment>
      <form className={classes.form} onSubmit={submitFormHandler}>
        <div className={classes.control} onSubmit={submitFormHandler}>
          <label htmlFor='comment'>Your Comment</label>
          <textarea id='comment' rows='5' ref={commentTextRef}></textarea>
        </div>
        <div className={classes.actions}>
          <button className='btn'>Add Comment</button>
        </div>
      </form>
      { sending && <LoadingSpinner /> }
      { success && <Redirect to={routeMatch.url} /> }
      { error && <h3 className='error'>Failed to add comment!</h3> }
    </Fragment>
  );
};

export default NewCommentForm;
