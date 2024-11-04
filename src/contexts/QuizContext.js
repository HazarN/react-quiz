import { createContext, useContext, useEffect, useReducer } from 'react';

const QuizContext = createContext();
const url = 'http://localhost:5000/questions'; // URL of the fake API that's been created with json-server
const SECS_PER_QUESTION = 30;

function reducer(state, action) {
  switch (action.type) {
    case 'dataRecevied':
      return {
        ...state,
        questions: action.payload,
        status: 'ready',
      };
    case 'dataFailed':
      return { ...state, status: 'error' };
    case 'start':
      return {
        ...state,
        status: 'active',
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case 'newAnswer':
      const currentQuestion = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        score:
          action.payload === currentQuestion.correctOption
            ? state.score + currentQuestion.points
            : state.score,
      };
    case 'nextQuestion':
      return {
        ...state,
        answer: null,
        index: state.index++,
      };
    case 'finished':
      return {
        ...state,
        status: 'finished',
        highscore:
          state.score > state.highscore ? state.score : state.highscore,
      };
    case 'tick':
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 1 ? 'finished' : state.status,
      };
    case 'restart':
      return { ...initialState, questions: state.questions, status: 'ready' };
    default:
      throw new Error('Action does not exist! (HazarN)');
  }
}
const initialState = {
  status: 'loading', // Can be: loading, error, ready, active, finished
  questions: [],
  index: 0,
  score: 0,
  highscore: 0,
  answer: null,
  secondsRemaining: null,
};

function QuizProvider({ children }) {
  const [
    { questions, status, index, answer, score, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numOfQuestions = questions.length;
  const maxScore = questions
    .map((question) => question.points)
    .reduce((acc, point) => acc + point, 0);

  // Fetching on mount
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'dataRecevied', payload: data }))
      .catch((err) => dispatch({ type: 'dataFailed' }));
  }, []);

  return (
    <QuizContext.Provider
      value={{
        status,
        questions,
        index,
        score,
        highscore,
        answer,
        secondsRemaining,
        numOfQuestions,
        maxScore,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuizContext() {
  const context = useContext(QuizContext);

  if (context === undefined)
    throw new Error(
      'The QuizContext is tried to use out of the scope of its provider'
    );

  return context;
}

export { QuizProvider, useQuizContext };
