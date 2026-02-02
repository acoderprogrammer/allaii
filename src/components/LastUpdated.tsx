import { format } from "date-fns";
import { Clock } from "lucide-react";

interface LastUpdatedProps {
  timestamp: string;
}

export const LastUpdated = ({ timestamp }: LastUpdatedProps) => {
  const formattedDate = format(new Date(timestamp), "MMMM dd, yyyy 'at' h:mm a");

  return (
    <div className="flex items-center justify-center gap-2 mb-12 text-muted-foreground animate-fade-in" style={{ animationDelay: "0.15s" }}>
      <Clock className="w-4 h-4" />
      <span>Last updated: {formattedDate}</span>
    </div>
  );
};
