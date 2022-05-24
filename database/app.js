// xxxxxxxxxx Sign Up Form xxxxxxxxxx
// xxxxxxxxxx Full Name Validation xxxxxxxxxx
function checkUserFullName(){
    var userSurname = document.getElementById("userFullName").value;
    var flag = false;
    if(userSurname === ""){
        flag = true;
    }
    if(flag){
        document.getElementById("userFullNameError").style.display = "block";
    }else{
        document.getElementById("userFullNameError").style.display = "none";
    }
}
// xxxxxxxxxx User Surname Validation xxxxxxxxxx
function checkUserSurname(){
    var userSurname = document.getElementById("userSurname").value;
    var flag = false;
    if(userSurname === ""){
        flag = true;
    }
    if(flag){
        document.getElementById("userSurnameError").style.display = "block";
    }else{
        document.getElementById("userSurnameError").style.display = "none";
    }
}
// xxxxxxxxxx Email Validation xxxxxxxxxx
function checkUserEmail(){
    var userEmail = document.getElementById("userEmail");
    var userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var flag;
    if(userEmail.value.match(userEmailFormate)){
        flag = false;
    }else{
        flag = true;
    }
    if(flag){
        document.getElementById("userEmailError").style.display = "block";
    }else{
        document.getElementById("userEmailError").style.display = "none";
    }
}
// xxxxxxxxxx Password Validation xxxxxxxxxx
function checkUserPassword(){
    var userPassword = document.getElementById("userPassword");
    var userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      
    var flag;
    if(userPassword.value.match(userPasswordFormate)){
        flag = false;
    }else{
        flag = true;
    }    
    if(flag){
        document.getElementById("userPasswordError").style.display = "block";
    }else{
        document.getElementById("userPasswordError").style.display = "none";
    }
}
// xxxxxxxxxx Check user bio characters. It'll use later xxxxxxxxxx
function checkUserBio(){
    var userBio = document.getElementById("userBio").value;
    var flag = false;
    if(flag){
        document.getElementById("userBioError").style.display = "block";
    }else{
        document.getElementById("userBioError").style.display = "none";
    }
}
// xxxxxxxxxx Submitting and Creating new user in firebase authentication xxxxxxxxxx
function signUp(){
    var userFullName = document.getElementById("userFullName").value;
    var userSurname = document.getElementById("userSurname").value;
    var userEmail = document.getElementById("userEmail").value;
    var userPassword = document.getElementById("userPassword").value;
    var Usertype = document.getElementById("Usertype").value;
    var Gender = document.getElementById("Gender").value;
    var Brief = document.getElementById("Brief").value;
    var userFullNameFormate = /^([A-Za-z.\s_-])/;    
    var userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      

    var checkUserFullNameValid = userFullName.match(userFullNameFormate);
    var checkUserEmailValid = userEmail.match(userEmailFormate);
    var checkUserPasswordValid = userPassword.match(userPasswordFormate);

    if(checkUserFullNameValid == null){
        return checkUserFullName();
    }else if(userSurname === ""){
        return checkUserSurname();
    }else if(checkUserEmailValid == null){
        return checkUserEmail();
    }else if(checkUserPasswordValid == null){
        return checkUserPassword();
    }else{
        firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).then((success) => {
            var user = firebase.auth().currentUser;
            var uid;
            if (user != null) {
                uid = user.uid;
            }
            var firebaseRef = firebase.database().ref('/users');
            var userData = {
                userFullName: userFullName,
                userSurname: userSurname,
                userEmail: userEmail,
                userPassword: userPassword,
                userBio: " "+ Brief,
                userType: Usertype,
                gender: Gender,
                registeredEvents: ""
            }
            firebaseRef.child(uid).set(userData);
            alert('Your Account Created')
            setTimeout(function(){
                window.location.replace("../pages/loginpage.html");
            }, 1000)
        });
    }
}
// xxxxxxxxxx Sign In Form xxxxxxxxxx
// xxxxxxxxxx Sign In Email Validation xxxxxxxxxx
function checkUserSIEmail(){
    var userSIEmail = document.getElementById("userSIEmail");
    var userSIEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var flag;
    if(userSIEmail.value.match(userSIEmailFormate)){
        flag = false;
    }else{
        flag = true;
    }
    if(flag){
        document.getElementById("userSIEmailError").style.display = "block";
    }else{
        document.getElementById("userSIEmailError").style.display = "none";
    }
}
// xxxxxxxxxx Sign In Password Validation xxxxxxxxxx
function checkUserSIPassword(){
    var userSIPassword = document.getElementById("userSIPassword");
    var userSIPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      
    var flag;
    if(userSIPassword.value.match(userSIPasswordFormate)){
        flag = false;
    }else{
        flag = true;
    }    
    if(flag){
        document.getElementById("userSIPasswordError").style.display = "block";
    }else{
        document.getElementById("userSIPasswordError").style.display = "none";
    }
}
// xxxxxxxxxx Check if email or password exsist in firebase authentication xxxxxxxxxx    
function signIn(){
    var userSIEmail = document.getElementById("userSIEmail").value;
    var userSIPassword = document.getElementById("userSIPassword").value;
    var userSIEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var userSIPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      

    var checkUserEmailValid = userSIEmail.match(userSIEmailFormate);
    var checkUserPasswordValid = userSIPassword.match(userSIPasswordFormate);

    if(checkUserEmailValid == null){
        return checkUserSIEmail();
    }else if(checkUserPasswordValid == null){
        return checkUserSIPassword();
    }else{
        firebase.auth().signInWithEmailAndPassword(userSIEmail, userSIPassword).then(function(success) {
            alert("You have been logged in!!")
            setTimeout(function(){
                window.location.replace("../pages/Homepage.html");
            }, 1000)
            return;
        }).catch(function (error) {
            alert("Your password or email in inccorect")
            return;
        });
    }
}

