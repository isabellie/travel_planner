import React, { useState } from 'react';
import { TravelFormData } from '../types';

interface InputFormProps {
  onSubmit: (formData: TravelFormData) => void;
  loading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, loading }) => {
  const [destination, setDestination] = useState<string>('');
  const [interests, setInterests] = useState<string>('');
  const [budget, setBudget] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ destination, interests, budget });
  };

  return (
    <form className="input-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="destination">Destination</label>
        <input
          id="destination"
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="e.g. Tokyo, Japan"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="interests">Interests</label>
        <input
          id="interests"
          type="text"
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
          placeholder="e.g. food, hiking, history"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="budget">Budget</label>
        <input
          id="budget"
          type="text"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          placeholder="e.g. $1000"
          required
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Generating...' : 'Get Travel Plan'}
      </button>
    </form>
  );
};

export default InputForm;
