// Libs
import { useEffect, useReducer } from 'react';

// Components
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import StartScreen from './components/StartScreen';
import LoadingScreen from './components/LoadingScreen';
import ErrorMessage from './components/ErrorMessage';
import Question from './components/Question';
import NextButton from './components/NextButton';
import Progress from './components/Progress';
import FinishScreen from './components/FinishScreen';
import Timer from './components/Timer';

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

// The main app that will be rendered in the browser
function App() {
  const [
    { questions, status, index, answer, score, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numOfQuestions = questions.length;
  const maxScore = questions
    .map(question => question.points)
    .reduce((acc, point) => acc + point, 0);

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
          <>
            <Progress
              index={index}
              numOfQuestions={numOfQuestions}
              score={score}
              maxScore={maxScore}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />

            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                index={index}
                numOfQuestions={numOfQuestions}
                answer={answer}
              />
            </Footer>
          </>
        )}
        {status === 'finished' && (
          <FinishScreen
            dispatch={dispatch}
            score={score}
            maxScore={maxScore}
            highscore={highscore}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
