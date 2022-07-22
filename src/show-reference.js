
 import { Command } from '../node_modules/commander/esm.mjs';

  const showReference = () => {
   
    const program = new Command();
    program
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .arguments('<filepath1> <filepath2>')
    .helpOption('-h, --help', 'output usage information')
    .option('-f, --format <type>', 'output format');
    program.parse(process.argv);
  }
  export default showReference;
