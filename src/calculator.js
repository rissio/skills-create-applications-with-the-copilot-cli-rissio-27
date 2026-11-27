'use strict';

class CalculatorError extends Error {}

// Operações suportadas: adição, subtração, multiplicação e divisão.
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new CalculatorError('Divisão por zero não é permitida.');
  }
  return a / b;
}

const operations = {
  '+': add,
  '-': subtract,
  '*': multiply,
  '/': divide,
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

module.exports = { add, subtract, multiply, divide };
