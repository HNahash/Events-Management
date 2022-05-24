var keyoo;
// Display Event in Home Page
function DisplayClubs(){
    firebase.database().ref('/users').on('value',
    function (snapshotk){
        snapshotk.forEach(
            function(currentSnap){
                var key = currentSnap.key;
                var Fname = currentSnap.val().userFullName;
                var Lname = currentSnap.val().userSurname;
                var type = currentSnap.val().userType;
                var email = currentSnap.val().userEmail;
                var bio = currentSnap.val().userBio;
                if(type=="event holder"){
                addItemToPage(key, Fname, Lname, email, bio);
                }
            }
        );
    });
}

function addItemToPage(key, Fname, Lname, email, bio){
    var row = document.getElementById('row');
    var col = document.createElement('column');
    var td1 = document.createElement('h4');
    var td2 = document.createElement('H4');
    var bott = document.createElement('a');

    row.id="row";
    row.style.cssText= 'margin-top: 50px;display: inline-table;justify-content: center;overflow:flex';
    
    col.id="col";
    col.style.cssText='float: left;width: 400px; margin-bottom: 100px';


    bott.id= key;
    bott.style.cssText='background: #4FDE77;border-radius: 100%;box-sizing: border-box;color: #FFFFFF;cursor: pointer;font-family: Inter;font-size: 16px;font-weight: 700;line-height: 24px;opacity: 1;outline: 0 solid transparent;padding: 8px 18px;user-select: none;-webkit-user-select: none;touch-action: manipulation;width: fit-content;word-break: break-word;border: 0;display: block;margin: auto;';


        bott.onclick = function fum(){
            keyoo= event.target.id;
            document.getElementById(event.target.id).href = "../pages/EventHolderV.html?keyoo=" + keyoo+"&Fname="+ Fname+"&Lname="+ Lname+"&email="+email+"&bio="+bio;
            DisplayEventHolder();
   }

    td1.innerHTML= "Email: "+ email;
    td2.innerHTML= "Name: "+Fname +" "+Lname;
    bott.innerHTML= "Club Page";

 
    col.appendChild(td2); 
    col.appendChild(td1);
    col.appendChild(bott);
    row.appendChild(col);

}


//Display EventHolder Events in His Profile from Visitor side
function DisplayEventHolder(){

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('keyoo');
    const email= urlParams.get('email');
    const Fname = urlParams.get('Fname');
    const Lname= urlParams.get('Lname');
    const bio =  urlParams.get('bio');
    setTimeout(() =>{
        const Fullname= Fname+" "+ Lname;
        document.getElementById("profile-name").innerHTML = "Name: "+ Fullname;;
        document.getElementById("Holder-email").innerHTML = "Email: "+ email;
        document.getElementById("Holder-bio").innerHTML = bio;
        firebase.database().ref('events-EventHolder/'+id).on('value',
        function (snapshot){
            snapshot.forEach(
                function(currentSnap){
                    var HolderEventsID = currentSnap.val().events;    
                    addItems(id, HolderEventsID, Fullname, email, bio);
                }
            );
        }); 
    }, 200)
}

function addItems(userID, HolderEventsID, Fullname, email, bio){

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

        }, 1000)        
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

