import React from 'react';
import './GenddApp.css';

interface GenddAppProps {
}

interface GenddAppState {
  dateString: string,
}
export class GenddApp extends React.Component <GenddAppProps, GenddAppState> {
  // dateString : string;
  dateMax : number;
  dateMin: number;

  constructor(props: GenddAppProps) {
    super(props);
    this.onClickGendd = this.onClickGendd.bind(this);
    this.dateMax = 1640962800000;
    this.dateMin = 1609426800000;
    this.state = { dateString: "" };
  }

  generateDummyDate() {
    return Math.floor(Math.random() * (this.dateMax - this.dateMin) + this.dateMin)
  }

  onClickGendd() {
    const dateString = this.toLocaleString(this.generateDummyDate());
    this.setState({ dateString: dateString });
  }

  toLocaleString(value: number) {
    return new Date(value).toLocaleString();
  }

  render() {
    return (
      <div className="GenddApp">
        <DateRow dateString={this.state.dateString}/>
        <GenddButton onClick={this.onClickGendd}/>
      </div>
    );
  }
}

interface DateRowProps {
  dateString: string,
}

class DateRow extends React.Component <DateRowProps, {}> {
  labelDate = "日付データ";
  placeholderDate = "日付データ";

  render() {
    return<div>
    <label htmlFor="date-input">{this.labelDate}</label>
    <input type="text" id="date-input" placeholder={this.placeholderDate} value={this.props.dateString} readOnly />
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
