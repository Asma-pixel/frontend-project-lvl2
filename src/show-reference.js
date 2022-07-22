


  const showReference = () => {
    const { Command } = require('../node_modules/commander');
    const program = new Command();
    program
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.');
    program.parse(process.argv);
  
  }
  exports.showReference = showReference();
