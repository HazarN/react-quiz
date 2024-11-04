import { useQuizContext } from '../contexts/QuizContext';

function FinishScreen() {
  const { dispatch, score, maxScore, highscore } = useQuizContext();
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
