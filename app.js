require('dotenv').config({ silent: true });
var requireEnv = require('require-environment-variables');
var readline = require('readline');
var fs = require('fs');
var play = require('play');
var AlchemyLanguageV1 = require('watson-developer-cloud/alchemy-language/v1');
var TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');

requireEnv(['API_KEY']);

var alchemy_language = new AlchemyLanguageV1({
    api_key: process.env.API_KEY
});

// var text_to_speech = new TextToSpeechV1({
//     api_key: process.env.API_KEY
// });

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

    /*
    text_to_speech.synthesize({
        text: answer,
        accept: 'audio/wav',
        voice: 'pt-BR_IsabelaVoice'
    }).pipe(fs.createWriteStream('./output.wav'));
    play.sound('./output.wav');
    */

    rl.close();
});


