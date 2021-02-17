/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GenddApp } from "./GenddApp";

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

describe("ボタンをクリック", () => {
  interface TestValueExpected {
    value: number;
    expected: string;
  }

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

  test("テキストボックスにフォーカスする", () => {
    // Arrange
    render(<GenddApp />);

    // Act
    userEvent.click(screen.getByText("生成"));

    // Assert
    expect(screen.getByPlaceholderText("日付データ")).toHaveFocus();
  });
});
