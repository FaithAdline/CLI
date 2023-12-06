import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import { createSpinner } from "nanospinner";

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
    const rainbowTitle = gradient.rainbow.multiline(
        'who wants to be the Goat? \n'
    );

    console.log(rainbowTitle);

    await sleep();
    console.clear(); // Clear the console after the animation

    console.log(`
      ${chalk.bgBlue('HOW TO PLAY')}
      I am a process in your computer.
      if you get any question wrong I will be ${chalk.bgRed('KILLED')}
      So get all the questions right...
    `);

    // Additional console content after the animation
    console.log(`
      Welcome to the game! Answer the questions correctly to survive.
      Good luck, ${chalk.green('player')}!
    `);
}

async function askName() {
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'What is your name?',
        default() {
            return 'player';
        },
    });
    playerName = answers.player_name;
}

async function handleAnswer(isCorrect) {
    const spinner = createSpinner('Checking answer...').start();
    await sleep(2000);

    if (isCorrect) {
        spinner.success({ text: `GOOD JOB!!! ${playerName}. NICE ${chalk.green('😊')}` });
    } else {
        spinner.error({ text: `Game over, you lose ${playerName}! ${chalk.red('💀 ❌')}` });
        process.exit(1);
    }
}

async function runGame() {
    await welcome();
    await askName();

    // Question 1
    const answer1 = await inquirer.prompt({
        name: 'question_1',
        type: 'list',
        message: 'Who was the first president of the U.S.A?\n',
        choices: ['George Washington', 'John Adams', 'Thomas Jefferson', 'Abraham Lincoln'],
    });
    console.log(`You selected: ${chalk.green(answer1.question_1)}`);
    handleAnswer(answer1.question_1 === 'George Washington');

    // Repeat the process for the other questions...

    // Question 2
    const answer2 = await inquirer.prompt({
        name: 'question_2',
        type: 'list',
        message: 'What is the longest river in the world?\n',
        choices: ['Nile', 'Amazon', 'Yangtze', 'Mississippi'],
    });
    console.log(`You selected: ${chalk.green(answer2.question_2)}`);
    handleAnswer(answer2.question_2 === 'Amazon');

    // Question 3
    const answer3 = await inquirer.prompt({
        name: 'question_3',
        type: 'list',
        message: 'When was Tesla invented?\n',
        choices: ['1880s', '1890s', '1900s', '1910s'],
    });
    console.log(`You selected: ${chalk.green(answer3.question_3)}`);
    handleAnswer(answer3.question_3 === '1880s');

    // Question 4
    const answer4 = await inquirer.prompt({
        name: 'question_4',
        type: 'list',
        message: 'Which is the longest river in Africa?\n',
        choices: ['Nile', 'Congo', 'Niger', 'Zambezi'],
    });
    console.log(`You selected: ${chalk.green(answer4.question_4)}`);
    handleAnswer(answer4.question_4 === 'Nile');

    // Question 5
    const answer5 = await inquirer.prompt({
        name: 'question_5',
        type: 'list',
        message: 'What is the capital of France?\n',
        choices: ['Berlin', 'Rome', 'Madrid', 'Paris'],
    });
    console.log(`You selected: ${chalk.green(answer5.question_5)}`);
    handleAnswer(answer5.question_5 === 'Paris');

    function winner() {
        console.clear();
        const msg ='Congrats ,${playerName} !\n $ YOU ARE THE GOAT';
        figlet(msg,(err,data) => {
            console.log(gradient.paste1.multiline(data));
        });
    }
}

runGame();




