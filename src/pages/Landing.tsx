
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LoginDialog } from '@/components/LoginDialog';
import { HistorySidebar } from '@/components/HistorySidebar';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Mic, Brain, FileText, Zap, Star, ArrowRight, History } from 'lucide-react';

const Landing = () => {
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/transcriber');
  };

  const handleSignIn = () => {
    if (user) {
      setShowHistory(true);
    } else {
      setShowLoginDialog(true);
    }
  };

  const handleSelectTranscription = (transcription: any) => {
    navigate('/transcriber', { state: { loadTranscription: transcription } });
    setShowHistory(false);
  };

  const features = [
    {
      icon: Mic,
      title: "Real-time Transcription",
      description: "Live speech-to-text with high accuracy using advanced AI models"
    },
    {
      icon: Brain,
      title: "AI-Powered Summaries",
      description: "Intelligent meeting summaries with key points and action items"
    },
    {
      icon: FileText,
      title: "Smart Note-taking",
      description: "Seamlessly integrate your notes with transcription for complete records"
    },
    {
      icon: Zap,
      title: "Instant Processing",
      description: "Get summaries and insights immediately after your meeting ends"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 font-inter">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center">
              <Mic className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">VoiceFlow</h1>
              <p className="text-xs text-muted-foreground">AI Meeting Transcriber</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="hidden sm:flex">
              ✨ Powered by Google Gemini AI
            </Badge>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-6">
            ✨ Powered by Google Gemini AI
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text leading-tight">
            Transform Your Meetings with AI
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Real-time transcription, intelligent summaries, and seamless note-taking. 
            Make every meeting more productive with VoiceFlow.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button onClick={handleGetStarted} size="lg" className="text-lg px-8 py-6 clickable-cursor">
              <Mic className="w-5 h-5 mr-2" />
              Start Recording
            </Button>
            <Button 
              onClick={handleSignIn} 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-6 clickable-cursor"
            >
              {user ? (
                <>
                  <History className="w-5 h-5 mr-2" />
                  View History
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-muted/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything you need for productive meetings
            </h2>
            <p className="text-xl text-muted-foreground">
              Powered by cutting-edge AI technology for the best transcription experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="space-y-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <Card className="p-8 glass-effect">
            <CardContent className="space-y-6">
              <div className="flex items-center justify-center space-x-2 text-yellow-500 mb-4">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
              </div>
              
              <h2 className="text-3xl font-bold">Ready to transform your meetings?</h2>
              <p className="text-muted-foreground text-lg">
                Join thousands of professionals who trust VoiceFlow for their meeting transcription needs.
              </p>
              
              <Button onClick={handleGetStarted} size="lg" className="text-lg px-8 py-6 clickable-cursor">
                Get Started Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-6">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; 2024 VoiceFlow. Built with ❤️ for productive meetings.</p>
        </div>
      </footer>

      {/* Dialogs */}
      <LoginDialog 
        isOpen={showLoginDialog} 
        onClose={() => setShowLoginDialog(false)} 
      />
      
      <HistorySidebar
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        onSelectTranscription={handleSelectTranscription}
      />
    </div>
  );
};

export default Landing;
