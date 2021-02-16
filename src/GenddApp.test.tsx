/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GenddApp, GenddButton } from "./GenddApp";

describe("要素の存在", () => {
  test("「生成」ボタンが存在", () => {
    // Arrange

    // Act
    render(<GenddApp />);

    // Assert
    expect(screen.getByText("生成")).toBeInTheDocument();
  });

  test("「日付データ」ラベルが存在", () => {
    // Arrange

    // Act
    render(<GenddApp />);

    // Assert
    expect(screen.getByLabelText("日付データ")).toBeInTheDocument();
  });

  test("「日付データ」テキストボックスが存在", () => {
    // Arrange

    // Act
    render(<GenddApp />);

    // Assert
    expect(screen.getByPlaceholderText("日付データ")).toBeInTheDocument();
  });
});

describe("要素の初期値", () => {
  test("「日付データ」テキストボックスの初期値は空白", () => {
    // Arrange

    // Act
    render(<GenddApp />);

    // Assert
    expect(screen.getByPlaceholderText("日付データ")).toHaveValue("");
  });
});

describe("ボタンをクリック (spyOnなし)", () => {
  test("「生成」ボタンをクリックするとonClickGendd関数が一回呼び出される(GenddButton)", () => {
    // Arrange
    const mockClick = jest.fn();
    render(<GenddButton onClick={mockClick} />);
    const buttonElement = screen.getByText("生成");

    // Act ボタンをクリック
    userEvent.click(buttonElement);

    // Assert
    expect(mockClick).toBeCalledTimes(1);
  });

  interface TestValueExpected {
    value: number;
    expected: string;
  }

  test.each`
    value            | expected
    ${1613268657038} | ${"2021/02/14 11:10:57"}
    ${1613273412347} | ${"2021/02/14 12:30:12"}
  `(
    "時刻値($value)を文字列($expected)に変換する",
    ({ value, expected }: TestValueExpected) => {
      // Arrange
      const genddApp = new GenddApp({});
      // Act
      const dateString = genddApp.toDateTimeString(value);
      // Assert
      expect(dateString).toBe(expected);
    }
  );

  describe("ボタンをクリック (spyOnあり)", () => {
    test("「生成」ボタンをクリックするとonClickGendd関数が一回呼び出される(GenddApp)", () => {
      // Arrange
      render(<GenddApp />);
      const mockGendd = jest.fn(() => 1613268657038);
      GenddApp.prototype.generateDummyDate = mockGendd;

      // Act
      userEvent.click(screen.getByText("生成"));

      // Assert
      expect(mockGendd).toHaveBeenCalledTimes(1);
    });

    test.each`
      value            | expected
      ${1613268657038} | ${"2021/02/14 11:10:57"}
      ${1613273412347} | ${"2021/02/14 12:30:12"}
      ${1609426800000} | ${"2021/01/01 00:00:00"}
      ${1640962800000} | ${"2022/01/01 00:00:00"}
      ${1640962799999} | ${"2021/12/31 23:59:59"}
    `(
      "ボタンをクリックして日時データ($expected)を生成する",
      ({ value, expected }: TestValueExpected) => {
        // Arrange
        render(<GenddApp />);
        const mockGendd = jest.fn(() => value);
        GenddApp.prototype.generateDummyDate = mockGendd;

        // Act
        userEvent.click(screen.getByText("生成"));

        // Assert
        expect(
          (screen.getByPlaceholderText("日付データ") as HTMLInputElement).value
        ).toBe(expected);
        expect(mockGendd).toHaveBeenCalledWith(1609426800000, 1640962800000);
        expect(mockGendd).toHaveBeenCalledTimes(1);
      }
    );
  });
});
