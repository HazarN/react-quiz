function Progress({ index, numOfQuestions, score, maxScore }) {
  return (
    <header className='progress'>
      <progress max={numOfQuestions} value={index + 1}></progress>

      <p>
        Question <strong>{index + 1}</strong> / {numOfQuestions}
      </p>

      <p>
        <strong>{score}</strong> / {maxScore} points
      </p>
    </header>
  );
}

export default Progress;
