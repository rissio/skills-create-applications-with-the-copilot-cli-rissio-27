'use strict';

class CalculatorError extends Error {}

// Operações suportadas: addition (adição), subtraction (subtração),
// multiplication (multiplicação), division (divisão), modulo (resto),
// power (potência) e square root (raiz quadrada).
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

function modulo(a, b) {
  if (b === 0) {
    throw new CalculatorError('Módulo por zero não é permitido.');
  }
  return a % b;
}

function power(base, exponent) {
  return base ** exponent;
}

function squareRoot(n) {
  if (n < 0) {
    throw new CalculatorError('Raiz quadrada de número negativo não é permitida.');
  }
  return Math.sqrt(n);
}

const operations = {
  '+': addition,
  '-': subtraction,
  '*': multiplication,
  '/': division,
  '%': modulo,
  '^': power,
};

function run(args) {
  if (args.length === 2 && args[0] === 'sqrt') {
    if (!args[1].trim() || !Number.isFinite(Number(args[1]))) {
      throw new CalculatorError('Os operandos devem ser números válidos e finitos.');
    }
    return squareRoot(Number(args[1]));
  }

  if (args.length !== 3 || !Object.hasOwn(operations, args[1])) {
    throw new CalculatorError('Uso: node src/calculator.js <número> <+|-|*|/|%|^> <número> ou node src/calculator.js sqrt <número> (coloque * entre aspas).');
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
  modulo,
  power,
  squareRoot,
  add,
  subtract,
  multiply,
  divide,
};
