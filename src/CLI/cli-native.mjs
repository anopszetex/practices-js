const [nodePath, filePath, ...commands] = process.argv;

function removePrefix(command) {
  return command.slice(2);
}

function getvalue(commands, index) {
  return commands[index + 1];
}

function parseArguments(commands) {
  const args = {};

  for (let index = 0; index < commands.length; index++) {
    const command = commands[index];

    if (command.startsWith('--')) {
      const key = removePrefix(command);
      const value = getvalue(commands, index);

      args[key] = value;
      index++;
    }
  }

  return args;
}

const result = parseArguments(commands);

console.log({ result });
