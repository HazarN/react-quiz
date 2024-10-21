function FinishScreen({ dispatch, score, maxScore, highscore }) {
  const percentage = (score / maxScore) * 100;

  return (
    <>
      <p className='result'>
        You scored <strong>{score}</strong> out of {maxScore} (
        {Math.ceil(percentage)}%)
      </p>
      <p className='highscore'>(Highscore: {highscore} points)</p>

      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: 'restart' })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
