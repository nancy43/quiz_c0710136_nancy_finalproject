/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

function validateForm() {
    var un = document.loginform.usr.value;
    var pw = document.loginform.pword.value;
    var username = "admin";
    var password = "admin";
    if ((un == username) && (pw == password)) {
        window.location = "home.html";
        return true;
    } else {
        alert("ENTER CORRECT USERNAME/PASSWORD");
        return false;
    }
}

$('.message a').click(function() {
    $('form').animate({ height: "toggle", opacity: "toggle" }, "slow");
});





var question = [];
var choice_id = "choice";
var val = ['A', 'B', 'C', 'D'];
var ans = []
var q_no = 0;
var correct = 0;

function _(x) {
    return document.getElementById(x);
}

function getdata() {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", 'quiz.json', false);
    var allText = '';
    rawFile.onreadystatechange = function() {

        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                allText = rawFile.responseText;
            }

        }


    }

    rawFile.send(null);
    var parsedData = JSON.parse(allText);
    for (i = 0; i < 20; i++) {
        var temp = [];
        if (parsedData.questions[i].correctAnswer == 1) {
            ans.push("A");
        } else if (parsedData.questions[i].correctAnswer == 2) {
            ans.push("B");
        } else if (parsedData.questions[i].correctAnswer == 3) {
            ans.push("C");
        } else if (parsedData.questions[i].correctAnswer == 4) {
            ans.push("D");
        }

        temp.push(parsedData.questions[i].question);
        for (j = 0; j < parsedData.questions[i].answers.length; j++) {
            temp.push(parsedData.questions[i].answers[j]);
        }
        question.push(temp);
    }


}

function getChoice(ch, i) {
    return "<br><input type='Radio' value='" + val[i] + "' name='" + choice_id + "'/>" + ch + "<br>";
}

function rawData() {
    if (question.length == 0) {
        getdata();
    }
    var v = document.getElementById('test');
    var q = _("question");
    if (q_no >= question.length) {
        v.innerHTML = "You Score " + correct + " Out of " + question.length;

        q.innerHTML = "<a href='index.html'<button class='ui-btn'>RESTART QUIZ</button></a>";
        return false;
    }


    v.innerHTML = "Question " + (q_no + 1) + " of 20";



    q.innerHTML = question[q_no][0] + "<br><br>";
    for (i = 0; i < val.length; i++) {
        q.innerHTML += getChoice(question[q_no][i + 1], i);
    }
    q.innerHTML += "<br><br><button onclick='checkAns()' type='submit' class='ui-btn'>Next</button>";

}

function checkAns() {
    var choices = document.getElementsByName(choice_id);
    var selectedans = -1;
    var flag = 0;
    for (i = 0; i < choices.length; ++i) {
        if (choices[i].checked) {
            selectedans = choices[i].value;
            flag = 1;
        }
    }
    if (selectedans == ans[q_no]) {
        correct++;
    }
    if (flag == 1) {
        q_no++;
        rawData();
    }
}