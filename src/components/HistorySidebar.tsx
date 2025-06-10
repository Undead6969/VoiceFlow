
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { FileText, Trash2, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Transcription {
  id: string;
  title: string;
  created_at: string;
  transcript: any;
  notes: string;
  summary: any;
}

interface HistorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTranscription: (transcription: Transcription) => void;
}

export const HistorySidebar: React.FC<HistorySidebarProps> = ({
  isOpen,
  onClose,
  onSelectTranscription
}) => {
  const [transcriptions, setTranscriptions] = useState<Transcription[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user && isOpen) {
      fetchTranscriptions();
    }
  }, [user, isOpen]);

  const fetchTranscriptions = async () => {
    try {
      const { data, error } = await supabase
        .from('transcriptions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const formattedData = (data || []).map(item => ({
        id: item.id,
        title: item.title,
        created_at: item.created_at,
        transcript: Array.isArray(item.transcript) ? item.transcript : [],
        notes: item.notes || '',
        summary: typeof item.summary === 'object' ? item.summary : null
      }));
      
      setTranscriptions(formattedData);
    } catch (error) {
      console.error('Error fetching transcriptions:', error);
      toast({
        title: "Error",
        description: "Failed to load transcription history",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteTranscription = async (id: string) => {
    try {
      const { error } = await supabase
        .from('transcriptions')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setTranscriptions(prev => prev.filter(t => t.id !== id));
      toast({
        title: "Deleted",
        description: "Transcription deleted successfully",
      });
    } catch (error) {
      console.error('Error deleting transcription:', error);
      toast({
        title: "Error",
        description: "Failed to delete transcription",
        variant: "destructive"
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed left-0 top-0 h-full w-80 bg-background border-r shadow-lg z-40 transition-transform duration-300">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Transcription History</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>×</Button>
        </div>
      </div>
      
      <ScrollArea className="h-[calc(100vh-80px)]">
        <div className="p-4 space-y-3">
          {loading ? (
            <div className="text-center text-muted-foreground py-8">
              Loading...
            </div>
          ) : transcriptions.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No transcriptions yet</p>
            </div>
          ) : (
            transcriptions.map((transcription) => (
              <div
                key={transcription.id}
                className="p-3 rounded-lg border hover:bg-muted/50 cursor-pointer group"
                onClick={() => onSelectTranscription(transcription)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{transcription.title}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Calendar className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {formatDate(transcription.created_at)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant="outline" className="text-xs">
                        {Array.isArray(transcription.transcript) ? transcription.transcript.length : 0} segments
                      </Badge>
                      {transcription.summary && (
                        <Badge variant="secondary" className="text-xs">
                          Summary
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteTranscription(transcription.id);
                    }}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
