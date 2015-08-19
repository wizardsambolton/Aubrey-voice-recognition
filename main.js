
var brain =["hi",];

_mood = ['very good, thank you', 'not very good', 'fair', 'iffy', 'Awesome!', 'Good, thank you', 'Ready to Rock',];
mood = _mood[Math.floor(Math.random() * 7)];

//change this if we have longer commands.
annyang.start({continuous: true});



function save_name(){
    console.log("hello");
    var input = document.getElementById("#namebox");
    localStorage.setItem("fname", input.value);
};
var firstname = localStorage.getItem("fname");

annyang.addCallback('resultNoMatch', function(){document.getElementById("#resultplace").innerHTML = "Say that again.";});
function speak (phrase) {
    var worte = new SpeechSynthesisUtterance(phrase);
    worte.lang = "en-GB";
    window.speechSynthesis.speak(worte);
};

// Just a list of functions that anyone can call
// you can call these in the console by typing actions.YourFunctioName()
var actions = {

    youtube: function (term) {
        if (mood == 'iffy' || mood == "not very good") {
            speak("no")
            document.getElementById('#resultplace').innerHTML = "no";
        }
        else {
            window.location.href = 'https://www.youtube.com/results?search_query='+term;
        }
    },
    //youtube: function (term) {
    //    speak(term)
    //},


    google: function (term) {
        if (mood == 'iffy' || mood == "not very good") {
            speak("no")
            document.getElementById('#resultplace').innerHTML = "no";
        }
        else {
            window.location.href = 'https://www.google.com/#q='+term;
        }
    },
    d20: function () {
        var d20 = Math.floor(Math.random() * 20);



        speak(d20);
        document.getElementById("#resultplace").innerHTML = d20;
    },
    testcode: function() {

        newcommand = prompt("Wanted code");
        if (newcommand.indexOf("document.getElementById") >= 0) {
            alert("Not allowed");


        }
        else if (newcommand.indexOf("document.getItem") >= 0) {
            alert("Not allowed");


        }

        else {
            eval(newcommand);
        }


    },

    removeReminders: function () {
        // set reminders to be an empty array, quickest way to clear it
        localStorage.setItem('reminders', JSON.stringify([]));
        speak("All reminders have been cleared")
        document.getElementById('#resultplace').innerHTML = "All reminders have been cleared";
    },
    addReminder: function(term) {
        var item = localStorage.getItem('reminders');
        if (item == null) {
            // if we've never stored any reminder, so use an empty array string
            item =  "[]";
        }

        // take our string item and parse it into a real array
        var reminders = JSON.parse(item);
        // push the new term onto the list
        reminders.push(term);
        // stringify the reminders and save them back in storage
        localStorage.setItem('reminders', JSON.stringify(reminders));

        speak('Saved to my memory')
        document.getElementById('#resultplace').innerHTML = "Saved to my memory";
    },
    listReminders: function() {
        var item = localStorage.getItem('reminders');
        if (item == null) {
            // nothing has ever been stored before
            // return so we don't do the rest of this function
            return speak("No reminders");

        }

        var reminders = JSON.parse(item);

        if(reminders.length == 0) {
            // theres an empty array, but still no reminders
            // return so we dont do the rest of this function
            return speak("no reminders");
        }

        speak('your reminders are as follows');
        for(var i=0; i < reminders.length; i++) {
            speak(reminders[i]);

            // array.join() sticks all the elements together seperated by a separator
            document.getElementById('#resultplace').innerHTML = reminders.join(", ");
        }
    },
    d6: function () {
        var d6 = Math.floor(Math.random() * 6);
        speak(d6);
        document.getElementById("#resultplace").innerHTML = d6;
    },

    diceroll1: function (term) {

        if (mood == 'iffy' || mood == "not very good") {
            speak("no")
            document.getElementById('#resultplace').innerHTML = "no";
        }
        else {
            var diceroll2 = Math.floor(Math.random() * term);
            speak(diceroll2);
            document.getElementById("#resultplace").innerHTML = diceroll2;
        }
    },

    wolfram: function(term) {
        $.get("https://api.wolframalpha.com/v2/query?input="+term+"&appid=THYQLJ-3K45Y2A7W5"), function(wolfram__) {
            speak(wolfram__);
        };
        //http://api.wolframalpha.com/v2/query?input=pi&appid=XXXX
        //var wolfram_ = "http://api.wolframalpha.com/v2/query?input="+term+"&appid=THYQLJ-3K45Y2A7W5";
        //speak(wolfram_);
    },
    weather: function (term) {
        $.get('https://api.openweathermap.org/data/2.5/weather?q='+term, function (theweather) {
            speak(theweather.temp);





        });

    },
    badAsk: function() {
        if (mood == 'not very good' || mood == 'iffy') {
            _askBad = ['its not about me', 'nothing'];
            askBad = _askBad[Math.floor(Math.random() * 2)];
            speak(askBad);
            document.getElementById("#resultplace").innerHTML = askBad;
        }
        else {}
    },

    mood: function() {
        _mood = ['very good, thank you', 'not very good', 'fair', 'iffy', 'Awesome!', 'Good, thank you', 'Ready to Rock',];
        mood = _mood[Math.floor(Math.random() * 7)];

    },

    howu: function () {

        speak(mood);
        document.getElementById("#resultplace").innerHTML = mood;



    },


};









