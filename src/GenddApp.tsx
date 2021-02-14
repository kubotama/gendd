import React from 'react';
import './GenddApp.css';

class GenddApp extends React.Component <{}, {}> {
  render() {
    return (
      <div className="GenddApp">
        <DateRow />
        <GenddButton />
      </div>
    );
  }
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

class GenddButton extends React.Component <{}, {}> {
  buttonGendd = "生成";

  render() {
    return <div><button>{this.buttonGendd}</button></div>
  }
}
export default GenddApp;
