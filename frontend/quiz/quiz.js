import {questionPool, renderHeaderFooter, renderQuestions} from "../utils.mjs";

renderHeaderFooter();

// if (false){
renderQuestions();
// }


// submit handler on form (use the formData like in sleepoutside)


document.forms["quiz"].addEventListener("submit", (e) => {
    e.preventDefault();
    // e.target would contain our form in this case
    var formStuff = formDataToJSON(e.target);
    checkQuestions(formStuff);

});


function formDataToJSON(formElement) {
    const formData = new FormData(formElement),
        convertedJSON = {};

    formData.forEach(function (value, key) {
        convertedJSON[key] = value;
    });

    return convertedJSON;
}

let correct = 0;
function checkQuestions(formData) {
    let t = 0;
    for (let answer in formData) {

        if (questionPool[t].correctAnswer === formData[answer]) {
            correct += 1;
        } else {
            console.log("wrong");
        }
        t += 1;
    }
    alert(`Congrats you got ${correct} / 10!`);
    // window.location.href = '/'; // Redirect to homepage
}

// prevent default
// look into for of or for in loops (for objects)
// review checkout stuff for the sleep outside


// Send quiz scores on submit

async function sendQuizScores(quizScore) {
    const response = await fetch("http://localhost:6969/api/quiz", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({currentScore: quizScore}),
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Could not send quiz scores");
    }

    console.log(response);
    const userQuizScores = await response.json();
    console.log(userQuizScores);
}

document.querySelector("#quizSubmit").addEventListener("click", () => {
    sendQuizScores(correct)
})