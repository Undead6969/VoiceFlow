
# VoiceFlow - AI Meeting Transcriber

A modern, AI-powered meeting transcription app with live audio recording, real-time transcription, intelligent note-taking, and comprehensive meeting summaries powered by Google Gemini AI.

![VoiceFlow Logo](https://img.shields.io/badge/VoiceFlow-AI%20Transcriber-7c3aed?style=for-the-badge)

## ✨ Features

### 🎤 Live Audio Recording
- Real-time audio capture with visual feedback
- Recording controls (Start, Pause, Resume, Stop)
- Live audio visualization with frequency analysis
- Timer display showing recording duration

### 📝 Live Transcription
- Real-time speech-to-text conversion
- Timestamped transcript segments
- Browser-based speech recognition (Chrome/Edge)
- Automatic punctuation and formatting

### 🧠 AI-Powered Summaries
- Automatic meeting title generation
- Comprehensive meeting overview
- Key discussion points extraction
- Time-based insights and analysis
- Actionable conclusions and next steps
- Powered by Google Gemini AI

### 📔 Intelligent Note-Taking
- Optional note-taking during recording
- Notes integration with AI summary generation
- Real-time note synchronization

### 🎨 Modern Design
- Beautiful, Notion-inspired interface
- Dark/Light theme toggle with system preference detection
- Responsive design for all devices
- Smooth animations and micro-interactions
- Glass morphism effects and gradients

## 🚀 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Audio**: Web Audio API + MediaRecorder API
- **Speech Recognition**: Web Speech API (webkitSpeechRecognition)
- **AI**: Google Gemini Pro API
- **Build Tool**: Vite
- **State Management**: React Hooks
- **Icons**: Lucide React

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- Modern browser with microphone access
- Google Gemini API key (included in the project)

### Getting Started

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd voiceflow-transcriber
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:8080` and grant microphone permissions when prompted.

## 🎯 How to Use

### Recording a Meeting

1. **Start Recording**: Click the "Start Recording" button to begin
2. **Live Transcription**: Watch real-time transcription appear as you speak
3. **Take Notes** (Optional): Enable notes mode and write additional context
4. **Control Recording**: Use Pause/Resume or Stop as needed
5. **Generate Summary**: Summary automatically generates when recording stops

### Understanding the Interface

#### Live Transcription Tab
- Real-time speech-to-text with timestamps
- Visual audio waveform display
- Scrollable transcript history

#### Notes Tab
- Free-form text area for meeting notes
- Integrates with AI summary generation
- Available when notes mode is enabled

#### Summary Tab
- **Meeting Overview**: AI-generated meeting summary
- **Key Points**: Important discussion topics and decisions
- **Timeline Insights**: Time-specific insights and highlights
- **Conclusion**: Action items and next steps

### Recording Controls

- **🎤 Start Recording**: Begin new meeting transcription
- **⏸️ Pause**: Temporarily stop transcription (resume available)
- **▶️ Resume**: Continue paused recording
- **⏹️ Stop**: End recording and generate AI summary

## 🔧 Configuration

### API Keys
The Google Gemini API key is pre-configured in the application. For production use, consider:
- Moving API keys to environment variables
- Implementing server-side API calls for security
- Setting up proper authentication and rate limiting

### Browser Compatibility
- **Chrome/Chromium**: Full feature support
- **Edge**: Full feature support
- **Firefox**: Limited (no speech recognition)
- **Safari**: Limited (no speech recognition)

## 🎨 Design Philosophy

VoiceFlow follows modern design principles inspired by Notion and other contemporary productivity tools:

- **Minimalism**: Clean, distraction-free interface
- **Accessibility**: High contrast ratios and keyboard navigation
- **Responsiveness**: Works seamlessly across devices
- **Performance**: Optimized for smooth interactions
- **User Experience**: Intuitive workflows and clear feedback

## 📊 Features in Detail

### AI Summary Generation
The AI summary includes:
- **Auto-generated titles** based on meeting content
- **Overview summaries** with key takeaways
- **Organized key points** for quick reference
- **Time-based insights** showing what happened when
- **Actionable conclusions** with next steps

### Audio Processing
- Real-time audio visualization using Web Audio API
- Automatic gain control and noise reduction
- Visual feedback during recording and playback
- Secure local processing (audio never leaves your browser)

### Responsive Design
- Mobile-first approach with touch-friendly controls
- Tablet optimization for note-taking scenarios
- Desktop experience with keyboard shortcuts
- Adaptive layouts for different screen sizes

## 🔒 Privacy & Security

- **Local Processing**: Audio processing happens in your browser
- **No Audio Storage**: Recordings are automatically deleted after transcription
- **Secure API**: Uses HTTPS for all external communications
- **Privacy First**: No personal data stored or transmitted unnecessarily

## 🚀 Deployment

### Building for Production
```bash
npm run build
```

### Deployment Options
- **Vercel**: Connect your repository for automatic deployments
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Use the built-in Pages action
- **Self-hosted**: Deploy the `dist` folder to any web server

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues, feature requests, or pull requests.

### Development Guidelines
- Follow TypeScript best practices
- Use existing component patterns
- Maintain responsive design principles
- Test across multiple browsers
- Update documentation for new features

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Google Gemini AI** for powerful natural language processing
- **shadcn/ui** for beautiful, accessible components
- **Tailwind CSS** for efficient styling
- **Lucide** for consistent iconography
- **Notion** for design inspiration

---

**Built with ❤️ for productive meetings and seamless collaboration.**

For support or questions, please open an issue in the repository.