var eventid_holder, userID;
// xxxxxxxxxx Get data from server and show in the page xxxxxxxxxx
firebase.auth().onAuthStateChanged((user)=>{
    if (user){
    //   User is signed in.
        let user = firebase.auth().currentUser;
        var uid;
        if(user != null){
            uid = user.uid;
        }
        userID = uid;
        let firebaseRefKey = firebase.database().ref('/users').child(uid);
        firebaseRefKey.on('value', (dataSnapShot)=>{
        // Display info from database in pages
        
        let type = dataSnapShot.val().userType;
        setTimeout(function(){
            if (type == "user") {
                document.getElementById("p-name").innerHTML = "Name: "+ dataSnapShot.val().userFullName + " " + dataSnapShot.val().userSurname;
                document.getElementById("p-gender").innerHTML = "Gender: "+ dataSnapShot.val().gender;
                document.getElementById("p-email").innerHTML = "Email: "+ dataSnapShot.val().userEmail;
            } else {
                document.getElementById("pro-name").innerHTML = "Name: "+ dataSnapShot.val().userFullName + " " + dataSnapShot.val().userSurname;
                document.getElementById("Holder-gender").innerHTML = "Gender: "+ dataSnapShot.val().gender;
                document.getElementById("Holder-email").innerHTML = "Email: "+ dataSnapShot.val().userEmail;
                document.getElementById("Holder-bio").innerHTML = dataSnapShot.val().userBio;

            }
        }, 100)
            
        if (type == "user") {
            document.getElementById("profile-link").href = "../pages/visitorProfile.html";

        } else {
            document.getElementById("profile-link").href = "../pages/eventHolderProfile.html";
        }   
        })



        // Register User to Event
        document.getElementById("Regi").onclick = function() { 
            RegisterUserEvent(uid);
        }


    } else {
    //   No user is signed in.

    }
});

              // Register Events by EventHolders
              document.getElementById("event-r-form").onsubmit = function(e){ 
                e.preventDefault();
                var elements = document.getElementById("event-r-form").elements;
            var obj ={};
            var numChildren = 0;
            for(var i = 0 ; i < elements.length ; i++){
                var item = elements.item(i);
                obj[item.name] = item.value;
            }
            firebase.database().ref('events/').on('value', (snapData) => {
                numChildren = snapData.numChildren()
            })
            
            setTimeout(() => {
                eventid_holder = numChildren;
            
                firebase.database().ref('events/' + numChildren).set({
                    name: obj.name,
                    date: obj.date,
                    location: obj.location,
                    attendance_type: obj.attType,
                    speaker_name: obj.speakerName,
                    seats_num: obj.numSeats,
                    gender: obj.gender,
                    fees: obj.fees,
                    desc: obj.desc,
                    img: obj.img,
                    time: obj.time
                });
            }, 5000)
            

            setTimeout(() => {
                e.target.submit();
            }, 5000)

                // Register Event to event-EventHolder table
                var numChi=0;
                firebase.database().ref('events-EventHolder/'+userID).on('value', (snapData) => {
                    numChi = snapData.numChildren();

                })

                setTimeout(() => {
                    firebase.database().ref('events-EventHolder/'+ userID+'/'+numChi).set({
                        events:  eventid_holder
                    });
                    alert("Registration Completed! EventHolder");
                    window.location.replace("../pages/Homepage.html");
                }, 6000)   
        }
        

