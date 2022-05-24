var userID;

firebase.database().ref('users/').on('value', (snapData) => {
    userID = snapData.numChildren()
  })

setTimeout(() => {
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
}, 2500)

setTimeout(() => {
    e.target.submit();
}, 2500)
