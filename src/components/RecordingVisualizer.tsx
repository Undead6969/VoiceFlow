
import React, { useEffect, useRef } from 'react';

interface RecordingVisualizerProps {
  isRecording: boolean;
  audioStream?: MediaStream;
}

export function RecordingVisualizer({ isRecording, audioStream }: RecordingVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const analyserRef = useRef<AnalyserNode>();

  useEffect(() => {
    if (!audioStream || !isRecording) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaStreamSource(audioStream);
    
    analyser.fftSize = 128;
    source.connect(analyser);
    analyserRef.current = analyser;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      if (!canvasRef.current || !analyserRef.current) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      analyserRef.current.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerY = canvas.height / 2;
      const barWidth = 2;
      const spacing = 1;
      const maxBars = Math.floor(canvas.width / (barWidth + spacing));
      
      for (let i = 0; i < Math.min(bufferLength, maxBars); i++) {
        const barHeight = (dataArray[i] / 255) * (canvas.height * 0.8);
        const x = i * (barWidth + spacing) + spacing;

        const gradient = ctx.createLinearGradient(0, centerY - barHeight/2, 0, centerY + barHeight/2);
        gradient.addColorStop(0, 'hsl(262.1, 83.3%, 57.8%)');
        gradient.addColorStop(0.5, 'hsl(262.1, 83.3%, 67.8%)');
        gradient.addColorStop(1, 'hsl(262.1, 83.3%, 57.8%)');

        ctx.fillStyle = gradient;
        ctx.fillRect(x, centerY - barHeight/2, barWidth, barHeight);
      }

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      audioContext.close();
    };
  }, [audioStream, isRecording]);

  if (!isRecording) {
    return (
      <div className="h-10 w-full bg-muted/50 rounded-lg flex items-center justify-center overflow-hidden">
        <div className="flex space-x-1 items-center">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="w-0.5 bg-muted-foreground/30 rounded-full animate-wave"
              style={{
                height: `${Math.sin(i * 0.5) * 8 + 12}px`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: '2s'
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={40}
      className="w-full h-10 bg-muted/50 rounded-lg"
    />
  );
}
