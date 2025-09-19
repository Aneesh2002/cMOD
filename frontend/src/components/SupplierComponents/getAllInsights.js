import React from 'react';

export const getAiInsights = async (data) => {
    const apiKey = ""; // Canvas provides this
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    const prompt = `
      You are an expert energy market analyst providing insights to a supplier.
      Supplier Data:
      - KPIs: ${JSON.stringify(data.kpis)}
      - Recent Transactions: ${JSON.stringify(data.transactions)}
      - Energy Supply Trend (last 6 months): ${JSON.stringify(data.energyChart)}

      Analyze this data and provide a concise, actionable summary in markdown format.
      - Start with a title "### AI-Powered Insights".
      - Provide 2-3 bullet points highlighting key trends or anomalies.
      - Conclude with a "Recommendation" section suggesting a specific action the supplier should take.
      Your tone should be professional and data-driven.
    `;

    const payload = { contents: [{ parts: [{ text: prompt }] }] };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error(`API Error: ${response.status}`);
        const result = await response.json();
        // Using showdown or similar library would be better for production markdown
        const markdown = result.candidates?.[0]?.content?.parts?.[0]?.text || "No insights available.";
        return markdown
            .replace(/### (.*)/g, '<h3 class="font-bold text-gray-800 mb-2">$1</h3>')
            .replace(/\* (.*)/g, '<li class="ml-4">$1</li>')
            .replace(/Recommendation:/g, '<strong class="font-semibold">Recommendation:</strong>');

    } catch (error) {
        console.error("Gemini API call failed:", error);
        return "Failed to generate insights. Please try again later.";
    }
};

export default getAiInsights;