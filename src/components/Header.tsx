import logo from "@/assets/logo.png";

export const Header = () => {
  return (
    <header className="text-center py-16 px-4">
      <div className="flex justify-center mb-6">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-muted/30 border-2 border-primary/30 flex items-center justify-center" style={{ boxShadow: "0 0 30px rgba(255, 255, 255, 0.3), 0 0 60px rgba(255, 255, 255, 0.1)" }}>
          <img src={logo} alt="AI Pulse Logo" className="w-full h-full object-cover" />
        </div>
      </div>
      <h1 className="text-6xl md:text-7xl font-bold mb-4 text-foreground animate-fade-in" style={{ textShadow: "0 0 40px rgba(255, 255, 255, 0.3)" }}>
        AI Pulse
      </h1>
      <p className="text-xl md:text-2xl text-muted-foreground animate-fade-in" style={{ animationDelay: "0.1s" }}>
        Daily updates from the world of Artificial Intelligence
      </p>
    </header>
  );
};
