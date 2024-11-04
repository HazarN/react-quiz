import { useQuizContext } from '../contexts/QuizContext';
import Options from './Options';

function Question() {
  const { questions, answer, index, dispatch } = useQuizContext();
  const question = questions.at(index);

  return (
    <>
      <h4>{question.question}</h4>

      <Options question={question} answer={answer} dispatch={dispatch} />
    </>
  );
}

export default Question;
