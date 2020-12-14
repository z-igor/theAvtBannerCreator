import React from "react";

import Creator from "./components/Creator/Creator";
import Banners from "./components/Banners/Banners";
import Preview from "./components/Preview/Preview";

import 'antd/dist/antd.css';

export default function App() {
  return (
    <div className="app">
      <Preview />
      <main className="app__div app__main main">
        <Creator />
        <Banners />
      </main>
    </div>
  );
}