function on() {
    speak("now listening")
}



// bind all of our spoken commands to the actions
if (annyang) {
    annyang.setLanguage('en-GB');

    // Define the triggers for the commands
    var commands = {
        '(hello)(hi)(hey)': function() {
            speak('hello ');
            document.getElementById("#resultplace").innerHTML = "hello ";
        },

        '(Who made you)(Who created you) (who is your creator) ': function() {
            speak('sam bolton');
            document.getElementById("#resultplace").innerHTML = "sam bolton";
        },
        '(hey aubrey)(aubrey) (ok aubrey)': function() {
            if (localStorage.getItem("fname") == null) {
                speak('Ready, sir');
                document.getElementById("#resultplace").innerHTML = "Ready, sir";
            }
            else {
                speak('Ready,' + firstname);
                document.getElementById("#resultplace").innerHTML = "Ready, " + firstname;

            }

        },
        '(thats good) (that is good)': function() {
            speak('good');
            document.getElementById("#resultplace").innerHTML = "good";
        },

        '(shutup) (shut up) (pause) (be quit) (go to sleep) (stop)': function() {
            if (mood == 'iffy' || mood == "not very good") {
                speak("no")
                document.getElementById('#resultplace').innerHTML = "no";
            }
            else {
                annyang.pause();
                annyang.removeCommands();
                annyang.addCommands(commands2);
                annyang.resume();
                document.getElementById("#resultplace").innerHTML = "Paused";
            }
        },

        '(hey aubrey can you) (can you) youtube *term': actions.youtube,
        '(hey aubrey can you) (can you) search *term': actions.google,
        '(hey aubrey can you) (can you) google *term': actions.google,
        'roll a d20': actions.d20,
        'roll a d6': actions.d6,
        //    'What is *term': actions.wolfram,
        'what is the weather in *term': actions.weather,
        '(how are you) (you good) (are you alright)': actions.howu,
        'roll a d *term': actions.diceroll1,
        'clear reminder(s)' : actions.removeReminders,
        'remember (for me) *term' : actions.addReminder,
        'list reminders' : actions.listReminders,
        '(whats wrong) (whats up)(what is up)' : actions.badAsk,
        'code test' : actions.testcode,




    };
    var commands2 = {
        //this is for the pause function only!
        '(wake up)(resume)(aubry wakeup)(start)': function() {
            annyang.pause();
            annyang.removeCommands();
            annyang.addCommands(commands);
            annyang.resume();
            document.getElementById("#resultplace").innerHTML = "Resumed";
        }

    }
    // take our list of commands and stick them all in
    annyang.addCommands(commands);
}

window.setInterval(function() {
    actions.mood()

}, 60000);
