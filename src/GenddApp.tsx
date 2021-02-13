import React from 'react';
import './GenddApp.css';

function GenddApp() {
  return (
    <div className="GenddApp">
      <DateRow />
      <button>生成</button>
    </div>
  );
}

class DateRow extends React.Component {
  render() {
    return<div>
    <label htmlFor="date-input">日付データ</label>
    <input type="text" id="date-input" placeholder="日付データ" />
  </div>
  }
}

export default GenddApp;
