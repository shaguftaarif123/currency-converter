#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";

// Currency Converter API LINK
let apiLink = "https://v6.exchangerate-api.com/v6/0cdbcc77d178070e2656c7ef/latest/PKR";

let fetchData = async (data: any) => {
    let fetchData = await fetch(data);
    let res = await fetchData.json();
    return res.conversion_rates;
};

let data = await fetchData(apiLink);
let countries = Object.keys(data);

let firstCountry = await inquirer.prompt({
    type: "list",
    name: "name",
    message: "Converting From",
    choices: countries
});

//console.log(`Converting from ${chalk.greenBright.bold(firstCountry.name)}`);

let userMoney = await inquirer.prompt({
    type: "number",
    name: "rupee",
    message: `please enter the amout in ${chalk.greenBright.bold(firstCountry.name)}:`,
});


let secondCountry = await inquirer.prompt({
    type: "list",
    name: "name",
    message: "Converting To",
    choices: countries,
});


let cnv = `https://v6.exchangerate-api.com/v6/0cdbcc77d178070e2656c7ef/pair/
${firstCountry.name}/${secondCountry.name}`;

// fetching data for conversion rate
let cnvData = async (data: any) => {
    let cnvData = await fetch(data);
    let res = await cnvData.json();
    return res.conversion_rate;
};

let conversionRate = await cnvData(cnv);

let convertedRate = userMoney.rupee * conversionRate
console.log(`Your ${chalk.bold.greenBright(firstCountry.name)} 
${chalk.bold.greenBright(userMoney.rupee)} 
in ${chalk.bold.greenBright(secondCountry.name)}
 is ${chalk.bold.greenBright(convertedRate)}`);