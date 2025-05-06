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
  const styles: React.CSSProperties = {
    container: {
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      margin: 0,
      backgroundColor: '#f0f0f0',
    },
    heading: {
      fontSize: '4em', // Large text
      fontWeight: 'bold', // Bold text
      marginBottom: '20px',
    },
    button: {
      padding: '10px 20px',
      fontSize: '1.2em',
      cursor: 'pointer',
      marginBottom: '20px',
    },
    score: {
      fontSize: '1.5em',
    },
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