import { join } from 'path';
import { ensureDirSync, writeFileSync, copyFileSync } from 'fs-extra';
import { execFileSync } from 'child_process';

const usage = () => {
  console.log('Usage: ts-node cli.ts <method> [<arg0> ...]');
  process.exit(1);
};

const [, , methodName, ...restArgs] = process.argv;

if (!methodName) {
  usage();
}

const bitcoinCliExecutablePath = '/Users/chrisarnesen/bitcoin-0.17.0/bin/bitcoin-cli';
const bitcoinCliArgs = ['-testnet', methodName, ...restArgs];

const bitcoinCliOutput = execFileSync(bitcoinCliExecutablePath, bitcoinCliArgs, {
  encoding: 'utf8',
});

const srcDir = __dirname;
const methodDir = join(srcDir, methodName);

ensureDirSync(methodDir);

const resultFilePath = join(methodDir, 'example.json');

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
const quicktypeCliOutput = execFileSync(quicktypeCliPath, quicktypeCliArgs, {
  encoding: 'utf8',
});

const indexFilePath = join(methodDir, 'index.ts');
const indexFileContents = quicktypeCliOutput.replace(
  'interface Example',
  'type Result =',
);

writeFileSync(indexFilePath, indexFileContents);

copyFileSync(
  join(srcDir, 'getnetworkinfo', 'index.test.ts'),
  join(methodDir, 'index.test.ts'),
);
