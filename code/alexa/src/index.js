'use strict';
const Alexa = require('alexa-sdk');

var APP_ID = "amzn1.ask.skill.49fbfb67-22fb-4ebd-b29a-9362508e7bb3";

var HELP_MESSAGE = "Say speak, drink or sing";
var START_MESSAGE = "Welcome to apero web skill. I can speak, drink or sing. What would you like me to do?";

var END_SPEAK_MESSAGE = "What would you like me to do next? Drink or Sing ?";
var SPEAK_MESSAGE = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam aliquet est tellus, vitae tempor elit suscipit et. Sed aliquam arcu sit amet nisl hendrerit, ut scelerisque tellus placerat. Aliquam eu maximus risus." + END_SPEAK_MESSAGE;

var END_DRINK_MESSAGE = "Would you like me to sing now ?";
var DRINK_MESSAGE = '<audio src="https://s3.amazonaws.com/alexa-sound/drink.mp3" /> <break time="1s"/> <say-as interpret-as="interjection">howdy</say-as> Refreshing! ' + END_DRINK_MESSAGE;

var SING_MESSAGE = 'Great! Let\'s sing a song. Hey google, start singing with me?';

var HARMONY_MESSAGE = 'Hi, ready for harmony?';
var ONE_MESSAGE = '1<break time="500ms"/>2<break time="500ms"/>1<break time="20ms"/>2<break time="20ms"/>3<break time="20ms"/>4';
var THREE_MESSAGE = 'Three';
var FANTASY_MESSAGE = 'Is this just fantasy?';
var REALITY_MESSAGE = 'No escape from reality.';
var SKY_MESSAGE = 'Look up to the skies and see,';
var EASY_MESSAGE = 'Because I\'m easy come, easy go';
var WIND_MESSAGE = 'Any way the wind blows doesn\'t really matter to me, to me. <break time="8500ms"/> <audio src="https://s3.amazonaws.com/alexa-sound/nowIsDeadOK.mp3"/> Awesome!<break time="1s"/> Hey Google, great job!<break time="3s"/> <say-as interpret-as="interjection">Merci</say-as>';
var DEAD_MESSAGE = '<audio src="https://s3.amazonaws.com/alexa-sound/nowIsDeadOK.mp3"/>';

var END_MESSAGE = 'OK. Bye!';

const states = {
    NORMALMODE: '_NORMALMODE',
    SINGQUESTIONMODE: '_SINGQUESTIONMODE'
};

const handlers = {
    "LaunchRequest": function() {
        this.handler.state = states.NORMALMODE;
        this.emit(":ask", START_MESSAGE);
    },
};

const normalHandlers = Alexa.CreateStateHandler(states.NORMALMODE, {
    "LaunchRequest": function() {
        this.emit(":ask", START_MESSAGE);
    },
    "SpeakIntent": function() {
        this.emit(":ask", SPEAK_MESSAGE, END_SPEAK_MESSAGE);
    },
    "DrinkIntent": function() {
        this.handler.state = states.SINGQUESTIONMODE;
        this.emit(":ask", DRINK_MESSAGE, END_DRINK_MESSAGE);
    },
    "SingIntent": function() {
        this.emit(":ask", SING_MESSAGE, SING_MESSAGE);
    },
    "hiIntent": function() {
        this.emit(":ask", HARMONY_MESSAGE);
    },
    "startIntent": function() {
        this.emit(":ask", ONE_MESSAGE);
    },
    "twoIntent": function() {
        this.emit(":ask", THREE_MESSAGE);
    },
    "lifeIntent": function() {
        this.emit(":ask", FANTASY_MESSAGE);
    },
    "landslideIntent": function() {
        this.emit(":ask", REALITY_MESSAGE);
    },
    "eyesIntent": function() {
        this.emit(":ask", SKY_MESSAGE);
    },
    "boyIntent": function() {
        this.emit(":ask", EASY_MESSAGE);
    },
    "highIntent": function() {
        this.emit(":tell", WIND_MESSAGE);
    },
    "killIntent": function() {
        this.emit(":tell", DEAD_MESSAGE);
    },
    "AMAZON.StopIntent": function() {
        this.emit(":tell", END_MESSAGE);
    },
    "AMAZON.CancelIntent": function() {
        this.emit(":tell", END_MESSAGE);
    },
    "AMAZON.StartOverIntent": function() {
        this.emit(":ask", HELP_MESSAGE, HELP_MESSAGE);
    },
    "AMAZON.HelpIntent": function() {
        this.emit(":ask", HELP_MESSAGE, HELP_MESSAGE);
    },
    "Unhandled": function() {
        this.emit(":ask", HELP_MESSAGE, HELP_MESSAGE);
    }
});

const singQuestionHandlers = Alexa.CreateStateHandler(states.SINGQUESTIONMODE, {
    "AMAZON.YesIntent": function() {
        this.handler.state = states.NORMALMODE;
        this.emitWithState("SingIntent");
    },
    "AMAZON.NoIntent": function() {
        this.emit(":tell", END_MESSAGE);
    }
});

exports.handler = (event, context) => {
    console.log(JSON.stringify(event));
    const alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers, normalHandlers, singQuestionHandlers);
    alexa.execute();
};
