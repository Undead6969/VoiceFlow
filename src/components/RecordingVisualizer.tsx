
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
    
    analyser.fftSize = 256;
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

      ctx.fillStyle = 'transparent';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = (dataArray[i] / 255) * canvas.height;

        const gradient = ctx.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height);
        gradient.addColorStop(0, 'hsl(262.1, 83.3%, 57.8%)');
        gradient.addColorStop(1, 'hsl(262.1, 83.3%, 47.8%)');

        ctx.fillStyle = gradient;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

        x += barWidth + 1;
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
      <div className="h-16 w-full bg-muted rounded-lg flex items-center justify-center">
        <div className="flex space-x-1">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="w-1 bg-muted-foreground/30 rounded-full"
              style={{
                height: `${Math.random() * 20 + 10}px`,
                animationDelay: `${i * 0.1}s`,
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
      width={800}
      height={64}
      className="w-full h-16 bg-muted rounded-lg"
    />
  );
}
