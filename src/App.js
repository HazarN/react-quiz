// Libs
import { useEffect, useReducer } from 'react';

// Components
import Header from './components/Header';
import Main from './components/Main';
import StartScreen from './components/StartScreen';
import LoadingScreen from './components/LoadingScreen';
import ErrorMessage from './components/ErrorMessage';

// url of the fake API that's been created with json-server
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
      return {
        ...state,
        status: 'error',
      };
    default:
      throw new Error('Action does not exist! (HazarN)');
  }
}
const initialState = {
  questions: [],

  // can be: loading, error, ready, active, finished
  status: 'loading',
};

// The main app that will be rendered in the browser
function App() {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);
  const numOfQuestions = questions.length;

  // fetching on mount
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
        {status === 'ready' && <StartScreen numOfQuestions={numOfQuestions} />}
      </Main>
    </div>
  );
}

export default App;
