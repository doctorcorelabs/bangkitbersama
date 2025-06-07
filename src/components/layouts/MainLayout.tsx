import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface MainLayoutProps {
  toggleChatbot: () => void;
  children?: React.ReactNode; // To allow Outlet to be passed as children if preferred, or just use Outlet directly
}

const MainLayout: React.FC<MainLayoutProps> = ({ toggleChatbot, children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100">
      <Header toggleChatbot={toggleChatbot} />
      <main className="flex-grow">
        {children || <Outlet />} 
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
