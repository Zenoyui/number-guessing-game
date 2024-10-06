# Number Guessing Game

**Number Guessing Game** is an engaging console-based JavaScript game where you have to guess a randomly generated number. The game supports multiple languages and offers various game modes.

## Getting Started

### Requirements

- [Node.js](https://nodejs.org/) installed on your computer.

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/number-guessing-game.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd number-guessing-game
    ```

3. **Install the necessary dependencies:**

    ```bash
    npm install prompt-sync
    ```

## Usage

Before running the game, ensure that you have installed the dependencies using the command `npm install prompt-sync`. After that, you can launch the game using various commands.

### Launch Commands

- **`node index.js`**

    Starts the game with a randomly selected number between 1 and 100.

- **`node index.js -n [max number]`**

    Starts the game with a randomly selected number between 1 and the specified `[max number]`.

    **Example:**

    ```bash
    node index.js -n 200
    ```

- **`node index.js num [number] [max number]`**

    A mode where the computer tries to guess the specified `[number]` within the range of 1 to `[max number]`.

    **Example:**

    ```bash
    node index.js num 75 150
    ```

## Features

- **Multilingual Support:** The game is available in several languages, including English, Russian, Ukrainian, Spanish, and French. To change the language during the game, type `lang` and select the desired language from the list.

- **Exit the Game:** At any point during the game, you can exit by typing `exit`.

## Example Gameplay

```bash
$ node index.js
Guess a number between 1 and 100: 50
Too low! Try again.
Guess a number between 1 and 100: 75
Congratulations! You guessed the number 75 in 2 attempts.
