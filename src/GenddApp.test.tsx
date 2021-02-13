import React from 'react';
import { render, screen } from '@testing-library/react';
import GenddApp from './GenddApp';

describe("要素の存在", () => {
  test('「生成」ボタンが存在', () => {
    render(<GenddApp />);
    const buttonElement = screen.getByText("生成");
    expect(buttonElement).toBeInTheDocument();
  })

})
