import { TravelFormData } from '../types';

export async function getTravelPlan(formData: TravelFormData): Promise<string> {
  const response = await fetch('/api/travel-plan', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();
  return data.plan;
}
