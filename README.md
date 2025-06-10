
# 🎙️ VoiceFlow - AI Meeting Transcriber

Transform your meetings with real-time transcription and intelligent AI summaries powered by Google Gemini.

## ✨ Features

- **🎯 Live Transcription** - Real-time speech-to-text with high accuracy
- **🧠 AI Summaries** - Intelligent meeting summaries with key points and insights
- **📝 Smart Notes** - Seamlessly integrated note-taking
- **⏰ Timeline Analysis** - Time-based insights of your meetings
- **💾 Secure Storage** - Save and access your transcriptions anywhere
- **🔐 Google Authentication** - Secure sign-in with your Google account
- **🌙 Dark/Light Mode** - Beautiful themes for any preference
- **📱 Responsive Design** - Works perfectly on all devices

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/voiceflow.git
   cd voiceflow
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Supabase**
   - Create a new Supabase project
   - Update the configuration in `src/integrations/supabase/client.ts`
   - Enable Google OAuth in Supabase Auth settings

4. **Set up Google Gemini API**
   - Get your API key from Google AI Studio
   - Configure it in the app's API settings

5. **Start the development server**
   ```bash
   npm run dev
   ```

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **AI**: Google Gemini API
- **Audio**: Web Speech API, MediaRecorder API
- **UI Components**: shadcn/ui, Radix UI
- **Build Tool**: Vite

## 📖 Usage

1. **Start Recording** - Click the microphone button to begin live transcription
2. **Take Notes** - Add your own notes during the meeting
3. **Get AI Summary** - Automatic intelligent summaries when you stop recording
4. **Save & Access** - Sign in to save your transcriptions and access them anywhere
5. **Review History** - Browse your past meetings and transcriptions

## 🔧 Configuration

### API Settings
- Configure your Google Gemini API key in the profile dropdown
- Choose from multiple AI models (gemini-2.0-flash, gemini-pro, etc.)

### Authentication
- Google OAuth integration via Supabase
- Secure user profiles and data storage

## 🗄️ Database Schema

The app uses Supabase with the following main tables:
- `profiles` - User profile information
- `transcriptions` - Meeting transcripts and summaries

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Gemini AI for intelligent summaries
- Supabase for backend infrastructure
- shadcn/ui for beautiful UI components
- Web Speech API for transcription capabilities

## 📞 Support

If you have any questions or need help, please open an issue or contact us at support@voiceflow.app

---

Made with ❤️ for better meetings and productivity.
