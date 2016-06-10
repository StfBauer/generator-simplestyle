'use strict';
var chalk = require('chalk'),
    mkdirp = require('mkdirp'),
    fs = require('fs');


module.exports = {

    createFolder: function(folderList) {

        if (folderList.length !== null) {
            for (var i = 0; i < folderList.length; i++) {
                try {
                    if (!fs.existsSync(folderList[i])) {

                        mkdirp(folderList[i]);
                        console.log(chalk.green("   Folder created: ") + folderList[i]);

                    } else {

                        console.log(chalk.cyan("identical ") + folderList[i]);

                    }

                } catch (error) {
                    console.log(chalk.red("   Error: ") + error);
                }
            }
        }

    }
};