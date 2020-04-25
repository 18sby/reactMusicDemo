import React from 'react';
import './styles/common/reset.css'; // 初始化全局样式
import './styles/common/flex.css';
import { HomePage } from './pages/home/index';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <HomePage />
      </Router>
    </div>
  );
}

export default App;
