import React from 'react';
import './GenddApp.css';

function GenddApp() {
  return (
    <div className="GenddApp">
      <div>
        <label htmlFor="date-input">日付データ</label>
        <input type="text" id="date-input" placeholder="日付データ" />
      </div>
      <button>生成</button>
    </div>
  );
}

export default GenddApp;
