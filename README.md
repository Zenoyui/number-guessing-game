# Number Guessing Game

**Number Guessing Game** is an engaging console-based JavaScript game where you have to guess a randomly generated number. The game supports multiple languages and offers various game modes.

## Getting Started

### Requirements

- [Node.js](https://nodejs.org/) installed on your computer.

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Zenoyui/number-guessing-game.git
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

- **`node game.js`**

    Starts the game with a randomly selected number between 1 and 100.

- **`node game.js -n [max number]`**

    Starts the game with a randomly selected number between 1 and the specified `[max number]`.

    **Example:**

    ```bash
    node game.js -n 200
    ```

- **`node game.js num [number] -n [max number]`**

    A mode where the computer tries to guess the specified `[number]` within the range of 1 to `[max number]`.

    **Example:**

    ```bash
    node game.js num 75 -n 150
    ```

## Features

- **Multilingual Support:** The game is available in several languages, including English, Russian, Ukrainian, Spanish, and French. To change the language during the game, type `lang` and select the desired language from the list.

- **Exit the Game:** At any point during the game, you can exit by typing `exit`.

- **Intelligent Computer Guessing:** The computer uses a binary search algorithm to efficiently guess the number by narrowing down the range based on feedback.

## Computer Guessing Mechanism

The computer employs a **binary search algorithm** to guess the number efficiently. Here's how it works:

1. **Initial Range:** The computer starts with a minimum (`min = 1`) and a maximum (`max = [max number]`) value based on the game's settings.

2. **Guess Calculation:** It calculates the midpoint of the current range:
    ```javascript
    computerGuess = Math.floor((min + max) / 2);
    ```

3. **Feedback Handling:**
    - **Too Low:** If the guess is lower than the target number, the computer adjusts the minimum bound to `guess + 1`.
    - **Too High:** If the guess is higher than the target number, the computer adjusts the maximum bound to `guess - 1`.
    - **Correct Guess:** If the guess matches the target number, the computer congratulates itself and the game ends.

4. **Iteration:** This process repeats, each time halving the search range, until the correct number is guessed or the range becomes invalid (`min > max`).

**Benefits of Binary Search Algorithm:**

- **Efficiency:** Guarantees finding the correct number in approximately `log2(max number)` attempts.
- **Predictability:** Provides a consistent and reliable method for guessing.
- **Speed:** Minimizes the number of attempts needed, making the game swift and engaging.

**Example:**

If the target number is `1000` within a range of `1` to `15000`:

1. **First Guess:** `(1 + 15000) / 2 = 7500` → Too high → New range: `1` to `7499`.
2. **Second Guess:** `(1 + 7499) / 2 = 3750` → Too high → New range: `1` to `3749`.
3. **Third Guess:** `(1 + 3749) / 2 = 1875` → Too high → New range: `1` to `1874`.
4. **Fourth Guess:** `(1 + 1874) / 2 = 937` → Too low → New range: `938` to `1874`.
5. **Fifth Guess:** `(938 + 1874) / 2 = 1406` → Too high → New range: `938` to `1405`.
6. **Sixth Guess:** `(938 + 1405) / 2 = 1171` → Too high → New range: `938` to `1170`.
7. **Seventh Guess:** `(938 + 1170) / 2 = 1054` → Too high → New range: `938` to `1053`.
8. **Eighth Guess:** `(938 + 1053) / 2 = 995` → Too low → New range: `996` to `1053`.
9. **Ninth Guess:** `(996 + 1053) / 2 = 1024` → Too high → New range: `996` to `1023`.
10. **Tenth Guess:** `(996 + 1023) / 2 = 1009` → Too high → New range: `996` to `1008`.
11. **Eleventh Guess:** `(996 + 1008) / 2 = 1002` → Too high → New range: `996` to `1001`.
12. **Twelfth Guess:** `(996 + 1001) / 2 = 998` → Too low → New range: `999` to `1001`.
13. **Thirteenth Guess:** `(999 + 1001) / 2 = 1000` → Correct!

In this example, the computer successfully guesses the number `1000` in `13` attempts.

## Example Gameplay

```bash
$ node game.js
Guess a number between 1 and 100: 50
Too low! Try again.
Guess a number between 1 and 100: 75
Congratulations! You guessed the number 75 in 2 attempts.
