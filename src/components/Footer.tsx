export const Footer = () => {
  return (
    <footer className="mt-20 py-8 border-t border-border/50">
      <p className="text-center text-muted-foreground">
        Powered by{" "}
        <span className="text-primary font-semibold">n8n Automation</span>
        {" + "}
        <span className="text-secondary font-semibold">Supabase</span>
        {" + "}
        <span className="text-accent font-semibold">Lovable</span>
      </p>
    </footer>
  );
};
