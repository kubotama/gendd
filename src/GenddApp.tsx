import React from 'react';
import './GenddApp.css';

interface GenddAppProps {
}
export class GenddApp extends React.Component <GenddAppProps, {}> {
  constructor(props: GenddAppProps) {
    super(props);
    this.onClickGendd = this.onClickGendd.bind(this);
  }

  onClickGendd() {
    console.log("clicked!")
  }

  toLocaleString(value: number) {
    return new Date(value).toLocaleString();
  }

  render() {
    return (
      <div className="GenddApp">
        <DateRow />
        <GenddButton onClick={this.onClickGendd}/>
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

interface GenddButtonProps {
  onClick(): void,
}
export class GenddButton extends React.Component <GenddButtonProps, {}> {
  buttonGendd = "生成";

  render() {
    return <div><button onClick={this.props.onClick}>{this.buttonGendd}</button></div>
  }
}
export default GenddApp;
