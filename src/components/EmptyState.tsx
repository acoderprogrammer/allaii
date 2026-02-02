import { Newspaper } from "lucide-react";

export const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
      <Newspaper className="w-16 h-16 text-muted-foreground mb-4" />
      <h3 className="text-2xl font-semibold mb-2">No news available right now</h3>
      <p className="text-muted-foreground">Check back soon for the latest AI updates!</p>
    </div>
  );
};
