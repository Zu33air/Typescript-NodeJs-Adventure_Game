#! /usr/bin/env node
import inquirer from "inquirer";
//variable in the Game;
let enmeysName = ["Skelton", "Zombie", "Warrior", "Assasin"];
let maxEnemyHealth = 75;
let enemyAttackDamage = 25;
//Player variables
let health = 100;
let playerAttackDamage = 50;
let numHealthPotion = 3;
let healthPotionHealAmount = 30;
let healthPotionDropChance = 50; //Percentage
let running = true;
console.log("Welcome to the Dungeon");
Game: while (running) {
    console.log("______________________________________________________________________");
    let enemyHealth = Math.floor(Math.random() * (maxEnemyHealth - 0) + 0);
    let enemies = enmeysName[Math.floor(Math.random() * (4 - 0) + 0)];
    console.log(`\t # ${enemies} has appeared \n`);
    while (enemyHealth > 0) {
        console.log(`\t # your health : ${health} HP \t \n `);
        console.log(`\t # your enemy health is ${enemyHealth} HP!`);
        // console.log(`What would you like to do:`);
        let option = await inquirer.prompt([
            {
                name: "userChoice",
                type: "list",
                choices: ["Attack", "Run", "Drink"],
                message: "What would you like to do :",
            },
        ]);
        const { userChoice } = option;
        console.log(userChoice);
        if (userChoice == "Attack") {
            let damageDealt = Math.floor(Math.random() * (playerAttackDamage - 0) - 0);
            let damageTaken = Math.floor(Math.random() * (enemyAttackDamage - 0) - 0);
            enemyHealth -= damageDealt;
            health -= damageTaken;
            console.log(`\t Your stike the ${enemies} for ${damageDealt}`);
            console.log(`\t You receieved ${damageTaken} in retailiation! `);
            if (health <= 0) {
                console.log(`\t # You have taken too much damage you too weak to go on`);
                break Game;
            }
        }
        else if (option.userChoice == "Drink") {
            if (numHealthPotion > 0) {
                health += healthPotionHealAmount;
                numHealthPotion--;
                console.log(`# You drink the Potion ,healing yourself for${healthPotionHealAmount} \n \t now you have ${health} HP !#  \n\t you have ${numHealthPotion} health potion left`);
            }
            else {
                console.log(` # You have no health Potion left, Defeat enemies for chance to get one`);
            }
        }
        else if (option.userChoice == "Run") {
            console.log(` # You runaway form the ${enemies}!`);
            continue Game;
        }
        else {
            console.log(` # You have entered invalid command`);
        }
        if (health < 1) {
            console.log(` # You limp out of the dungeon weak from Battle`);
            break;
        }
        console.log(`#         You have defeated the enemy ${enemies}`);
        console.log(`#         You have ${health} HP left`);
        if (Math.floor(Math.random() * (100 - 0) * 0) > healthPotionDropChance) {
            numHealthPotion++;
            console.log(`\n  # The ${enemies} dropped a health potion \t\n You have a ${numHealthPotion} health potions`);
        }
        console.log("_____________________________________");
        console.log("# What would you like to do?");
        const next = await inquirer.prompt([
            {
                name: "nextStep",
                type: "list",
                choices: ["Continue Fighting", "Exit"],
            },
        ]);
        if (next.nextStep == "Continue Fighting") {
            console.log(`# You continue on your adventure`);
        }
        else if (next.nextStep == "Exit") {
            console.log(`# You exit the Dungeon from your adventure`);
            break Game;
        }
    }
}
