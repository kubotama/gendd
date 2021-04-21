import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import "./GenddApp.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    // root: {},
    text: {
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "20px",
      width: "200px",
    },
    generateButton: {
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "20px",
      width: "200px",
    },
    privacyButton: {
      display: "block",
      marginLeft: "auto",
      marginRight: "10px",
    },
  })
);

export default function GenddApp() {
  const dateMax = 1640962800000; // 生成する日付データの最大値 2022/01/01 00:00:00
  const dateMin = 1609426800000; // 生成する日付データの最小値 2021/01/01 00:00:00
  const textGendd: React.RefObject<HTMLInputElement> = React.createRef();
  const textGenddValue: React.RefObject<HTMLInputElement> = React.createRef();
  const [dateValueString, setDateValueString] = useState("");
  const [dateString, setDateString] = useState("");
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  /**
   * 「生成」ボタンがクリックされると呼び出されます。
   *   1. dateMixからdateMaxの範囲内でランダムな時刻値を生成します。
   *   2. 生成した時刻値を文字列に変換します。
   *   3. 変換した文字列をdateString(テキストボックスに表示される)に設定します。
   */
  function onClickGendd() {
    const dateValueString = generateDummyDate(dateMin, dateMax);
    const dateString = toDateTimeString(dateValueString);
    setDateString(dateString);
    setDateValueString(dateValueString.toString());
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

  function openPrivacy() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const privacyBody = (
    <div>
      当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を使用しています。このGoogleアナリティクスはデータの収集のためにCookieを使用しています。このデータは匿名で収集されており、個人を特定するものではありません。
      この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。
      この規約に関しての詳細は
      <a
        href="https://marketingplatform.google.com/about/analytics/terms/jp/"
        target="”_blank”"
      >
        Googleアナリティクスサービス利用規約のページ{" "}
      </a>
      や
      <a
        href="https://policies.google.com/technologies/ads?hl=ja"
        target="”_blank”"
      >
        Googleポリシーと規約ページ
      </a>
      をご覧ください。{" "}
    </div>
  );

  return (
    <div>
      <TextField
        id="gendd-text"
        className={classes.text}
        label="日付データ"
        value={dateString}
        inputRef={textGendd}
        variant="outlined"
      />
      <TextField
        id="gendd-value-text"
        className={classes.text}
        label="日付データの内部表現"
        value={dateValueString}
        inputRef={textGenddValue}
        variant="outlined"
      />
      <Button
        className={classes.generateButton}
        variant="contained"
        color="primary"
        onClick={onClickGendd}
      >
        生成
      </Button>
      <hr />
      <Button
        className={classes.privacyButton}
        onClick={openPrivacy}
        variant="contained"
      >
        プライバシー・ポリシーの表示
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{"プライバシー・ポリシー"}</DialogTitle>
        <DialogContent>
          <DialogContentText>{privacyBody}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            閉じる
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
