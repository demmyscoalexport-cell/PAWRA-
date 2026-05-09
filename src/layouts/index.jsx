import React from 'react';

export const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-ivory">
      {children}
    </div>
  );
};

export const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};
