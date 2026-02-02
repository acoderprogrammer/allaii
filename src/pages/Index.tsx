import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { NewsCard } from "@/components/NewsCard";
import { EmptyState } from "@/components/EmptyState";
import { LoadingState } from "@/components/LoadingState";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface NewsArticle {
  id: number;
  Title: string;
  Summary: string;
  Published_at: string;
  Source: string;
  Link: string;
  Image_url: string;
}

const Index = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<NewsArticle[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { toast } = useToast();
  const itemsPerPage = 20;

  useEffect(() => {
    fetchArticles(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredArticles(articles);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = articles.filter(
        (article) =>
          article.Title?.toLowerCase().includes(query) ||
          article.Summary?.toLowerCase().includes(query) ||
          article.Source?.toLowerCase().includes(query)
      );
      setFilteredArticles(filtered);
    }
  }, [searchQuery, articles]);

  const fetchArticles = async (page: number) => {
    try {
      setLoading(true);
      
      // Get total count
      const { count } = await supabase
        .from("ai_news")
        .select("*", { count: "exact", head: true });

      const totalCount = count || 0;
      setTotalPages(Math.ceil(totalCount / itemsPerPage));

      // Fetch paginated data
      const from = (page - 1) * itemsPerPage;
      const to = from + itemsPerPage - 1;

      const { data, error } = await supabase
        .from("ai_news")
        .select("*")
        .order("id", { ascending: false })
        .range(from, to);

      if (error) throw error;

      setArticles(data || []);
      setFilteredArticles(data || []);
    } catch (error) {
      console.error("Error fetching articles:", error);
      toast({
        title: "Error",
        description: "Failed to load articles. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const latestArticle = articles.length > 0 ? articles[0] : null;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Header />

        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        {loading ? (
          <LoadingState />
        ) : filteredArticles.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredArticles.map((article, index) => (
                <div
                  key={article.id}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <NewsCard
                    title={article.Title || "Untitled"}
                    summary={article.Summary || "No summary available"}
                    publishedAt={article.Published_at}
                    source={article.Source || "Unknown"}
                    link={article.Link || "#"}
                    imageUrl={article.Image_url}
                  />
                </div>
              ))}
            </div>
            
            {!searchQuery && totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mb-12">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
