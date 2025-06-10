import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ApiSettings } from '@/components/ApiSettings';
import { RecordingVisualizer } from '@/components/RecordingVisualizer';
import { generateSummary } from '@/services/aiSummaryService';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Mic, MicOff, Square, Play, Pause, FileText, Brain, Clock, Target, Lightbulb, ArrowLeft } from 'lucide-react';

interface TranscriptSegment {
  text: string;
  timestamp: number;
  id: string;
}

interface Summary {
  title: string;
  overview: string;
  keyPoints: string[];
  timeBasedInsights: Array<{
    timeRange: string;
    insight: string;
  }>;
  conclusion: string;
}

const Transcriber = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [transcript, setTranscript] = useState<TranscriptSegment[]>([]);
  const [notes, setNotes] = useState('');
  const [summary, setSummary] = useState<Summary | null>(null);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [meetingTitle, setMeetingTitle] = useState('');
  const [recordingStartTime, setRecordingStartTime] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [apiKey, setApiKey] = useState('AIzaSyB73ozhhHZpLJEvSvktnEMgjRBv8hfhEng');
  const [model, setModel] = useState('gemini-2.0-flash');

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioStreamRef = useRef<MediaStream | null>(null);
  const recognitionRef = useRef<any>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  const { toast } = useToast();

  useEffect(() => {
    if (isRecording && !isPaused && recordingStartTime) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(Date.now() - recordingStartTime);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRecording, isPaused, recordingStartTime]);

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}:${(minutes % 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
    }
    return `${minutes}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioStreamRef.current = stream;
      
      if ('webkitSpeechRecognition' in window) {
        const recognition = new (window as any).webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
          let finalTranscript = '';
          
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript;
            }
          }

          if (finalTranscript) {
            const timestamp = recordingStartTime ? (Date.now() - recordingStartTime) / 1000 : 0;
            const newSegment: TranscriptSegment = {
              id: Date.now().toString(),
              text: finalTranscript.trim(),
              timestamp
            };
            
            setTranscript(prev => [...prev, newSegment]);
          }
        };

        recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          toast({
            title: "Recognition Error",
            description: "Speech recognition encountered an error. Please try again.",
            variant: "destructive"
          });
        };

        recognitionRef.current = recognition;
        recognition.start();
      }

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      setIsRecording(true);
      setIsPaused(false);
      setRecordingStartTime(Date.now());
      setSummary(null);
      
      toast({
        title: "Recording Started",
        description: "Live transcription is now active",
      });

    } catch (error) {
      console.error('Error starting recording:', error);
      toast({
        title: "Error",
        description: "Could not access microphone. Please check permissions.",
        variant: "destructive"
      });
    }
  };

  const pauseRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsPaused(true);
    toast({
      title: "Recording Paused",
      description: "Transcription temporarily stopped",
    });
  };

  const resumeRecording = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.start();
    }
    setIsPaused(false);
    toast({
      title: "Recording Resumed",
      description: "Transcription continuing",
    });
  };

  const stopRecording = async () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    
    if (audioStreamRef.current) {
      audioStreamRef.current.getTracks().forEach(track => track.stop());
    }

    setIsRecording(false);
    setIsPaused(false);
    setCurrentTime(0);
    setRecordingStartTime(null);

    if (transcript.length > 0) {
      await generateMeetingSummary();
    }

    toast({
      title: "Recording Stopped",
      description: "Generating AI summary...",
    });
  };

  const generateMeetingSummary = async () => {
    setIsGeneratingSummary(true);
    try {
      const summaryData = await generateSummary(transcript, notes, apiKey, model);
      setSummary(summaryData);
      setMeetingTitle(summaryData.title);
      
      toast({
        title: "Summary Generated",
        description: "AI analysis complete",
      });
    } catch (error) {
      console.error('Error generating summary:', error);
      toast({
        title: "Summary Error",
        description: "Could not generate summary. Please check your API settings.",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 font-inter">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center">
                <Mic className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">VoiceFlow</h1>
                <p className="text-xs text-muted-foreground">AI Meeting Transcriber</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {isRecording && (
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse-recording" />
                <span className="font-mono">{formatTime(currentTime)}</span>
              </div>
            )}
            <ApiSettings 
              apiKey={apiKey}
              model={model}
              onApiKeyChange={setApiKey}
              onModelChange={setModel}
            />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 max-w-6xl">
        {/* Meeting Title */}
        {meetingTitle && (
          <div className="mb-6 animate-fade-in">
            <h2 className="text-2xl font-bold text-foreground">{meetingTitle}</h2>
            <p className="text-muted-foreground">Generated automatically</p>
          </div>
        )}

        {/* Recording Controls */}
        <Card className="mb-6 glass-effect">
          <CardContent className="p-6">
            <div className="flex flex-col space-y-4">
              <RecordingVisualizer isRecording={isRecording && !isPaused} audioStream={audioStreamRef.current || undefined} />
              
              <div className="flex items-center justify-center">
                <div className="flex items-center space-x-4">
                  {!isRecording ? (
                    <Button onClick={startRecording} size="lg" className="bg-primary hover:bg-primary/90">
                      <Mic className="w-4 h-4 mr-2" />
                      Start Recording
                    </Button>
                  ) : (
                    <div className="flex space-x-2">
                      {!isPaused ? (
                        <Button onClick={pauseRecording} variant="outline" size="lg">
                          <Pause className="w-4 h-4 mr-2" />
                          Pause
                        </Button>
                      ) : (
                        <Button onClick={resumeRecording} size="lg" className="bg-green-600 hover:bg-green-700">
                          <Play className="w-4 h-4 mr-2" />
                          Resume
                        </Button>
                      )}
                      <Button onClick={stopRecording} variant="destructive" size="lg">
                        <Square className="w-4 h-4 mr-2" />
                        Stop
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="transcription" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="transcription" className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Live Transcription</span>
            </TabsTrigger>
            <TabsTrigger value="notes">
              <span>Notes</span>
            </TabsTrigger>
            <TabsTrigger value="summary" disabled={!summary && !isGeneratingSummary}>
              <Brain className="w-4 h-4" />
              <span>AI Summary</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="transcription">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>Live Transcription</span>
                  {isRecording && !isPaused && <Badge variant="destructive" className="animate-pulse">LIVE</Badge>}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96 w-full rounded-md border p-4">
                  {transcript.length === 0 ? (
                    <div className="text-center text-muted-foreground py-12">
                      <Mic className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Start recording to see live transcription</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {transcript.map((segment) => (
                        <div key={segment.id} className="flex space-x-3 p-3 rounded-lg bg-muted/50">
                          <Badge variant="outline" className="shrink-0 font-mono text-xs">
                            {Math.floor(segment.timestamp / 60)}:{(Math.floor(segment.timestamp) % 60).toString().padStart(2, '0')}
                          </Badge>
                          <p className="text-sm leading-relaxed">{segment.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notes">
            <Card>
              <CardHeader>
                <CardTitle>Meeting Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Take notes during the meeting... These will be included in the AI summary."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-96 resize-none"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="summary">
            <div className="space-y-6">
              {isGeneratingSummary ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Brain className="w-12 h-12 mx-auto mb-4 animate-pulse text-primary" />
                    <h3 className="text-lg font-semibold mb-2">Generating AI Summary</h3>
                    <p className="text-muted-foreground">Analyzing transcript and generating insights...</p>
                  </CardContent>
                </Card>
              ) : summary ? (
                <>
                  {/* Overview */}
                  <Card className="animate-fade-in">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Target className="w-5 h-5" />
                        <span>Meeting Overview</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-foreground leading-relaxed">{summary.overview}</p>
                    </CardContent>
                  </Card>

                  {/* Key Points */}
                  <Card className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Lightbulb className="w-5 h-5" />
                        <span>Key Points</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {summary.keyPoints.map((point, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                            <span className="text-foreground">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Time-based Insights */}
                  <Card className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Clock className="w-5 h-5" />
                        <span>Timeline Insights</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {summary.timeBasedInsights.map((insight, index) => (
                          <div key={index} className="border-l-2 border-primary pl-4">
                            <Badge variant="outline" className="mb-2">{insight.timeRange}</Badge>
                            <p className="text-foreground">{insight.insight}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Conclusion */}
                  <Card className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                    <CardHeader>
                      <CardTitle>Conclusion & Next Steps</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-foreground leading-relaxed">{summary.conclusion}</p>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Brain className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-semibold mb-2">No Summary Available</h3>
                    <p className="text-muted-foreground">Complete a recording to generate an AI summary</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Transcriber;
