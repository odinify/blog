const commander = require('commander');

const createAction = require('./actions/create');

commander
  .command('create-user')
  .alias('create')
  .description('Create a new user')
  .action(createAction);

commander.parse(process.argv);
