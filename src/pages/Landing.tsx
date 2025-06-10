
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Mic, Brain, FileText, Zap, Users, Clock } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

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
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold gradient-text">
              Transform Meetings into
              <br />
              Actionable Insights
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Live audio transcription with AI-powered summaries, intelligent note-taking, and automated meeting analysis.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-lg px-8 py-6"
              onClick={() => navigate('/transcriber')}
            >
              <Mic className="w-5 h-5 mr-2" />
              Start Recording
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-6"
            >
              View Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything you need for productive meetings
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="glass-effect hover-scale animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Mic className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Live Transcription</h3>
                <p className="text-muted-foreground">
                  Real-time speech-to-text with high accuracy and automatic punctuation.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-effect hover-scale animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Summaries</h3>
                <p className="text-muted-foreground">
                  Automated meeting summaries with key points, insights, and action items.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-effect hover-scale animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Smart Notes</h3>
                <p className="text-muted-foreground">
                  Take notes while recording and combine them with AI analysis.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Additional Features */}
      <section className="container mx-auto px-6 py-16 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Instant Processing</h3>
              <p className="text-muted-foreground text-sm">
                Get summaries and insights immediately after your meeting ends.
              </p>
            </div>

            <div className="text-center animate-fade-in" style={{ animationDelay: '0.7s' }}>
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Multi-Speaker</h3>
              <p className="text-muted-foreground text-sm">
                Automatically detects and transcribes multiple speakers in meetings.
              </p>
            </div>

            <div className="text-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Timeline Insights</h3>
              <p className="text-muted-foreground text-sm">
                Get time-stamped insights showing what happened when in your meeting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <div className="max-w-2xl mx-auto space-y-6 animate-fade-in" style={{ animationDelay: '0.9s' }}>
          <h2 className="text-3xl font-bold">Ready to transform your meetings?</h2>
          <p className="text-muted-foreground">
            Start transcribing and get AI-powered insights in seconds.
          </p>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-lg px-8 py-6"
            onClick={() => navigate('/transcriber')}
          >
            <Mic className="w-5 h-5 mr-2" />
            Get Started Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Landing;
