import React, { useState } from "react";
import "./GenddApp.css";

interface GenddAppProps {}

interface GenddAppState {
  dateString: string;
}
// export class GenddApp extends React.Component<GenddAppProps, GenddAppState> {
export default function GenddApp(props: GenddAppProps, states: GenddAppState) {
  // dateString : string;
  const dateMax = 1640962800000;
  const dateMin = 1609426800000;
  const textGendd: React.RefObject<HTMLInputElement> = React.createRef();
  const [dateString, setDateString] = useState("");

  /**
   * 変数を初期化する。
   *   - 「生成」ボタンがクリックされると呼び出される関数
   *   - 生成する日時データの最小値と最大値
   *   - 日時データ
   * @param props
   */
  // constructor(props: GenddAppProps) {
  //   super(props);
  //   this.onClickGendd = this.onClickGendd.bind(this);
  //   this.dateMax = 1640962800000;
  //   this.dateMin = 1609426800000;
  //   this.state = { dateString: "" };
  //   this.textGendd = React.createRef();
  // }

  /**
   * 「生成」ボタンがクリックされると呼び出されます。
   *   1. dateMixからdateMaxの範囲内でランダムな時刻値を生成します。
   *   2. 生成した時刻値を文字列に変換します。
   *   3. 変換した文字列をdateString(テキストボックスに表示される)に設定します。
   */
  function onClickGendd() {
    const dateString = toDateTimeString(generateDummyDate(dateMin, dateMax));
    // this.setState({ dateString: dateString });
    setDateString(dateString);
    textGendd.current?.focus();
  }

  /**
   * 指定した範囲内でランダムに生成した日付データを返します。
   * @param {number} dateMin - 生成する日付の最小値(この値は生成する範囲に含まれる)、Dateの時刻値形式
   * @param {number} dateMax - 生成する日付の最大値(この値は生成する範囲に含まれない)、Dateの時刻値形式
   * @return (number) - 生成された日付データ、Dateの時刻値形式
   */
  function generateDummyDate(dateMin: number, dateMax: number) {
    return Math.floor(Math.random() * (dateMax - dateMin) + dateMin);
  }

  /**
   * 与えられた数値を文字列に変換して返します。指定された長さよりも短い場合には0で埋めます。
   * @param {number} value - 文字列に変換する数値
   * @param {number} length - 変換結果の文字列の長さ
   * @return {string} - 変換結果の文字列
   */
  function toZeroPaddingString(value: number, length: number): string {
    const str = "0000" + value.toString();
    return str.slice(length * -1);
  }

  /**
   * 与えられた時刻値を文字列に変換します。
   * @param {number} value - 文字列に変換する時刻値
   * @return {string} - 時刻値から変換された文字列
   */
  function toDateTimeString(value: number): string {
    const date = new Date(value);
    const YYYY = date.getFullYear();
    const MM = toZeroPaddingString(date.getMonth() + 1, 2);
    const DD = toZeroPaddingString(date.getDate(), 2);
    const hh = toZeroPaddingString(date.getHours(), 2);
    const mm = toZeroPaddingString(date.getMinutes(), 2);
    const ss = toZeroPaddingString(date.getSeconds(), 2);
    const dateString = `${YYYY}/${MM}/${DD} ${hh}:${mm}:${ss}`;
    return dateString;
  }

  return (
    <div className="GenddApp">
      <div>
        <label htmlFor="date-input">日付データ</label>
        <input
          type="text"
          id="date-input"
          placeholder="日付データ"
          value={dateString}
          ref={textGendd}
          readOnly
        />
      </div>
      <div>
        <button onClick={onClickGendd}>生成</button>
      </div>
    </div>
  );
}
