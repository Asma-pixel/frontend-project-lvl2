import { Command } from 'commander/esm.mjs';
import getDiff from './getDiff.js';

const genDiff = () => {
  const program = new Command();
  program
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .arguments('<filepath1> <filepath2>')
    .helpOption('-h, --help', 'output usage information')
    .option('-f, --format<type>', 'output format')
    .action((filepath1, filepath2) => {
      console.log(getDiff(filepath1, filepath2));
    });

  program.parse(process.argv);
};
export default genDiff;
