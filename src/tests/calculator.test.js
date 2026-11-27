'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const path = require('node:path');
const {
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
} = require('../calculator');

const calculator = path.join(__dirname, '..', 'calculator.js');

test('adição, subtração, multiplicação e divisão', () => {
  assert.equal(add(2, 3), 5);
  assert.equal(subtract(10, 4), 6);
  assert.equal(multiply(45, 2), 90);
  assert.equal(divide(20, 5), 4);
  assert.equal(addition(2, 3), 5);
  assert.equal(subtraction(10, 4), 6);
  assert.equal(multiplication(45, 2), 90);
  assert.equal(division(20, 5), 4);
});

test('operações com números negativos, decimais e zero', () => {
  assert.equal(add(-2, 0.5), -1.5);
  assert.equal(subtract(2, 5), -3);
  assert.equal(multiply(3, 0), 0);
  assert.equal(multiply(-3, 2), -6);
  assert.equal(divide(-9, 2), -4.5);
  assert.throws(() => divide(1, 0), /divisão por zero/i);
  assert.throws(() => divide(1, -0), /divisão por zero/i);
});

test('modulo, power e square root, incluindo casos extremos', () => {
  assert.equal(modulo(5, 2), 1);
  assert.equal(modulo(-5, 2), -1);
  assert.throws(() => modulo(5, 0), /módulo por zero/i);
  assert.throws(() => modulo(5, -0), /módulo por zero/i);
  assert.equal(power(2, 3), 8);
  assert.equal(power(2, -2), 0.25);
  assert.equal(power(5, 0), 1);
  assert.equal(squareRoot(16), 4);
  assert.equal(squareRoot(0), 0);
  assert.throws(() => squareRoot(-1), /raiz quadrada.*negativo/i);
});

test('CLI executa os exemplos da imagem', () => {
  for (const [args, expected] of [
    [['2', '+', '3'], '5'],
    [['10', '-', '4'], '6'],
    [['45', '*', '2'], '90'],
    [['20', '/', '5'], '4'],
    [['5', '%', '2'], '1'],
    [['2', '^', '3'], '8'],
    [['sqrt', '16'], '4'],
  ]) {
    const result = spawnSync(process.execPath, [calculator, ...args], { encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
    assert.equal(result.stdout.trim(), expected);
    assert.equal(result.stderr, '');
  }
});

test('CLI informa erros sem stack trace e retorna código de falha', () => {
  for (const [args, message] of [
    [['1', '/', '0'], /divisão por zero/i],
    [['5', '%', '0'], /módulo por zero/i],
    [['sqrt', '-1'], /raiz quadrada.*negativo/i],
    [['sqrt', 'abc'], /números válidos/i],
    [['sqrt', ''], /números válidos/i],
    [['abc', '+', '3'], /números válidos/i],
    [['', '+', '3'], /números válidos/i],
    [['Infinity', '+', '3'], /números válidos/i],
    [['2', '?', '3'], /uso:/i],
    [['2', '+'], /uso:/i],
    [['2', '+', '3', '4'], /uso:/i],
  ]) {
    const result = spawnSync(process.execPath, [calculator, ...args], { encoding: 'utf8' });
    assert.equal(result.status, 1);
    assert.equal(result.stdout, '');
    assert.match(result.stderr, message);
    assert.doesNotMatch(result.stderr, /\n\s+at /);
  }
});
