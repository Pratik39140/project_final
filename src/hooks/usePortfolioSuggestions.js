import { useState, useEffect } from 'react';

export const usePortfolioSuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSuggestions = async () => {
    setLoading(true);
    setError(null);
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

      if (!response.ok) {
        throw new Error(`API request failed: ${data.error?.message || 'Unknown error'}`);
      }

      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        throw new Error('Invalid response format from API');
      }

      const suggestionsText = data.choices[0].message.content;

      if (!suggestionsText) {
        throw new Error('No suggestions received from API');
      }

      const suggestionsList = suggestionsText
        .split('\n')
        .map(item => item.replace(/^\d+\.\s*/, '').trim())
        .filter(item => item.length > 0);

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

  return { suggestions, loading, error, fetchSuggestions };
}