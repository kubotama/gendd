import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {GenddApp, GenddButton} from './GenddApp';

describe("要素の存在", () => {
  test('「生成」ボタンが存在', () => {
    render(<GenddApp />);
    const buttonElement = screen.getByText("生成");
    expect(buttonElement).toBeInTheDocument();
  })

  test("「日付データ」ラベルが存在", () => {
    render(<GenddApp />);
    const rowElement = screen.getByLabelText("日付データ");
    expect(rowElement).toBeInTheDocument();
  })

  test("「日付データ」テキストボックスが存在", () => {
    render(<GenddApp />);
    const textElement = screen.getByPlaceholderText("日付データ");
    expect(textElement).toBeInTheDocument();
  })
})

describe("要素の初期値", () => {
  test('「日付データ」テキストボックスの初期値は空白', () => {
    render(<GenddApp />);
    const textElement = screen.getByPlaceholderText("日付データ");
    expect(textElement).toHaveValue("");
  })
})

describe("ボタンをクリック", () => {
  test('「生成」ボタンをクリックするとonClickGendd関数が一回呼び出される', () => {
    // Arrange
    const mockClick = jest.fn();
    render(<GenddButton onClick={mockClick} />);
    const buttonElement = screen.getByText("生成");

    // Act ボタンをクリック
    userEvent.click(buttonElement);

    // Assert
    expect(mockClick).toBeCalledTimes(1);
  })

  interface TestValueExpected {
    value: number,
    expected: string
  }

  test.each `
  value | expected
  ${1613268657038} | ${"2021/2/14 11:10:57"}
  ${1613273412347} | ${"2021/2/14 12:30:12"}
  ` ('時刻値($value)を文字列($expected)に変換する', ({value, expected}: TestValueExpected) => {
    // Arrange
    const genddApp = new GenddApp({});
    // Act
    const dateString = genddApp.toLocaleString(value);
    // Assert
    expect(dateString).toBe(expected);
  })
})
