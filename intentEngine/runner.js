import open from '../intents/open/index.js';

const run = (intent) => {
  const { command, data } = intent;

  switch (command) {
    case 'open':
      open(data);
      break;
    default:
      break;
  }
};

export default {
  run,
};
