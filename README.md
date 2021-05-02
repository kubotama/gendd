# Name

gendd: Generate Dummy Date

## Overview

テストなどで利用する日付データを生成します。

## Requirement

- node.js
- TypeScript
- React
- Jest

[![Netlify Status](https://api.netlify.com/api/v1/badges/55fb156b-613b-494a-ba92-acd251d017e4/deploy-status)](https://gendd.netlify.app/)

## Usage

1. [gendd の web サイト](https://gendd.netlify.app/)を開きます。
1. 「日付データのフォーマット」のテキストボックスで、日付データの出力形式を指定します。フォーマットは[date-fns のフォーマット](https://date-fns.org/v2.21.1/docs/format)で指定します。
1. 「生成」ボタンをクリックします。
1. 「日付データ」と「日付データの内部表現」のテキストボックスに、生成された日付データとその内部表現が表示されて、「日付データ」テキストボックスにフォーカスが設定されます。
1. ctrl+A で選択して ctrl+C で、生成された日付データをコピーします。
1. tab でテキストボックスのフォーカスを移動します。

## Features

- テストなどに利用するための日時データを生成します。日時データのフォーマットは

> yyyy/MM/DD hh:mm:ss

生成される日時は 2021 年の 1 年間(2021/01/01 00:00:00 から 2021/12/31 23:59:59 まで)とします。

## Reference

<https://gendd.netlify.app/>

## Licence

MIT
