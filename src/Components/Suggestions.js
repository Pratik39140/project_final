import { usePortfolioSuggestions } from '../hooks/usePortfolioSuggestions';

export default function Suggestions() {
  const { suggestions, loading, error } = usePortfolioSuggestions();

  if (loading) {
    return (
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-lg font-semibold mb-2">💬 Suggestions</h2>
        <p>Loading suggestions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-lg font-semibold mb-2">💬 Suggestions</h2>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-lg font-semibold mb-2">💬 Suggestions</h2>
      <ul className="list-disc list-inside space-y-2">
        {suggestions.map((tip, i) => (
          <li key={i} className="text-gray-700">{tip}</li>
        ))}
      </ul>
    </div>
  );
}