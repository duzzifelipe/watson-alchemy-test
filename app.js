require('dotenv').config({ silent: true });
var requireEnv = require('require-environment-variables');
var readline = require('readline');
var AlchemyLanguageV1 = require('watson-developer-cloud/alchemy-language/v1');

requireEnv(['API_KEY']);

var alchemy_language = new AlchemyLanguageV1({
    api_key: process.env.API_KEY
});

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter something for Watson: ', function(answer) {
    var params = { text: answer };

    alchemy_language.combined(params, function (err, response) {
        if (err)
            console.log('error:', err);
        else
            console.log(JSON.stringify(response, null, 2));
    });

    rl.close();
});
