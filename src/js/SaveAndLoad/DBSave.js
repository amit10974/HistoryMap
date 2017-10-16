// DB SAVE Document
// Made by Reday Yahya | @RedayY
// Functions for Saving are found in this document

function pushSessToDB() {
    var url = "http://sensemap-api.herokuapp.com/" + "session/" + UserEmail + APIKey;
    var data = {};
    data.sessionname = SessionName;
    var json = JSON.stringify(data);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.onload = function () {
        var users = JSON.parse(xhr.responseText);
        if (xhr.readyState == 4 && xhr.status == "201") {} else {
            //debug
            console.error(users);
            var indexNo = users["sessions"].length - 1;
            DBSessionPointer = users["sessions"][indexNo]._id;
            UserProfile = users["sessions"];
            SessionCount = users["sessions"].length - 1;
        }
    }
    xhr.send(json);
}

function add_user_to_db() {
    //Creating the Object for the DB
    hello('google').api('me').then(function (up) {

        var new_stuff = {
            "name": up.name,
            "emailAddress": up.email,
            "addtionalinfo": JSON.stringify(Object.values(up)),
        };

        // Adding the User to the DB
        var url = baseURL + "users" + APIKey;
        var json = JSON.stringify(new_stuff);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.onload = function () {
            var users = JSON.parse(xhr.responseText);
        }
        xhr.send(json);
    })
}

function pushToDB() {

    //Creating the Object for the DB
    hello('google').api('me').then(function (up) {

        var UserProfileObject = {
            "name": up.name,
            "emailAddress": up.email,
            "addtionalinfo": Object.values(up)
        };

        //Crucial Bit that Adds the User to the DB, if the user has something on the DB, do not add at all cost.
        //Code is based on Shaz example

        //check if email is in db
        var url = baseURL + "userbyemail/" + up.email + APIKey;
        var xhr = new XMLHttpRequest()
        xhr.open('GET', url, true)
        xhr.onload = function () {
            var users = JSON.parse(xhr.responseText);
            if (xhr.readyState == 4 && xhr.status == "200") {
                if (users.length == 0) {
                    add_user_to_db();
                }
            } else {
                console.log("Could not perform action")
            }
        }
        xhr.send(null);
    })
}

function Node2DB(node) {

    if (AccLoggedIn == true && UserRecord == true) {

        node.visibility = false;

        var url = baseURL + "node/" + DBSessionPointer + APIKey;
        var json = JSON.stringify(node);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.onload = function () {
            var users = JSON.parse(xhr.responseText);
        }
        xhr.send(json);
    } else {

        if (AccLoggedIn == true && UserRecord == false) {
            node.visibility = true;
            var url = baseURL + "node/" + DBSessionPointer + APIKey;
            var json = JSON.stringify(node);
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            xhr.onload = function () {
                var users = JSON.parse(xhr.responseText);
            }
            xhr.send(json);
        }
        //debug
        console.log("did not add node");
    }

    return node;
}