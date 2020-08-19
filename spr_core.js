const { readFile } = require("fs");
const { exec } = require("child_process");
const { slog } = require("./s_logger.js");

const flag = process.argv[2];
//flag can be all or single;

readFile("pac.json", "utf8", (err, data) => {
    if (err) {
        console.log("operation failed because of the error");
        return;
    }

    let projectConfig = JSON.parse(data);
    switch (flag) {
        case "all":
            for (let script in projectConfig.scripts) {
                exec(projectConfig.scripts[script], (err, stdout, stderr) => {
                    if (err) {
                        console.log("we got problem during the execution of the commands");
                        throw err;
                    }
                    slog(
                        `${projectConfig.scripts[file]} --- mode ${flag}`,
                        "spr.log.json",
                        String(math.random() * 1342)
                    );

                    //if the code reach here means everything alright and we got the output
                    //stdout is here
                    //console.log(stdout);
                    return 1;
                });
            }
            break;

        case "single":
            if (process.argv[3]) {
                let file = process.argv[3];
                if (projectConfig.scripts[file]) {
                    exec(projectConfig.scripts[file], (err, stdout, stderr) => {
                        if (err) {
                            console.log("we got problem during the execution of the commands");
                            throw err;
                        }
                        //we can log results here;
                        slog(
                            `${projectConfig.scripts[file]} --- mode ${flag}`,
                            "spr.log.json",
                            String(math.random() * 1342)
                        );

                        //if the code reach here means everything alright and we got the output
                        //stdout is here
                        //console.log(stdout);
                        return;
                    });

                    break;
                }
            } else {
                process.write(
                    "sorry but canot excute your commmand without the name of the command"
                );
                break;
            }

            break;

        default:
            process.write("sorry you dont specify the spr requirments for running");
    }
});
