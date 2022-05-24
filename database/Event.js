var keyoo;
// Display Event in Home Page
function DisplayEvents(){
    firebase.database().ref('/events').on('value',
    function (snapshotk){
        snapshotk.forEach(
            function(currentSnap){
                var key = currentSnap.key;
                var name = currentSnap.val().name;
                var attendanceType = currentSnap.val().attendance_type;
                var gender = currentSnap.val().gender;
                var location = currentSnap.val().location;
                var time = currentSnap.val().time;
                var date = currentSnap.val().date;
                var img = currentSnap.val().img;
                addItemToTable(name, gender, location, attendanceType, time, date, img, key);
            }
        );
    });
}

function addItemToTable(name, gender, location, attendanceType, time, date, img, key){
    var row = document.getElementById('row');
    var col = document.createElement('column');
    var imgo = document.createElement('img');
    var td1 = document.createElement('p');
    var td2 = document.createElement('H4');
    var details = document.createElement('div');
    var td3 = document.createElement('li');
    var td4 = document.createElement('li');
    var td5 = document.createElement('li');
    var bott = document.createElement('a');

    row.id="row";
    row.style.cssText= 'margin-top: 50px;display: inline-table;justify-content: center;overflow:flex';
    
    
    imgo.src= img;
    col.id="col";
    col.style.cssText='float: left;width: 400px; margin-bottom: 100px';
    
    details.id="div";
    details.style.cssText='background-color: #F9F4F4;padding: 15px;';

    bott.id= key;
    bott.style.cssText='background: #4FDE77;border-radius: 100%;box-sizing: border-box;color: #FFFFFF;cursor: pointer;font-family: Inter;font-size: 16px;font-weight: 700;line-height: 24px;opacity: 1;outline: 0 solid transparent;padding: 8px 18px;user-select: none;-webkit-user-select: none;touch-action: manipulation;width: fit-content;word-break: break-word;border: 0;display: block;margin: auto;';


        bott.onclick = function fum(){
            var keyoo= event.target.id;
            document.getElementById(event.target.id).href = "../pages/EventDescPage.html?keyoo=" + keyoo;
            DisplayEventDesc();
   }

    td1.innerHTML= attendanceType +", "+ gender;
    td2.innerHTML= "Name: "+name;
    td3.innerHTML= "Date: "+date;
    td4.innerHTML= "Time: "+time;
    td5.innerHTML= "Location: "+location;
    bott.innerHTML= "More Details";

    details.appendChild(td3);
    details.appendChild(td4); 
    details.appendChild(td5);

    col.appendChild(imgo);
    col.appendChild(td1); 
    col.appendChild(td2); 
    col.appendChild(details);
    col.appendChild(bott);
    row.appendChild(col);

}


// Display Event Details in Event Page
function DisplayEventDesc(){
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