// xxxxxxxxxx Sign Out xxxxxxxxxx
function signOut(){
    firebase.auth().signOut().then(function() {
        alert("Successfully signed out")
        setTimeout(function(){
            window.location.replace("../pages/loginpage.html");
        }, 1000)
        return
    }).catch(function(error) {
        alert('Something went wrong')
        return
    });

}

// Button for sign out ->  <button type="button" class="form-button" onclick="signOut()">Sign Out</button>   
// also have to link ->  <link rel="stylesheet" href="../style/form.css"> 

//Register user to events
function RegisterUserEvent(userID){

    var url = window.location.href
    var matches = url.match(/\d+/g);
    var eventID = matches[matches.length - 1];
    var numChi=0;
    firebase.database().ref('events-user/'+userID).on('value', (snapData) => {
        numChi = snapData.numChildren();
    })
    setTimeout(() => {
        firebase.database().ref('events-user/'+ userID+'/'+numChi).set({
            events:  eventID
        });
        alert("Registration Completed!");
        window.location.replace("../pages/Homepage.html");
    }, 2500)

}


// Display Events in Visitor profile
function DisplayEventVisitor(){
    setTimeout(() =>{
        firebase.database().ref('events-user/'+userID).on('value',
        function (snapshot){
            snapshot.forEach(
                function(currentSnap){
                    var VisitorEventsID = currentSnap.val().events;    
                    addItems(userID, VisitorEventsID);
                }
            );
        }); 
    }, 2500)


    function addItems(userID, VisitorEventsID){

        var nameEvent, dateEvent; 

        firebase.database().ref('events/'+VisitorEventsID).on('value', (snapData0) => {
            nameEvent = snapData0.val().name;
            dateEvent = snapData0.val().date;
        })

        setTimeout(() => {

             var row1 = document.getElementById('rowVis');
             var NameEve = document.createElement('td');
             var EditEve = document.createElement('td');
             var button1 = document.createElement('a');
             var trr = document.createElement('tr');
             var tablEe = document.getElementById('TableEvent');

            
            row1.style.cssText='width: 100%;';
    
            button1.id = VisitorEventsID;
            button1.style.cssText='background: #5F906A;border-radius: 100%;box-sizing: border-box;color: #FFFFFF;cursor: pointer;font-family: Inter;font-size: 16px;font-weight: 700;line-height: 24px;opacity: 1;outline: 0 solid transparent;padding: 8px 18px;user-select: none;-webkit-user-select: none;touch-action: manipulation;width: fit-content;word-break: break-word;border: 0;display: block;margin: auto;';
            button1.onclick = function fum(){
                var keyoo= event.target.id;
                document.getElementById(event.target.id).href = "../pages/EventDescPage.html?keyoo=" + keyoo;
                DisplayEventDesc2();
            }

            NameEve.innerHTML= nameEvent;
            EditEve.innerHTML= dateEvent;
            button1.innerHTML= "Check";

            
            trr.appendChild(NameEve);
            trr.appendChild(EditEve);
            trr.appendChild(button1);

            tablEe.appendChild(trr);
            row1.appendChild(tablEe);

        },2500)        
    }
}


