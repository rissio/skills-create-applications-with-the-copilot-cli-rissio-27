'use strict';

class CalculatorError extends Error {}

// Operações suportadas: addition (adição), subtraction (subtração),
// multiplication (multiplicação) e division (divisão).
function addition(a, b) {
  return a + b;
}

function subtraction(a, b) {
  return a - b;
}

function multiplication(a, b) {
  return a * b;
}

function division(a, b) {
  if (b === 0) {
    throw new CalculatorError('Divisão por zero não é permitida.');
  }
  return a / b;
}

const operations = {
  '+': addition,
  '-': subtraction,
  '*': multiplication,
  '/': division,
};

function run(args) {
  if (args.length !== 3 || !Object.hasOwn(operations, args[1])) {
    throw new CalculatorError('Uso: node src/calculator.js <número> <+|-|*|/> <número> (coloque * entre aspas).');
  }

  const [left, , right] = args;
  if (!left.trim() || !right.trim() || !Number.isFinite(Number(left)) || !Number.isFinite(Number(right))) {
    throw new CalculatorError('Os operandos devem ser números válidos e finitos.');
  }

  return operations[args[1]](Number(left), Number(right));
}

if (require.main === module) {
  try {
    console.log(run(process.argv.slice(2)));
  } catch (error) {
    if (!(error instanceof CalculatorError)) {
      throw error;
    }
    console.error(error.message);
    process.exitCode = 1;
  }
}

const add = addition;
const subtract = subtraction;
const multiply = multiplication;
const divide = division;

module.exports = {
  addition,
  subtraction,
  multiplication,
  division,
  add,
  subtract,
  multiply,
  divide,
};
