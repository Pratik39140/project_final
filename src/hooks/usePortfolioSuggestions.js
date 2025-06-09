import { useState, useEffect } from 'react';

export const usePortfolioSuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        // Get portfolio data from localStorage
        const portfolioData = JSON.parse(localStorage.getItem('portfolio'));

        if (!portfolioData) {
          throw new Error('No portfolio data found');
        }

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": "Bearer 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",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: "deepseek/deepseek-r1-0528:free",
            messages: [
              {
                role: "user",
                content: `Based on this portfolio data: ${JSON.stringify(portfolioData)}, 
                         provide 3-5 investment suggestions and risk management tips.`
              }
            ]
          })
        });

        const data = await response.json();

        // Add validation checks
        if (!response.ok) {
          throw new Error(`API request failed: ${data.error?.message || 'Unknown error'}`);
        }

        if (!data.choices || !data.choices[0] || !data.choices[0].message) {
          throw new Error('Invalid response format from API');
        }

        const suggestionsText = data.choices[0].message.content;

        // Add validation for suggestionsText
        if (!suggestionsText) {
          throw new Error('No suggestions received from API');
        }

        // Convert the response into an array of suggestions
        const suggestionsList = suggestionsText
          .split('\n')
          .map(item => item.replace(/^\d+\.\s*/, '').trim()) // Remove leading numbers if present
          .filter(item => item.length > 0);

        // If no suggestions after filtering, provide a fallback
        if (suggestionsList.length === 0) {
          setSuggestions(['No specific suggestions available at this time.']);
        } else {
          setSuggestions(suggestionsList);
        }
      } catch (err) {
        setError(err.message);
        setSuggestions(['Unable to load suggestions at this time.']);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, []);

  return { suggestions, loading, error };
};