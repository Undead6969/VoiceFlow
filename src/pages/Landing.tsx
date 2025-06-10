
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LoginDialog } from '@/components/LoginDialog';
import { HistorySidebar } from '@/components/HistorySidebar';
import { ProfileDropdown } from '@/components/ProfileDropdown';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Mic, FileText, Brain, Zap, Clock, Shield, Play, History } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [apiKey, setApiKey] = useState('AIzaSyB73ozhhHZpLJEvSvktnEMgjRBv8hfhEng');
  const [model, setModel] = useState('gemini-2.0-flash');

  const features = [
    {
      icon: <Mic className="w-8 h-8 text-primary" />,
      title: "Live Transcription",
      description: "Real-time speech-to-text with high accuracy"
    },
    {
      icon: <Brain className="w-8 h-8 text-primary" />,
      title: "AI Summaries",
      description: "Intelligent meeting summaries powered by Google Gemini"
    },
    {
      icon: <FileText className="w-8 h-8 text-primary" />,
      title: "Smart Notes",
      description: "Take notes that integrate seamlessly with your transcripts"
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: "Timeline Insights",
      description: "Time-based analysis of your meetings"
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Secure Storage",
      description: "Your data is safely stored and accessible only to you"
    },
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: "Fast & Efficient",
      description: "Optimized for performance and reliability"
    }
  ];

  const handleStartDemo = () => {
    navigate('/transcriber');
  };

  const handleHistoryClick = () => {
    setShowHistory(true);
  };

  const handleSelectTranscription = (transcription: any) => {
    navigate('/transcriber', { state: { loadTranscription: transcription } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 custom-cursor">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50 transition-all duration-300 header-scroll">
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
            {user ? (
              <ProfileDropdown
                apiKey={apiKey}
                model={model}
                onApiKeyChange={setApiKey}
                onModelChange={setModel}
                onHistoryClick={handleHistoryClick}
              />
            ) : (
              <ThemeToggle />
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-16 pb-24 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-6 animate-fade-in">
            ✨ Powered by Google Gemini AI
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Transform Your Meetings with AI
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Real-time transcription, intelligent summaries, and seamless note-taking. 
            Make every meeting more productive with VoiceFlow.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button 
              size="lg" 
              onClick={handleStartDemo}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 clickable-cursor"
            >
              <Play className="w-5 h-5 mr-2" />
              {user ? 'Start New Recording' : 'Try Demo'}
            </Button>
            
            {user && (
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleHistoryClick}
                className="px-8 py-6 text-lg rounded-full hover:bg-muted transition-all duration-300 clickable-cursor"
              >
                <History className="w-5 h-5 mr-2" />
                View History
              </Button>
            )}
            
            {!user && (
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => setShowLoginDialog(true)}
                className="px-8 py-6 text-lg rounded-full hover:bg-muted transition-all duration-300 clickable-cursor"
              >
                <History className="w-5 h-5 mr-2" />
                Sign In
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Everything You Need</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive meeting tools designed for the modern workplace
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="glass-effect hover:scale-105 transition-all duration-300 animate-fade-in" 
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <CardHeader>
                <div className="mb-4">{feature.icon}</div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <Card className="glass-effect max-w-2xl mx-auto">
          <CardContent className="p-12">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of professionals who trust VoiceFlow for their meeting needs.
            </p>
            <Button 
              size="lg" 
              onClick={handleStartDemo}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 clickable-cursor"
            >
              <Mic className="w-5 h-5 mr-2" />
              Start Recording Now
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Login Dialog */}
      <LoginDialog 
        isOpen={showLoginDialog} 
        onClose={() => setShowLoginDialog(false)} 
      />

      {/* History Sidebar */}
      <HistorySidebar
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        onSelectTranscription={handleSelectTranscription}
      />
    </div>
  );
};

export default Landing;
