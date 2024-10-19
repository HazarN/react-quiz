// Components
import Header from './components/Header';
import Main from './components/Main';

// The main app that will be rendered in the browser
function App() {
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
