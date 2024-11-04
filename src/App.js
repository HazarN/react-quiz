// Libs
import { useEffect, useReducer } from 'react';

// Contexts
import { QuizProvider, useQuizContext } from './contexts/QuizContext';

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

// The main app that will be rendered in the browser
function App() {
  const { status } = useQuizContext();

  return (
    <div className='app'>
      <Header />

      <Main>
        {status === 'loading' && <LoadingScreen />}
        {status === 'error' && <ErrorMessage />}
        {status === 'ready' && <StartScreen />}
        {status === 'active' && (
          <>
            <Progress />
            <Question />

            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === 'finished' && <FinishScreen />}
      </Main>
    </div>
  );
}

export default App;
