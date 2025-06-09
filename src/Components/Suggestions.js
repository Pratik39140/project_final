import { usePortfolioSuggestions } from '../hooks/usePortfolioSuggestions';
import ReactMarkdown from 'react-markdown';

export default function Suggestions() {
  const { suggestions, loading, error, fetchSuggestions } = usePortfolioSuggestions();

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-black">💬 Suggestions</h2>
        <button
          onClick={fetchSuggestions}
          disabled={loading}
          className={`px-4 py-2 rounded-lg text-white font-medium transition-all duration-300 
            ${loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 hover:shadow-md active:transform active:scale-95'
            }`}
        >
          {loading ? 'Loading...' : 'Get Suggestions'}
        </button>
      </div>
      
      {error ? (
        <p className="text-red-500 p-4 bg-red-50 rounded-lg">{error}</p>
      ) : suggestions.length === 0 ? (
        <p className="text-gray-600 p-4 bg-gray-50 rounded-lg">
          Click the button above to get personalized suggestions based on your portfolio.
        </p>
      ) : (
        <div className="bg-blue-50 rounded-lg p-4">
          <ReactMarkdown
            components={{
              ul: ({ node, ...props }) => (
                <ul className="list-disc list-inside space-y-3" {...props} />
              ),
              li: ({ node, ...props }) => (
                <li className="text-gray-700 hover:text-gray-900 transition-colors duration-200" {...props} />
              )
            }}
          >
            {suggestions.map(tip => `- ${tip}`).join('\n')}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}