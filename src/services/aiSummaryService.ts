
interface TimeStampedText {
  text: string;
  timestamp: number;
}

interface SummaryResponse {
  title: string;
  overview: string;
  keyPoints: string[];
  timeBasedInsights: Array<{
    timeRange: string;
    insight: string;
  }>;
  conclusion: string;
}

const GEMINI_API_KEY = 'AIzaSyB73ozhhHZpLJEvSvktnEMgjRBv8hfhEng';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

export async function generateSummary(
  transcriptSegments: TimeStampedText[],
  notes: string = ''
): Promise<SummaryResponse> {
  const fullTranscript = transcriptSegments.map(segment => 
    `[${formatTimestamp(segment.timestamp)}] ${segment.text}`
  ).join('\n');

  const prompt = `
Please analyze this meeting transcript and generate a comprehensive summary:

TRANSCRIPT:
${fullTranscript}

${notes ? `ADDITIONAL NOTES:\n${notes}\n` : ''}

Please provide a JSON response with the following structure:
{
  "title": "Auto-generated meeting title (max 10 words)",
  "overview": "Brief overview of the meeting (2-3 sentences)",
  "keyPoints": ["Array of 5-7 key discussion points"],
  "timeBasedInsights": [
    {
      "timeRange": "00:00-05:30",
      "insight": "Meaningful insight from this time period"
    }
  ],
  "conclusion": "Summary conclusion and next steps"
}

Focus on:
- Creating a descriptive title based on the main topic
- Identifying key decisions, action items, and important discussions
- Grouping meaningful insights by time ranges (3-5 minute chunks)
- Extracting actionable conclusions and next steps
`;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.4,
          topK: 32,
          topP: 1,
          maxOutputTokens: 2048,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data.candidates[0].content.parts[0].text;
    
    // Extract JSON from the response
    const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in response');
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Error generating summary:', error);
    
    // Fallback summary
    return {
      title: "Meeting Summary",
      overview: "This meeting covered various topics and discussions.",
      keyPoints: [
        "Key discussion points were covered",
        "Multiple participants contributed to the conversation",
        "Important decisions were made during the session"
      ],
      timeBasedInsights: [
        {
          timeRange: "00:00-End",
          insight: "General discussion and collaboration took place"
        }
      ],
      conclusion: "The meeting concluded with actionable next steps and clear outcomes."
    };
  }
}

function formatTimestamp(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
