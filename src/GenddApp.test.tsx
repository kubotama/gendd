/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// import { GenddApp } from "./GenddApp";
import GenddApp from "./GenddApp";

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

  let spyGendd: jest.SpyInstance;
  beforeEach(() => {
    spyGendd = jest.spyOn(global.Math, "random");
  });

  afterEach(() => {
    jest.spyOn(global.Math, "random").mockRestore();
  });

  test.each`
    value                 | expected
    ${0}                  | ${"2021/01/01 00:00:00"}
    ${0.2895743899655405} | ${"2021/04/16 16:40:17"}
    ${0.3801109594519132} | ${"2021/05/19 17:46:19"}
    ${0.9949661385540645} | ${"2021/12/30 03:54:12"}
    ${1}                  | ${"2022/01/01 00:00:00"}
  `(
    "ボタンをクリックして日時データ($expected)を生成する",
    ({ value, expected }: TestValueExpected) => {
      // Arrange
      render(<GenddApp />);
      spyGendd.mockReturnValue(value);

      // Act
      userEvent.click(screen.getByText("生成"));

      // Assert
      expect(
        (screen.getByPlaceholderText("日付データ") as HTMLInputElement).value
      ).toBe(expected);
      expect(spyGendd).toHaveBeenCalledTimes(1);
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
