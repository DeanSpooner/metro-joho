# 東京メトロ情報 <i>(Tōkyō Metoro Jōhō)</i><br/>[Tokyo Metro Information](https://metro-joho.vercel.app/)<br/>by [Dean Spooner](https://github.com/DeanSpooner) 🛤️

This is a web app to provide information on the Tokyo Metro transport service, including line information, station information and timetables - [now deployed live here](https://metro-joho.vercel.app/)!

## Stack

- HTML;
- TypeScript;
- React;
- Next.js;
- Tailwind;
- Vercel;
- i18n.

## Running the Jōhō app locally

1. Clone this repo;
2. `cd` into the repo's root;
3. Create a `.env.local` file, with `ODPT_ACCESS_TOKEN=yourAccessToken` - this will require you to register with the [Public Transportation Open Data Center 公共交通オープンデータセンター](https://www.odpt.org/) and request an access token;
4. `npm install`;
5. `npm run dev`;
6. Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## Project aims and features

- [X] Provide information all Tokyo Metro lines;
- [X] Provide information on all Tokyo Metro stations;
- [X] Provide live status information for lines and stations, using information from the [Public Transportation Open Data Center 公共交通オープンデータセンター](https://www.odpt.org/);
- [X] Use i18n localisations to offer multilingual support - currently supported in English, Japanese, Chinese (Simplified) and Korean.

# By [Dean Spooner](https://github.com/DeanSpooner) 🛤️

<img src="./public/DS-loop.gif" />
