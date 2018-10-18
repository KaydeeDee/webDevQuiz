// holds both question difficulty tracks
let questionTracks = {
    easy: [
        {
            question: 'EASY: testing first question',
            answers: [
                'EASY: testing first answer',
                'ANSWER EASY: testing first answer',
                'EASY: testing first answer'
            ],
            correctAnswer: 'ANSWER EASY: testing first answer'
        },
        {
            question: 'EASY: testing second question',
            answers: [
                'ANSWER EASY: testing second answer',
                'EASY: testing second answer',
                'EASY: testing second answer'
            ],
            correctAnswer: 'ANSWER EASY: testing second answer'
        }
    ],

    hard: [
        {
            question: 'HARD: testing first question',
            answers: [
                'HARD: testing first answer',
                'ANSWER HARD: testing first answer',
                'HARD: testing first answer'
            ],
            correctAnswer: 'ANSWER HARD: testing first answer'
        },
        {
            question: 'HARD: testing second question',
            answers: [
                'ANSWER HARD: testing second answer',
                'HARD: testing second answer',
                'HARD: testing second answer'
            ],
            correctAnswer: 'ANSWER HARD: testing second answer'
        }
    ]
};

// helper functions start

    // random number generator
    const getRandomNumber = (number) => {
        return Math.floor(Math.random() * number);
    }

// helper functions end

// get information from track form and form validation
const trackFormSubmit = (e) => {
    e.preventDefault();

    const userTrackChoice = $('input[name=chooseTrack]:checked').val();

    if (!userTrackChoice) {
        alert('please check something');
    } else {
        const chosenTrackArray = questionTracks[userTrackChoice];
        pullQuestionChoices(chosenTrackArray)
        $('#chooseTrackFrom').hide();
    }
};

// based off of user track choice pull q + as from that given track
const pullQuestionChoices = (userChoice) => {

    // randomize the questions outputting
    const randomNumberForQuestionOrder = getRandomNumber(userChoice.length);

    const singleQuestionGroup = userChoice[randomNumberForQuestionOrder];

    const questionToDisplay = singleQuestionGroup.question;

    const answersToDisplay = singleQuestionGroup.answers;

    const correctAnswer = singleQuestionGroup.correctAnswer;

    displayToPage(questionToDisplay, answersToDisplay, correctAnswer, userChoice, randomNumberForQuestionOrder);
}

const displayToPage = (question, answers, correctA, userChoice, randomNumberForQuestionOrder) => {

    const answerIndv = answers.map((indvAnswer, index) => {
        return `<label for="${index}">${indvAnswer}</label>
        <input type="radio" value="${indvAnswer}" name="answer" id=${index}>`
    });

    $('body').html(`
    <p> ${question} </p>
    <form action="#" class="answers" id="answers">
        <div>${answerIndv}</div>
        <div id="buttonTesting"></div>
        <input type="submit" value="submit" id="testing">
    </form>` );


    // $('#question').html(`<p> ${question} </p>`);

    // $('#answersContainer').html(answerIndv);

    // $('#buttonTesting').html(`<input type="submit" value="submit" id="testing"></input>`);

    $('#answers').on('submit', function (e) {
        e.preventDefault();

        const userAnswer = $('input[name=answer]:checked').val();

        console.log(userAnswer);

        console.log(`correct answer: ${correctA}`);

        if (userAnswer === correctA) {
            alert('you did it!');
            removeAskedQuestions(userChoice, randomNumberForQuestionOrder);
        } else {
            alert('oh no, try again');
        }

    });
}

// const answerSubmit = (correctA, userChoice) => {

//     $('#answers').on('submit', function(e) {
//         e.preventDefault();

//         const userAnswer = $('input[name=answer]:checked').val();

//         console.log(userAnswer);

//         console.log(`correct answer: ${correctA}`);

//         if (userAnswer === correctA) {
//             alert('you did it!');
//             checkArrayLength(userChoice);
//         } else {
//             alert('oh no, try again');
//         }

//     });
// }

const removeAskedQuestions = (userChoice, randomNumberForQuestionOrder) => {

    // create new array to avoid mutating original array
    const trackSpecificArray = [...userChoice];

    // remove question that was just displayed to avoid repetition
    const filteredQuestions = trackSpecificArray.filter((questions, index) => {
        if (index !== randomNumberForQuestionOrder) {
            return true;
        }
    });

    console.log(filteredQuestions);

    checkArrayLength(filteredQuestions);

}


// check to see how many questions there are left
const checkArrayLength = (array) => {
    if (array.length > 0) {
        pullQuestionChoices(array);
    } else {
        alert('no more questions left');
    }
}




$(function() {
    // console.log('ready');
    $('#chooseTrackFrom').on('submit', trackFormSubmit);
});