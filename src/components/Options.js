function Options({ question, answer, dispatch }) {
  const hasAnswered = answer !== null;

  // Additional dynamic styles
  const poppingAnswer = i => (i === answer ? 'answer' : '');
  const coloringOptions = i =>
    hasAnswered ? (i === question.correctOption ? 'correct' : 'wrong') : '';

  return (
    <div className='options'>
      {question.options.map((option, i) => (
        <button
          className={`btn btn-option ${poppingAnswer(i)} ${coloringOptions(i)}`}
          key={i}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: 'newAnswer', payload: i })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
