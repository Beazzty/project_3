// File: client/src/pages/Gameover.tsx
import React from 'react';

interface GameOverProps {
  score: {
    correct: number;
    total: number;
  };
  onTryAgain: () => void; // Function to call when the button is clicked
}

const GameOverPage: React.FC<GameOverProps> = ({ score, onTryAgain }) => {
  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      margin: 0,
      backgroundColor: '#f0f0f0',
    } as React.CSSProperties,
    heading: {
      fontSize: '4em',
      fontWeight: 'bold',
      marginBottom: '20px',
    } as React.CSSProperties,
    button: {
      padding: '10px 20px',
      fontSize: '1.2em',
      cursor: 'pointer',
      marginBottom: '20px',
    } as React.CSSProperties,
    score: {
      fontSize: '1.5em',
    } as React.CSSProperties,
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Game Over</h1>
      <button style={styles.button} onClick={onTryAgain}>
        Try Again
      </button>
      <div style={styles.score}>
        Score: {score.correct}/{score.total}
      </div>
    </div>
  );
};

export default GameOverPage;