import { useRef } from 'react';
import { useState } from 'react';
import { Prompt } from 'react-router-dom';

import Card from '../UI/Card';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './QuoteForm.module.css';

const QuoteForm = (props) => {
  const authorInputRef = useRef();
  const textInputRef = useRef();

  const [isInFocus, setIsInFocus] = useState(false)

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;

    // optional: Could validate here

    if(props.onAddQuote({ author: enteredAuthor, text: enteredText, publishedOn: Date.now() }))
      props.redirect()
  }

  function focusChangeHandler() {
    setIsInFocus(true)
  }
  function unFocus() {
    setIsInFocus(false)
  }

  return (
    <Card>
      <Prompt when={isInFocus} message={location => 'Are you sure?'} />
      <form onFocus={focusChangeHandler} className={classes.form} onSubmit={submitFormHandler}>
        {props.isLoading && (
          <div className={classes.loading}>
            <LoadingSpinner />
          </div>
        )}

        <div className={classes.control}>
          <label htmlFor='author'>Author</label>
          <input type='text' id='author' ref={authorInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='text'>Text</label>
          <textarea id='text' rows='5' ref={textInputRef}></textarea>
        </div>
        <div className={classes.actions}>
          <button className='btn' onClick={unFocus}>Add Quote</button>
        </div>
      </form>
    </Card>
  );
};

export default QuoteForm;
