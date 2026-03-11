import React from 'react';

interface ResultDisplayProps {
  result: string;
  error: string;
  loading: boolean;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, error, loading }) => {
  if (loading) {
    return <div className="result-display loading">Generating your travel plan...</div>;
  }

  if (error) {
    return <div className="result-display error">{error}</div>;
  }

  if (!result) {
    return null;
  }

  return (
    <div className="result-display">
      <h2>Your Travel Plan</h2>
      <p>{result}</p>
    </div>
  );
};

export default ResultDisplay;
