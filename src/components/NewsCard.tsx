import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar } from "lucide-react";
import { format } from "date-fns";

interface NewsCardProps {
  title: string;
  summary: string;
  publishedAt: string;
  source: string;
  link: string;
  imageUrl?: string;
}

export const NewsCard = ({
  title,
  summary,
  publishedAt,
  source,
  link,
  imageUrl,
}: NewsCardProps) => {
  const formattedDate = format(new Date(publishedAt), "MMM dd, yyyy");
  const truncatedSummary = summary.length > 200 ? summary.substring(0, 200) + "..." : summary;

  return (
    <Card className="glass-card hover-glow animate-fade-in group">
      {imageUrl && imageUrl !== "https://example.com/default-image.jpg" && (
        <div className="overflow-hidden rounded-t-lg">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <CardHeader>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Calendar className="w-4 h-4" />
          <span>{formattedDate}</span>
          <span className="text-primary">•</span>
          <span style={{ color: "hsl(217 91% 60%)" }}>{source}</span>
        </div>
        <CardTitle className="text-xl leading-tight line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base text-foreground/70">
          {truncatedSummary}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Button
          asChild
          variant="default"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group-hover:shadow-lg group-hover:shadow-primary/30"
        >
          <a href={link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
            Read Full Article
            <ExternalLink className="w-4 h-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};
