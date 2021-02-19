import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import "./GenddApp.css";

export default function GenddApp() {
  const dateMax = 1640962800000; // 生成する日付データの最大値 2022/01/01 00:00:00
  const dateMin = 1609426800000; // 生成する日付データの最小値 2021/01/01 00:00:00
  const textGendd: React.RefObject<HTMLInputElement> = React.createRef();
  const [dateString, setDateString] = useState("");

  /**
   * 「生成」ボタンがクリックされると呼び出されます。
   *   1. dateMixからdateMaxの範囲内でランダムな時刻値を生成します。
   *   2. 生成した時刻値を文字列に変換します。
   *   3. 変換した文字列をdateString(テキストボックスに表示される)に設定します。
   */
  function onClickGendd() {
    const dateString = toDateTimeString(generateDummyDate(dateMin, dateMax));
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
          value={dateString}
          ref={textGendd}
          readOnly
        />
      </div>
      <div>
        <Button variant="contained" color="primary" onClick={onClickGendd}>
          生成
        </Button>
      </div>
    </div>
  );
}
