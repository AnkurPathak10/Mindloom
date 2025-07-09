import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex overflow-hidden h-screen">
      {children}
    </main>
  );
};

export default Layout;
