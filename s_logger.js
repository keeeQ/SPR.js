//assume the log file will going to be in the __dirname path
const {readFile} = require('fs');
function logger(value,file,id) {
    readFile(file,"utf8",(err,data)=>{
        if(err) {
            createLoggerFile((name)=>{
                readFile(`./${name}`,"utf8",(err,data)=>{
                    if(err) {
                        console.log('problem while reading the file');
                        throw err;
                    }
                    if(typeof data === "string" ) {
                        let jObj = JSON.parse(data);
                        jObj[id] = value;
                        jObj = JSON.stringify(jObj);
                        writeFile(name,jObj,err=>{
                            if(err) {
                                console.log('operation is failed');
                                return;
                            }
                        });
                    }
                    console.log("the format is not string");
                    return;
                });
            });
            return; //shak daram be in
            //means we dont have the file;

        }

        if(typeof data === "string") {
            let jObj = JSON.parse(data);
            jObj[id] = value;
            jObj = JSON.stringify(jObj);
            writeFile(file.split(".")[1],jObj,(err)=>{
                if(err) {
                    console.log("operation failed in the second phase of the logger");
                    return;
                }

                console.log("logged completed");
            });
        }


    });

}


function createLoggerFile(cb) {
    writeFile('spr.log.json',"{}",err=>{
        if(err) {
            console.log('cant create the log file');
            return;
        }

        console.log("log file created");
        cb('spr.log.json');
    });
}

exports.slog = logger;