function DisplayEventDesc2(){
    setTimeout( function(){
        var url = window.location.href
        var matches = url.match(/\d+/g);
        var id = matches[matches.length - 1];
        let firebaseRefK = firebase.database().ref('/events').child(id);
        firebaseRefK.once('value', (dataSnapShot1)=>{  
            document.getElementById("e-brief").innerHTML = dataSnapShot1.val().desc;
            document.getElementById("e-TAG").innerHTML = dataSnapShot1.val().attendance_type;
            document.getElementById("e-name").innerHTML = "Name: "+ dataSnapShot1.val().name;
            document.getElementById("e-date").innerHTML = "Date: "+ dataSnapShot1.val().date;
            document.getElementById("e-time").innerHTML = "Time: "+ dataSnapShot1.val().time;
            document.getElementById("e-location").innerHTML = "Location: "+ dataSnapShot1.val().location;
            document.getElementById("e-gender").innerHTML = "Gender: "+ dataSnapShot1.val().gender;
            document.getElementById("e-fees").innerHTML = "Fees: "+ dataSnapShot1.val().fees;
            
        })
    }, 100)
}



//Display EventHolder Events in His Profile
function DisplayEventHolder(){
    setTimeout(() =>{

        firebase.database().ref('events-EventHolder/'+userID).on('value',
        function (snapshot){
            snapshot.forEach(
                function(currentSnap){
                    var HolderEventsID = currentSnap.val().events;    
                    addItems(userID, HolderEventsID);
                }
            );
        }); 
    }, 2500)


    function addItems(userID, HolderEventsID){

        var nameEvent, dateEvent; 

        firebase.database().ref('events/'+HolderEventsID).on('value', (snapData0) => {
            nameEvent = snapData0.val().name;
            dateEvent = snapData0.val().date;
        })

        setTimeout(() => {  
             var row1 = document.getElementById('rowHolder');
             var NameEve = document.createElement('td');
             var EditEve = document.createElement('td');
             var button1 = document.createElement('a');
             var trr = document.createElement('tr');
             var tablEe = document.getElementById('TableEventHolder');

            
            row1.style.cssText='width: 100%;';
    
            button1.id = HolderEventsID;
            button1.style.cssText='background: #5F906A;border-radius: 100%;box-sizing: border-box;color: #FFFFFF;cursor: pointer;font-family: Inter;font-size: 16px;font-weight: 700;line-height: 24px;opacity: 1;outline: 0 solid transparent;padding: 8px 18px;user-select: none;-webkit-user-select: none;touch-action: manipulation;width: fit-content;word-break: break-word;border: 0;display: block;margin: auto;';
            button1.onclick = function fum(){
                var keyoo= event.target.id;
                document.getElementById(event.target.id).href = "../pages/EventDescPage.html?keyoo=" + keyoo;
                DisplayEventDesc3();
            }

            NameEve.innerHTML= nameEvent;
            EditEve.innerHTML= dateEvent;
            button1.innerHTML= "Check";
            
            
            trr.appendChild(NameEve);
            trr.appendChild(EditEve);
            trr.appendChild(button1);

            tablEe.appendChild(trr);
            row1.appendChild(tablEe);

        },2500)        
    }
}


function DisplayEventDesc3(){
    setTimeout( function(){
        var url = window.location.href
        var matches = url.match(/\d+/g);
        var id = matches[matches.length - 1];
        let firebaseRefK = firebase.database().ref('/events').child(id);
        firebaseRefK.once('value', (dataSnapShot1)=>{  
            document.getElementById("e-brief").innerHTML = dataSnapShot1.val().desc;
            document.getElementById("e-TAG").innerHTML = dataSnapShot1.val().attendance_type;
            document.getElementById("e-name").innerHTML = "Name: "+ dataSnapShot1.val().name;
            document.getElementById("e-date").innerHTML = "Date: "+ dataSnapShot1.val().date;
            document.getElementById("e-time").innerHTML = "Time: "+ dataSnapShot1.val().time;
            document.getElementById("e-location").innerHTML = "Location: "+ dataSnapShot1.val().location;
            document.getElementById("e-gender").innerHTML = "Gender: "+ dataSnapShot1.val().gender;
            document.getElementById("e-fees").innerHTML = "Fees: "+ dataSnapShot1.val().fees;
            
        })
    }, 100)
}