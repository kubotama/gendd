import React from "react";
import "./GenddApp.css";

interface GenddAppProps {}

interface GenddAppState {
  dateString: string;
}
export class GenddApp extends React.Component<GenddAppProps, GenddAppState> {
  // dateString : string;
  dateMax: number;
  dateMin: number;

  constructor(props: GenddAppProps) {
    super(props);
    this.onClickGendd = this.onClickGendd.bind(this);
    this.dateMax = 1640962800000;
    this.dateMin = 1609426800000;
    this.state = { dateString: "" };
  }

  generateDummyDate(dateMin: number, dateMax: number) {
    return Math.floor(Math.random() * (dateMax - dateMin) + dateMin);
  }

  onClickGendd() {
    const dateString = this.toDateTimeString(
      this.generateDummyDate(this.dateMin, this.dateMax)
    );
    this.setState({ dateString: dateString });
  }

  /**
   * 与えられた数値を文字列に変換して返します。指定された長さよりも短い場合には0で埋めます。
   * @param {number} value - 文字列に変換する数値
   * @param {number} length - 変換結果の文字列の長さ
   * @return {string} - 変換結果の文字列
   */
  toZeroPaddingString(value: number, length: number) {
    const str = "0000" + value.toString();
    return str.slice(length * -1);
  }

  toDateTimeString(value: number) {
    const date = new Date(value);
    const YYYY = date.getFullYear();
    const MM = this.toZeroPaddingString(date.getMonth() + 1, 2);
    const DD = this.toZeroPaddingString(date.getDate(), 2);
    const hh = this.toZeroPaddingString(date.getHours(), 2);
    const mm = this.toZeroPaddingString(date.getMinutes(), 2);
    const ss = this.toZeroPaddingString(date.getSeconds(), 2);
    const dateString = `${YYYY}/${MM}/${DD} ${hh}:${mm}:${ss}`;
    return dateString;
  }

  render() {
    return (
      <div className="GenddApp">
        <DateRow dateString={this.state.dateString} />
        <GenddButton onClick={this.onClickGendd} />
      </div>
    );
  }
}

interface DateRowProps {
  dateString: string;
}

class DateRow extends React.Component<DateRowProps, {}> {
  labelDate = "日付データ";
  placeholderDate = "日付データ";

  render() {
    return (
      <div>
        <label htmlFor="date-input">{this.labelDate}</label>
        <input
          type="text"
          id="date-input"
          placeholder={this.placeholderDate}
          value={this.props.dateString}
          readOnly
        />
      </div>
    );
  }
}

interface GenddButtonProps {
  onClick(): void;
}
export class GenddButton extends React.Component<GenddButtonProps, {}> {
  buttonGendd = "生成";

  render() {
    return (
      <div>
        <button onClick={this.props.onClick}>{this.buttonGendd}</button>
      </div>
    );
  }
}
export default GenddApp;
