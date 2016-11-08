var chalk = require('chalk');

module.exports = () => {
    var version = '0.1.0',
        welcomeMessage = "       _____ _                 __   \r\n      / ___/(_)___ ___  ____  / /__ \r\n      \\__ \\/ / __ `__ \\/ __ \\/ / _ \\\r\n     ___/ / / / / / / / /_/ / /  __/\r\n    /____/_/_/ /_/ /_/ .___/_/\\___/ \r\n       _____ __     /_/__           \r\n      / ___// /___  __/ /__         \r\n      \\__ \\/ __/ / / / / _ \\        \r\n     ___/ / /_/ /_/ / /  __/        \r\n    /____/\\__/\\__, /_/\\___/         \r\n             /____/           ",
        greeting = "   Welcome to the Simple Style Guide   ",
        poweredBy = "         by Stefan Bauer - N8D         ",
        delimiter = "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━";

    return {

        welcome: chalk.bold.yellow(welcomeMessage) +
            version + '\n\n' +
            chalk.red(delimiter) + '\n' +
            chalk.cyan(greeting) + '\n' +
            poweredBy + '\n' +
            chalk.red(delimiter) + '\n'

    };
};