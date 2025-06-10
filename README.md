
# VoiceFlow - AI Meeting Transcriber

VoiceFlow is a modern web application that provides live audio transcription with AI-powered meeting summaries and intelligent note-taking capabilities.

## Features

### 🎙️ Live Transcription
- Real-time speech-to-text conversion
- High accuracy with automatic punctuation
- Timestamp tracking for every transcript segment
- Pause and resume functionality

### 🧠 AI-Powered Summaries
- Automatic meeting title generation
- Comprehensive meeting overview
- Key points extraction
- Time-based insights and analysis
- Actionable conclusions and next steps
- Powered by Google Gemini AI

### 📝 Smart Note-Taking
- Take notes while recording
- Notes are integrated into AI summary generation
- Persistent note storage during sessions

### 🎨 Modern Interface
- Beautiful, responsive design
- Dark/Light theme support
- Smooth animations and transitions
- Glass morphism effects
- Mobile-friendly layout

### ⚙️ Configurable AI Settings
- Switch between different Gemini models
- Custom API key configuration
- Model selection (Gemini 2.0 Flash, Gemini Pro, etc.)

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Shadcn/ui component library
- **Audio Processing**: Web Audio API with real-time visualization
- **Speech Recognition**: Web Speech API
- **AI Integration**: Google Gemini API
- **Routing**: React Router v6
- **State Management**: React hooks
- **Build Tool**: Vite

## Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Google Gemini API key
- Modern web browser with microphone access

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd voiceflow
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Configuration

1. **API Setup**: Click on "API Settings" in the transcriber page
2. **Enter your Google Gemini API key**
3. **Select your preferred model** (Gemini 2.0 Flash recommended)
4. **Grant microphone permissions** when prompted

## Usage

### Basic Workflow

1. **Landing Page**: Start from the beautiful landing page showcasing features
2. **Start Recording**: Click "Start Recording" to begin live transcription
3. **Take Notes**: Use the Notes tab to add additional context
4. **Stop Recording**: Click "Stop" to end the session
5. **Review Summary**: Get instant AI-generated insights and summaries

### Features in Detail

#### Live Transcription
- Real-time audio visualization
- Timestamp-based transcript segments
- Pause/resume functionality
- Live status indicators

#### AI Summary Generation
- Automatic meeting title creation
- Structured overview and key points
- Time-based insights showing what happened when
- Actionable conclusions and next steps

#### Notes Integration
- Take notes during recording
- Notes are included in AI summary generation
- Persistent throughout the session

## API Configuration

### Google Gemini API
1. Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Configure in the app settings
3. Choose from available models:
   - `gemini-2.0-flash` (Recommended - Fast and efficient)
   - `gemini-pro` (Standard model)
   - `gemini-1.5-pro` (Advanced capabilities)

## Browser Compatibility

- **Chrome**: Full support (recommended)
- **Firefox**: Full support
- **Safari**: Full support
- **Edge**: Full support

**Note**: Requires HTTPS for microphone access in production environments.

## Privacy & Security

- **No data storage**: Recordings are processed locally and not saved
- **API calls**: Only transcript text is sent to Google Gemini for summary generation
- **Local processing**: Audio processing happens in your browser
- **User control**: Full control over API keys and data

## Development

### Project Structure
```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── services/           # API and external services
├── hooks/              # Custom React hooks
└── lib/                # Utilities and helpers
```

### Key Components
- `Landing.tsx` - Beautiful landing page with feature showcase
- `Transcriber.tsx` - Main transcription interface
- `RecordingVisualizer.tsx` - Audio visualization component
- `ApiSettings.tsx` - API configuration dialog
- `aiSummaryService.ts` - Google Gemini integration

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, feature requests, or bug reports, please open an issue on the GitHub repository.

---

**VoiceFlow** - Transform your meetings into actionable insights with AI-powered transcription and analysis.
