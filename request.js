const axios = require("axios");
const user = require("readline-sync")
const url = 'http://saral.navgurukul.org/api/courses'

axios.get(url)
.then(response => {
    const data = (response.data);
    for (let name in data["availableCourses"]){
        console.log(parseInt(name)+1,data["availableCourses"][name]["name"], data["availableCourses"][name]['id'])
    }
    var topic = parseInt(user.question("Enter the topic number: "))
    console.log(data["availableCourses"][topic-1]["name"], data["availableCourses"][topic-1]['id'])

    const parents_url = "http://saral.navgurukul.org/api/courses/"+(data["availableCourses"][topic-1]["id"])+"/exercises"
    axios.get(parents_url)
    .then(response => {
        var parent_data = (response.data);
        var serial_number = 1
        for ( parents in parent_data["data"]){
            if (parent_data['data'][parents]["childExercises"].length==0){
                console.log("    ",serial_number,".",parent_data['data'][parents]["name"])
                console.log("           1.",parent_data['data'][parents]["slug"])
                serial_number++
            }else{
                serial_no = 1
                console.log("    ",serial_number,".",parent_data['data'][parents]["name"])
                for (child in parent_data['data'][parents]["childExercises"]){
                    console.log("          ",serial_no,".", parent_data['data'][parents]['childExercises'][child]['name'])
                    serial_no++
                }
                serial_number++
            }
        }
        var topic_number =user.question("Enter the parent topic number: ")
        console.log("    ",topic_number,".",parent_data['data'][topic_number-1]["name"])
        serial_no = 1
        for (child in parent_data['data'][topic_number-1]["childExercises"]){
            console.log("          ",serial_no,".", parent_data['data'][topic_number-1]['childExercises'][child]['name'])
            serial_no++
        }
        question = user.question("Enter the question number: ")

        slug=parent_data['data'][topic_number-1]['childExercises'][question-1]['slug']
        id=data["availableCourses"][topic-1]['id']
        question_url = 'http://saral.navgurukul.org/api/courses/'+id+'/exercise/getBySlug?slug='+slug
        axios.get(question_url)
        .then(response => {
            var question_data = (response.data);
            console.log(question_data["content"])
        }).catch(error => {
            console.log(error)
        });

    }).catch(error => {
        console.log(error)
    });

}).catch(error => {
    console.log(error)
});

