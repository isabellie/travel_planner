import React, { useState } from 'react';
import InputForm from './components/InputForm';
import ResultDisplay from './components/ResultDisplay';
import { getTravelPlan } from './services/api';
import { TravelFormData } from './types';

const App: React.FC = () => {
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (formData: TravelFormData) => {
    setLoading(true);
    setError('');
    setResult('');
    try {
      const plan = await getTravelPlan(formData);
      setResult(plan);
    } catch (err) {
      setError('Failed to generate travel plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Travel Planner</h1>
      <InputForm onSubmit={handleSubmit} loading={loading} />
      <ResultDisplay result={result} error={error} loading={loading} />
    </div>
  );
};

export default App;
