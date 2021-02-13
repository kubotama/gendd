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

class DateRow extends React.Component <{}, {}> {
  labelDate = "日付データ";
  placeholderDate = "日付データ";

  render() {
    return<div>
    <label htmlFor="date-input">{this.labelDate}</label>
    <input type="text" id="date-input" placeholder={this.placeholderDate} />
  </div>
  }
}

export default GenddApp;
