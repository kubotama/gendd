import React from 'react';
import { render, screen } from '@testing-library/react';
import GenddApp from './GenddApp';

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
