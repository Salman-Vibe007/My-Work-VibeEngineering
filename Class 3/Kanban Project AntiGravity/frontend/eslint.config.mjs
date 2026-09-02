/** @type {import('next').NextConfig} */
const nextEslint = require('eslint-config-next');

module.exports = [
  {
    ignores: ['.next', 'node_modules', 'out', 'build'],
  },
];

export default module.exports;
