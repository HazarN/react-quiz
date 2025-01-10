# React Quiz App

A dynamic quiz application built with React that tests users' knowledge of React concepts. Features include a timer, progress tracking, and high score management.

## Features

- 🎯 Multiple choice questions about React
- ⏱️ Timer for each quiz session
- 📊 Progress tracking
- 🏆 High score system
- 🎨 Modern and responsive UI
- 🔄 Restart functionality
- ⚡ Real-time feedback on answers

## Technologies Used

- React 18.3
- JSON Server (for mock API)
- CSS3 with custom properties
- Context API for state management

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (latest stable version)
- npm or yarn package manager

## Installation

1. Clone the repository:
_bashhere_
git clone [your-repository-url]
cd react-quiz
_bashhere_

2. Install dependencies:
_bashhere_
npm install
_bashhere_

3. Start the JSON server (mock API):
_bashhere_
npm run server
_bashhere_

4. Start the development server:
_bashhere_
npm run dev
_bashhere_

The application will be available at `http://localhost:3000`

## Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Creates a production build
- `npm run server` - Runs the JSON server on port 5000
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App

## Project Structure
```
react-quiz/
├── public/
├── src/
│ ├── components/
│ │ ├── ErrorMessage.js
│ │ ├── FinishScreen.js
│ │ ├── Header.js
│ │ ├── LoadingScreen.js
│ │ ├── NextButton.js
│ │ ├── Options.js
│ │ ├── Progress.js
│ │ ├── Question.js
│ │ ├── StartScreen.js
│ │ └── Timer.js
│ ├── contexts/
│ │ └── QuizContext.js
│ ├── App.js
│ └── index.js
├── data/
│ └── questions.json
└── package.json
```

## Features in Detail

### Quiz Flow
1. Welcome screen with start button
2. Questions presented one at a time
3. Real-time feedback on answer selection
4. Progress bar showing completion status
5. Timer counting down for each session
6. Final score display with high score tracking

### State Management
- Uses Context API for global state management
- Implements reducer pattern for state updates
- Maintains quiz status, scores, and timer state

### API Integration
- Fetches questions from local JSON server
- Handles loading and error states
- Provides mock API for development

## Acknowledgments

- Create React App team
- React team
- JSON Server team

## Contact

Your Name - [your-email@example.com]
