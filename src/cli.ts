import { join } from 'path';
import { execFileSync } from 'child_process';
import { writeFileSync, unlinkSync } from 'fs';

const usage = () => {
  console.log('Usage: ts-node cli.ts <method> [<arg0> ...]');
  process.exit(1);
};

const [, , methodName, ...restArgs] = process.argv;

if (!methodName) {
  usage();
}

const bitcoinCliExecutablePath = '/Users/chrisarnesen/bitcoin-0.17.0/bin/bitcoin-cli';
const bitcoinCliArgs = ['-testnet', '-named', methodName.toLowerCase(), ...restArgs];
const bitcoinCliOutput = execFileSync(bitcoinCliExecutablePath, bitcoinCliArgs, {
  encoding: 'utf8',
});

const srcDir = __dirname;
const examplesDir = join(srcDir, 'examples');

const resultFilePath = join(examplesDir, `${methodName}Result.json`);

writeFileSync(resultFilePath, bitcoinCliOutput);

const quicktypeCliPath = require.resolve('quicktype');
const quicktypeCliArgs = [
  '--src',
  resultFilePath,
  '--src-lang',
  'json',
  '--lang',
  'ts',
  '--just-types',
];

let typeDefinition: string = `export type ${methodName}Result = string`;
try {
  const quicktypeCliOutput = execFileSync(quicktypeCliPath, quicktypeCliArgs, {
    encoding: 'utf8',
  });
  typeDefinition = quicktypeCliOutput.replace('interface', 'type');
} catch (ex) {
  if (!ex.stderr.includes('Parser cannot parse')) {
    throw ex;
  }
  console.log(bitcoinCliOutput);
  unlinkSync(resultFilePath);
}

console.log(typeDefinition);
