import { useQuizContext } from '../contexts/QuizContext';

function NextButton() {
  const { dispatch, index, numOfQuestions, answer } = useQuizContext();

  if (answer === null) return;

  // Middle question
  if (index < numOfQuestions - 1)
    return (
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: 'nextQuestion' })}
      >
        Next
      </button>
    );

  // Final question
  if (index === numOfQuestions - 1)
    return (
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: 'finished' })}
      >
        Finish
      </button>
    );
}

export default NextButton;
