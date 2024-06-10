# Solana Trading Bot

![ccxt](https://img.shields.io/badge/ccxt-v4.3.38-blue.svg)
![dotenv](https://img.shields.io/badge/dotenv-v16.4.5-green.svg)

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Acknowledgements](#acknowledgements)
- [Contact](#contact)

## Project Overview

**Solana Trading Bot** is an automated trading bot built on the Solana blockchain. The bot is designed to execute trades based on predefined strategies, leveraging the speed and low transaction costs of the Solana network. The project aims to provide an efficient and reliable solution for automated trading in the decentralized finance (DeFi) space.

## Features

- **Automated Trading**: Execute trades automatically based on predefined strategies.
- **High Performance**: Built on Solana for fast and low-cost transactions.
- **Extensible**: Easily extendable to incorporate new trading strategies.
- **Real-time Data**: Fetch real-time market data for informed trading decisions.
- **Secure**: Utilizes secure practices for handling private keys and transactions.

## Technologies Used

- **Blockchain**: Solana
- **Programming Language**: JavaScript
- **Framework**: Node.js
- **Other Libraries**: ccxt, api coingecko, api binance exchange

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:

   ```sh
   git clone https://github.com/SandroSD/Solana-Trading-Bot.git
   ```

2. **Navigate to the project directory**:

   ```sh
   cd Solana-Trading-Bot
   ```

3. **Install dependencies**:
   ```sh
   pnpm install
   ```

## Usage

1. **Configure environment variables**:
   Create a `.env` file in the root directory and add the following variables:

   ```env
    COINGECKO_API_KEY=
    BINANCE_API_KEY=
    BINANCE_API_SECRET=
   ```

2. **Run the bot**:

   ```sh
    pnpm start
   ```

3. The bot will start executing trades based on the predefined strategy.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add new feature'`).
5. Push to the branch (`git push origin feature/your-feature-name`).
6. Open a pull request.

## Acknowledgements

- Thanks to the Solana team for their robust and scalable blockchain infrastructure.
- Shoutout to the open-source community for their continuous support and contributions.
- Special thanks to any libraries or resources used in this project.

## Contact

If you have any questions, suggestions, or feedback, feel free to contact me:

- **Email**: sdezerio@gmail.com
- **GitHub**: [SandroSD](https://github.com/SandroSD)
