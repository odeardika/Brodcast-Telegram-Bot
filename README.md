# Brodcast-Telegram-Bot

## Description

![Telegram](https://img.shields.io/badge/Telegram-blue?style=flat&logo=telegram)
![Node.js](https://img.shields.io/badge/-Node.js-informational?style=flat&logo=node.js&logoColor=white&color=339933)
![JavaScript](https://img.shields.io/badge/-JavaScript-informational?style=flat&logo=javascript&logoColor=white&color=yellow)
![Nodemon](https://img.shields.io/badge/-Nodemon-informational?style=flat&logo=nodemon&logoColor=white&color=ff6347)
![VSCode](https://img.shields.io/badge/-VSCode-informational?style=flat&logo=visual-studio-code&logoColor=white&color=007ACC)
![SQLite](https://img.shields.io/badge/-SQLite-informational?style=flat&logo=sqlite&logoColor=white&color=003B57)

This project is a Telegram bot that can send massage to group, it can set time for sending massage, and it can store massage in database. This bot is built with Node.js (JavaScript) and SQLite is used for database.

## Getting Started
To run this project, you need to install the dependencies using npm or yarn. Then, you can run the project using npm start or yarn start.

## Prerequisites
- Create a bot using Telegram in https://t.me/BotFather 
- Use /newbot command to make a new bot

## Installation
1. Clone the repository by running `git clone https://github.com/OdeArdika/Broadcast-Telegram-Bot.git`
2. Go to the project folder by running `cd Broadcast-Telegram-Bot`
3. Install the dependencies by running `npm install` or `yarn`
4. Copy the token from the bot you created and paste it in the .env file with the name TOKEN
5. Run the project by running `npm start` or `yarn start`
6. Start using the bot!

## Usage
To use the bot, you need to set the Telegram token in the .env file. Then, you can run the bot and it will be online. Then, you can send a message to the bot and it will send a message to the group that you set.

## Roadmap
A list of features that will be added in the future :

- [ ] Bot can detect text message that has custom emoji and GIF
- [ ] Bot can detect text message that has specific keyword
- [ ] Bot can detect text message that has specific hash tag

## How to Contribute
1. Clone the repository by running `git clone https://github.com/OdeArdika/Broadcast-Telegram-Bot.git`
2. Create new branch by running `git branch <your_branch_name>`
3. Make your changes and commit them by running `git commit -m '<your_commit_message>'`
4. Push your changes to the remote repository by running `git push origin <your_branch_name>`
5. Create a pull request by going to the [github page](https://github.com/OdeArdika/Broadcast-Telegram-Bot/pulls) and click on the "New pull request" button.

## Acknowledgements
- [OdeArdika](https://github.com/OdeArdika) - Project owner and main contributor
- [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api) - Used for the core Telegram bot API functionality
- [node-cron](https://github.com/node-cron/node-cron) - Used for scheduling tasks
- [sqlite3](https://github.com/sqlite/sqlite) - Used for storing data
- [dotenv](https://github.com/motdotla/dotenv) - Used for environment variables2
