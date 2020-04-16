import React from 'react';
import './styles/common/reset.css'; // 初始化全局样式
import './styles/common/flex.css';
import { HomePage } from './pages/home/index';

function App() {
  return (
    <div className="App">
      <HomePage />
    </div>
  );
}

export default App;
