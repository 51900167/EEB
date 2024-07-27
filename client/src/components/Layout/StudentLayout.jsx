import React from 'react';
import Header from './Header.jsx';
// import Footer from './Footer.jsx';
import Sidebar from '../Sidebar/HeadSidebar.jsx';

const StudentLayout = ({ children }) => {
  console.log("children: "+children);
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4">
          {children}
        </main>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default StudentLayout;