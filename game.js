const prompt = require('prompt-sync')();

const languages = {
    1: { name: 'English', messages: { prompt: "Guess a number between 1 and 100:", tooLow: "Too low! Try again.", tooHigh: "Too high! Try again.", close: "You're close!", congrats: "Congratulations! You guessed the number", invalid: "Please enter a valid number.", exit: "Exiting the game. Goodbye!" } },
    2: { name: 'Русский', messages: { prompt: "Угадайте число от 1 до 100:", tooLow: "Слишком низкое число! Попробуйте снова.", tooHigh: "Слишком высокое число! Попробуйте снова.", close: "Вы близко!", congrats: "Поздравляем! Вы угадали число", invalid: "Пожалуйста, введите корректное число.", exit: "Выход из игры. До свидания!" } },
    3: { name: 'Українська', messages: { prompt: "Вгадайте число від 1 до 100:", tooLow: "Занадто низьке число! Спробуйте ще раз.", tooHigh: "Занадто високе число! Спробуйте ще раз.", close: "Ви близько!", congrats: "Вітаємо! Ви вгадали число", invalid: "Будь ласка, введіть коректне число.", exit: "Вихід з гри. До побачення!" } },
    4: { name: 'Español', messages: { prompt: "Adivina un número entre 1 y 100:", tooLow: "¡Demasiado bajo! Intenta de nuevo.", tooHigh: "¡Demasiado alto! Intenta de nuevo.", close: "¡Estás cerca!", congrats: "¡Felicidades! Adivinaste el número", invalid: "Por favor, introduce un número válido.", exit: "Saliendo del juego. ¡Adiós!" } },
    5: { name: 'Français', messages: { prompt: "Devinez un nombre entre 1 et 100:", tooLow: "Trop bas ! Essayez encore.", tooHigh: "Trop haut ! Essayez encore.", close: "Vous êtes proche !", congrats: "Félicitations ! Vous avez deviné le nombre", invalid: "Veuillez entrer un nombre valide.", exit: "Sortie du jeu. Au revoir !" } },
};

let selectedLanguage = languages[1];
let randomNumber;
let attempts;

let minNum = 1;
let maxNum = 100;

function parseArguments(argv) {
    const args = argv.slice(2); 
    const result = {
        command: null,
        targetNumber: null,
        maxNum: 100, 
    };

    let i = 0;
    while (i < args.length) {
        const arg = args[i];
        if (arg === 'num') {
            result.command = 'num';
            if (i + 1 < args.length && !args[i + 1].startsWith('-')) {
                result.targetNumber = parseInt(args[i + 1], 10);
                i += 2;
            } else {
                console.error("Error: 'num' command requires a target number.");
                process.exit(1);
            }
        } else if (arg === '-n' || arg === '--max') {
            if (i + 1 < args.length && !isNaN(args[i + 1])) {
                result.maxNum = parseInt(args[i + 1], 10);
                i += 2;
            } else {
                console.error("Error: '-n' flag requires a numeric value.");
                process.exit(1);
            }
        } else {
            console.error(`Error: Unknown argument '${arg}'.`);
            process.exit(1);
        }
    }

    return result;
}

const parsedArgs = parseArguments(process.argv);

if (parsedArgs.command === 'num') {
    if (isNaN(parsedArgs.targetNumber) || parsedArgs.targetNumber <= 0) {
        console.error("Error: Target number must be a positive integer.");
        process.exit(1);
    }
    if (parsedArgs.targetNumber > parsedArgs.maxNum) {
        console.error("Error: Target number cannot be greater than the maximum number.");
        process.exit(1);
    }

    randomNumber = parsedArgs.targetNumber;
    maxNum = parsedArgs.maxNum;
    attempts = 0;

    console.log(`Computer is trying to guess the number ${randomNumber} within range 1 to ${maxNum}.`);
    
    computerGuess(randomNumber, maxNum);
} else {
    if (parsedArgs.maxNum !== 100) {
        maxNum = parsedArgs.maxNum;
    }

    randomNumber = Math.floor(Math.random() * maxNum) + 1;
    attempts = 0;

    console.log(`Random number ${randomNumber} is chosen within range 1 to ${maxNum}.`);
    
    let guess;
    
    while (true) {
        guess = prompt(selectedLanguage.messages.prompt + ' ');

        if (guess.toLowerCase() === 'lang') {
            showLanguages();
            continue;
        }

        if (guess.toLowerCase() === 'exit') {
            console.log(selectedLanguage.messages.exit);
            break;
        }

        const parsedGuess = parseInt(guess);
        
        if (isNaN(parsedGuess)) {
            console.log(selectedLanguage.messages.invalid);
        } else if (parsedGuess < randomNumber) {
            console.log(selectedLanguage.messages.tooLow);
            if (randomNumber - parsedGuess <= 10) {
                console.log(selectedLanguage.messages.close);
            }
        } else if (parsedGuess > randomNumber) {
            console.log(selectedLanguage.messages.tooHigh);
            if (parsedGuess - randomNumber <= 10) {
                console.log(selectedLanguage.messages.close);
            }
        } else {
            console.log(`${selectedLanguage.messages.congrats} ${randomNumber} in ${attempts} attempts.`);
            break;
        }

        attempts++;
    }
}

function computerGuess(target, maxNum) {
    let min = 1;
    let max = maxNum;
    let computerGuess;
    attempts = 0;

    while (min <= max) {
        let midpoint = Math.floor((min + max) / 2);
        let randomOffset = Math.floor(Math.random() * 3) - 1; 
        computerGuess = midpoint + randomOffset;

        computerGuess = Math.max(min, Math.min(computerGuess, max));

        console.log(`Computer guesses: ${computerGuess}`);

        if (computerGuess < target) {
            console.log("Too low!");
            min = computerGuess + 1;
        } else if (computerGuess > target) {
            console.log("Too high!");
            max = computerGuess - 1;
        } else {
            console.log(`Computer ${selectedLanguage.messages.congrats} ${computerGuess} in ${attempts} attempts.`);
            return;
        }

        attempts++;

        if (Math.abs(computerGuess - target) <= 10 && computerGuess !== target) {
            console.log(selectedLanguage.messages.close);
        }
    }

    console.log("Computer cannot make a valid guess anymore.");
}

function showLanguages() {
    console.log("Available languages:");
    for (const [key, lang] of Object.entries(languages)) {
        console.log(`${key}: ${lang.name}`);
    }

    const langKeyInput = prompt("Select a language by number (or press Enter to cancel): ");
    const langKey = parseInt(langKeyInput);

    if (languages[langKey]) {
        selectedLanguage = languages[langKey];
        console.log(`Language changed to ${selectedLanguage.name}.`);
    } else if (langKeyInput.trim() !== "") {
        console.log("Invalid selection.");
    }
}
