/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GenddApp from "./GenddApp";

describe("要素の存在", () => {
  test("「生成」ボタンが存在", () => {
    // Arrange

    // Act
    const genddApp = render(<GenddApp />);

    // Assert
    expect(genddApp.getByText("生成")).toBeInTheDocument();
  });

  test("「日時データ」ラベルが存在", () => {
    // Arrange

    // Act
    const genddApp = render(<GenddApp />);

    // Assert
    expect(genddApp.getByLabelText("日時データ")).toBeInTheDocument();
  });

  test("「日時データ」テキストボックスが存在", () => {
    // Arrange

    // Act
    const genddApp = render(<GenddApp />);

    // Assert
    expect(genddApp.getByLabelText("日時データ")).toBeInTheDocument();
  });
});

describe("要素の初期値", () => {
  test("「日時データ」テキストボックスの初期値は空白", () => {
    // Arrange

    // Act
    const genddApp = render(<GenddApp />);

    // Assert
    expect(genddApp.getByLabelText("日時データ")).toHaveValue("");
  });
});

describe("ボタンをクリック", () => {
  interface TestValueExpected {
    value: number;
    expectedDate: string;
    expectedDateValue: string;
  }

  let spyGendd: jest.SpyInstance;
  beforeEach(() => {
    spyGendd = jest.spyOn(global.Math, "random");
  });

  afterEach(() => {
    jest.spyOn(global.Math, "random").mockRestore();
  });

  test.each`
    value                 | expectedDate             | expectedDateValue
    ${0}                  | ${"2021/01/01 00:00:00"} | ${"1609426800000"}
    ${0.2895743899655405} | ${"2021/04/16 16:40:17"} | ${"1618558817961"}
    ${0.3801109594519132} | ${"2021/05/19 17:46:19"} | ${"1621413979217"}
    ${0.9949661385540645} | ${"2021/12/30 03:54:12"} | ${"1640804052145"}
    ${1}                  | ${"2022/01/01 00:00:00"} | ${"1640962800000"}
  `(
    "ボタンをクリックして日時データ($expectedDate)を生成する",
    ({ value, expectedDate, expectedDateValue }: TestValueExpected) => {
      // Arrange
      const genddApp = render(<GenddApp />);
      spyGendd.mockReturnValue(value);

      // Act
      userEvent.click(genddApp.getByText("生成"));

      // Assert
      expect(
        (genddApp.getByLabelText("日時データ") as HTMLInputElement).value
      ).toBe(expectedDate);
      expect(
        (genddApp.getByLabelText("日時データの内部表現") as HTMLInputElement)
          .value
      ).toBe(expectedDateValue);
      expect(spyGendd).toHaveBeenCalledTimes(1);
    }
  );

  test("テキストボックスにフォーカスする", () => {
    // Arrange
    const genddApp = render(<GenddApp />);

    // Act
    userEvent.click(genddApp.getByText("生成"));

    // Assert
    expect(screen.getByLabelText("日時データ")).toHaveFocus();
  });
});

describe("内部表現のテキストボックス", () => {
  test("「内部表現」のテキストボックスの初期値は空白", () => {
    // Arrange
    const genddApp = render(<GenddApp />);

    // Act

    // Assert
    expect(genddApp.getByLabelText("日時データの内部表現")).toHaveValue("");
  });
});

describe("日時データの書式のテキストボックス", () => {
  test("「日時データのフォーマット」のテキストボックスの初期値", () => {
    // Arrange
    const genddApp = render(<GenddApp />);

    // Act

    // Assert
    expect(genddApp.getByLabelText("日時データのフォーマット")).toHaveValue(
      "yyyy/MM/dd HH:mm:ss"
    );
  });
});

describe("日時データのフォーマットの変更が、日時データに反映する", () => {
  interface TestValueExpected {
    value: number;
    format: string;
    expectedDate: string;
  }
  let spyGendd: jest.SpyInstance;
  beforeEach(() => {
    spyGendd = jest.spyOn(global.Math, "random");
  });

  afterEach(() => {
    jest.spyOn(global.Math, "random").mockRestore();
  });

  test.each`
    value                 | format            | expectedDate
    ${0}                  | ${"yyyy/MM/dd"}   | ${"2021/01/01"}
    ${0.2895743899655405} | ${"MM/dd"}        | ${"04/16"}
    ${0.3801109594519132} | ${"HH:mm:ss"}     | ${"17:46:19"}
    ${0.2895743899655405} | ${"MMMM do EEEE"} | ${"April 16th Friday"}
  `(
    "日時データのフォーマットの変更が、日時データ($expectedDate)に反映する",
    ({ value, format, expectedDate }: TestValueExpected) => {
      // Arrange
      const genddApp = render(<GenddApp />);
      spyGendd.mockReturnValue(value);

      // Act
      // 日時フォーマットをYYYY/MM/ddに変更する
      const formatText = genddApp.getByLabelText(
        "日時データのフォーマット"
      ) as HTMLInputElement;
      fireEvent.change(formatText, { target: { value: format } });

      userEvent.click(genddApp.getByText("生成"));

      // Assert
      //
      expect(
        (genddApp.getByLabelText("日時データ") as HTMLInputElement).value
      ).toBe(expectedDate);
    }
  );
});
