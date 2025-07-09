import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  params: Record<string, string>;
}

// ✅ Make it async if any dynamic segments are used in parent routes
const Layout = async ({ children, params }: LayoutProps) => {
  return (
    <main className="flex overflow-hidden h-screen">
      {children}
    </main>
  );
};

export default Layout;
