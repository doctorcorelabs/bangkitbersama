
import { Button } from "@/components/ui/button";
import { Menu, X, Heart, Brain, Users, HelpCircle, Phone, Target, Bot, PlaySquare, Home } from "lucide-react"; // Added Target, Bot, PlaySquare, and Home
import { useState } from "react";

interface HeaderProps {
  toggleChatbot: () => void;
}

const Header = ({ toggleChatbot }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-brand-teal to-brand-orange rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-primary font-heading">BangkitBersama</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="/" className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors duration-200 font-sans">
              <Home className="w-4 h-4" />
              <span>Beranda</span>
            </a>
            <a href="/cek-kondisi-mental" className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors duration-200 font-sans">
              <Brain className="w-4 h-4" />
              <span>Cek Kondisi</span>
            </a>
            <a href="/rencana-aksi-personal" className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors duration-200 font-sans">
              <Target className="w-4 h-4" />
              <span>Rencana Aksi</span>
            </a>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); toggleChatbot(); }}
              className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors duration-200 font-sans"
            >
              <Bot className="w-4 h-4" />
              <span>Chatbot</span>
            </a>
            <a href="/edukasi" className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors duration-200 font-sans">
              <PlaySquare className="w-4 h-4" />
              <span>Edukasi</span>
            </a>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-foreground"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border/20 py-4 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <a href="/" className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors duration-200 font-sans" onClick={() => setIsMenuOpen(false)}>
                <Home className="w-4 h-4" />
                <span>Beranda</span>
              </a>
              <a href="/cek-kondisi-mental" className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors duration-200 font-sans" onClick={() => setIsMenuOpen(false)}>
                <Brain className="w-4 h-4" />
                <span>Cek Kondisi</span>
              </a>
              <a href="/rencana-aksi-personal" className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors duration-200 font-sans" onClick={() => setIsMenuOpen(false)}>
                <Target className="w-4 h-4" />
                <span>Rencana Aksi</span>
              </a>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  toggleChatbot();
                  setIsMenuOpen(false);
                }}
                className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors duration-200 font-sans"
              >
                <Bot className="w-4 h-4" />
                <span>Chatbot</span>
              </a>
              <a href="/edukasi" className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors duration-200 font-sans" onClick={() => setIsMenuOpen(false)}>
                <PlaySquare className="w-4 h-4" />
                <span>Edukasi</span>
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
