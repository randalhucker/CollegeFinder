var concatinatedStateIDs, display, budget, data, inStateTuition, mydict, outStateTuition, pageNum, per_page, resp, state, stateNumbers, tempState, totalColleges, totalPages, url_endpoint; 
budget = 0;

// // Initialize Variables
// var closePopup = document.getElementById("popupclose");
// var overlay = document.getElementById("overlay");
// var popup = document.getElementById("popup");
// var button = document.getElementById("button");
// // Close Popup Event
// closePopup.onclick = function() {
//   overlay.style.display = 'none';
//   popup.style.display = 'none';
// };
// // Show Overlay and Popup
// button.onclick = function() {
//   overlay.style.display = 'block';
//   popup.style.display = 'block';
// }

var displayMeBudget = function() {
    budget = document.getElementById('budget_id').value
    // if (budget_id != ''){
    //   document.getElementById("budgetmessage").innerHTML = budget
    // }
    display();
}

var display = function() {
    var state = document.getElementById('state_id').value.toUpperCase()
    // if (state_id != ''){
    //   document.getElementById("message").innerHTML = state
    // }

    const filteredStates = stateNumbers.filter(stateNumber => stateNumber.name === state); 
    // for (let k = 0; k < filteredStates.length ; k++)       TO BE ADDED
    //     concatinatedStateIDs += filteredStates[k].id + ",";

    pageNum = 1;

    mydict = {
        "api_key": "Qga67ZNRevDYZzo2cB0P3IdhArjE00eXKoTaCE9S",
        "page": pageNum,
        "school.state_fips": filteredStates[0] ? filteredStates[0].id : 1,
    };

    $.ajax({
    url: "https://api.data.gov/ed/collegescorecard/v1/schools",
    type: "get", //send it through get method
    data: mydict,
    success: function(httpResponse) {
        data = httpResponse;
        totalColleges = data["metadata"]["total"];
        per_page = data["metadata"]["per_page"];
        totalPages = Math.ceil(totalColleges / per_page);
        //console.log(totalPages)

        console.log(data["results"]);
        // school in data["results"]

        document.getElementById("testTextId").innerHTML = "<br><br><br><br><br>";

        for (let i = 1; i < totalPages + 1; i++){
            //document.getElementById("demo").innerHTML = "Here Is Your List Of colleges";d
            //document.write("<br>")

            pageNum = i
            for (let i = 0; i < data["results"].length; i++){ 
                school = data["results"][i];
                //console.log(school)
                inStateTuition = school["latest"]["cost"]["tuition"]["in_state"]
                outStateTuition = school["latest"]["cost"]["tuition"]["out_of_state"]
                programYear = school["latest"]["cost"]["tuition"]["program_year"]
                overallPrice = school["latest"]["cost"]["avg_net_price"]["overall"]


                // Check for empty tuition values
                if (inStateTuition == null){
                    inStateTuition = 0
                }
                if(outStateTuition == null){
                    outStateTuition = 0
                }

                console.log(budget);
                
                isFinancialAvailable = true;
                
                if (inStateTuition < budget && outStateTuition < budget && programYear < budget && overallPrice < budget){
                    document.getElementById("testTextId").innerHTML = document.getElementById("testTextId").innerHTML + "<b>Name:</b> " + school["latest"]["school"]["name"] + "<br>";
                    if (school["latest"]["cost"]["tuition"]["in_state"] != null){
                        document.getElementById("testTextId").innerHTML = document.getElementById("testTextId").innerHTML + "<b>In-State Tuition:</b> $" + inStateTuition + "<br>";
                        isFinancialAvailable = false;
                    }
                    if(school["latest"]["cost"]["tuition"]["out_of_state"] != null){
                        document.getElementById("testTextId").innerHTML = document.getElementById("testTextId").innerHTML + "<b>Out of State Tuition:</b> $" + outStateTuition + "<br>";
                        isFinancialAvailable = false;
                    }
                    if(school["latest"]["cost"]["tuition"]["program_year"] != null){
                        document.getElementById("testTextId").innerHTML = document.getElementById("testTextId").innerHTML + "<b>Program Year Cost:</b> $" + programYear + "<br>";
                        isFinancialAvailable = false;
                    }
                    if(isFinancialAvailable){
                        document.getElementById("testTextId").innerHTML = document.getElementById("testTextId").innerHTML + "Tuition Information Not Available" + "<br>";
                    }
                    document.getElementById("testTextId").innerHTML = document.getElementById("testTextId").innerHTML + "<br>";                   
                }        
            }
        }
    },
    error: function(xhr) {
        console.log(xhr)
        // ERROR DO MORE
    }
    });
}

stateNumbers = [
    { name: "ALABAMA", id: 1 },
    { name: "ALASKA", id: 2 },
    { name: "ARIZONA", id: 4 },
    { name: "ARKANSAS", id: 5 },
    { name: "CALIFORNIA", id: 6 },
    { name: "COLORADO", id: 8 },
    { name: "CONNETICUT", id: 9 },
    { name: "DELAWARE", id: 10 },
    { name: "DISTRICT OF COLOMBIA", id: 11 },
    { name: "FLORIDA", id: 12 },
    { name: "GEORGIA", id: 13 },
    { name: "HAWAII", id: 15 },
    { name: "IDAHO", id: 16 },
    { name: "ILLINOIS", id: 17 },
    { name: "INDIANA", id: 18 },
    { name: "IOWA", id: 19 },
    { name: "KANSAS", id: 20 },
    { name: "KENTUCKY", id: 21 },
    { name: "LOUISIANA", id: 22 },
    { name: "MAINE", id: 23 },
    { name: "MARYLAND", id: 24 },
    { name: "MASSACHUSETTS", id: 25 },
    { name: "MICHIGAN", id: 26 },
    { name: "MINNESOTA", id: 27 },
    { name: "MISSISSIPPI", id: 28 },
    { name: "MISSOURI", id: 29 },
    { name: "MONTANA", id: 30 },
    { name: "NEBRASKA", id: 31 },
    { name: "NEVADA", id: 32 },
    { name: "NEW HAMPSHIRE", id: 33 },
    { name: "NEW JERSEY", id: 34 },
    { name: "NEW MEXICO", id: 35 },
    { name: "NEW YORK", id: 36 },
    { name: "NORTH CAROLINA", id: 37 },
    { name: "NORTH DAKOTA", id: 38 },
    { name: "OHIO", id: 39 },
    { name: "OKLAHOMA", id: 40 },
    { name: "OREGON", id: 41 },
    { name: "PENNSYLVANIA", id: 42 },
    { name: "RHOAD ISLAND", id: 44 },
    { name: "SCOUT CAROLINA", id: 45 },
    { name: "SOUTH DAKOTA", id: 46 },
    { name: "TENNESSEE", id: 47 },
    { name: "TEXAS", id: 48 },
    { name: "UTAH", id: 49 },
    { name: "VERMOT", id: 50 },
    { name: "VIRGINIA", id: 51 },
    { name: "WASHINGTON", id: 53 },
    { name: "WEST VIRGINA", id: 54 },
    { name: "WISCONSIN", id: 55 },
    { name: "WYOMING", id: 56 },
    { name: "AMERICAN_SAMOA", id: 60 },
    { name: "FEDERATED STATES OF MICRONESIA", id: 64 },
    { name: "GUAM", id: 66 },
    { name: "NORTHERN MARIANA ISLAND", id: 69 },
    { name: "PALAU", id: 70 },
    { name: "PUERTO RICE", id: 72 },
    { name: "VIRGIN ISLANDS", id: 78 }
]
