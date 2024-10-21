// Libs
import { useEffect, useReducer } from 'react';

// Components
import Header from './components/Header';
import Main from './components/Main';
import StartScreen from './components/StartScreen';
import LoadingScreen from './components/LoadingScreen';
import ErrorMessage from './components/ErrorMessage';
import Question from './components/Question';

// URL of the fake API that's been created with json-server
const url = 'http://localhost:5000/questions';

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
      return { ...state, status: 'active' };
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
    default:
      throw new Error('Action does not exist! (HazarN)');
  }
}
const initialState = {
  status: 'loading', // Can be: loading, error, ready, active, finished
  questions: [],
  index: 0,
  score: 0,
  answer: null,
};

// The main app that will be rendered in the browser
function App() {
  const [{ questions, status, index, answer }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const numOfQuestions = questions.length;

  // Fetching on mount
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => dispatch({ type: 'dataRecevied', payload: data }))
      .catch(err => dispatch({ type: 'dataFailed' }));
  }, []);

  return (
    <div className='app'>
      <Header />

      <Main>
        {status === 'loading' && <LoadingScreen />}
        {status === 'error' && <ErrorMessage />}
        {status === 'ready' && (
          <StartScreen numOfQuestions={numOfQuestions} dispatch={dispatch} />
        )}
        {status === 'active' && (
          <Question
            question={questions[index]}
            dispatch={dispatch}
            answer={answer}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
