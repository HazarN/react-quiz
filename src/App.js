// Custom Hooks
import { useFetch } from './hooks/useFetch';

// Components
import Header from './components/Header';
import Main from './components/Main';

// url of the fake API that's been created with json-server
const url = 'http://localhost:5000/questions';

// The main app that will be rendered in the browser
function App() {
  useFetch(url);

  return (
    <div className='app'>
      <Header />

      <Main>
        <h2>Welcome to the React Quiz!</h2>
        <p>
          This quiz will test your knowledge of React. You will be asked a
          series of multiple-choice questions. Good luck!
        </p>
      </Main>
    </div>
  );
}

export default App;
