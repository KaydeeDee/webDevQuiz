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

// helper functions and variables start

    // random number generator
    const getRandomNumber = (number) => {
        return Math.floor(Math.random() * number);
    }
    
    // tally count
    let tallyCorrect = 0;
// helper functions end

// get information from track form and form validation
const trackFormSubmit = (e) => {
    e.preventDefault();

    const userTrackChoice = $('input[name=chooseTrack]:checked').val();

    if (!userTrackChoice) {
        alert('please check something');
    } else {
        const chosenTrackArray = questionTracks[userTrackChoice];
        createNewArray(chosenTrackArray)
        $('#chooseTrackFrom').hide();
    }
};

// create new array to avoid mutating the original
const createNewArray = (chosenTrackArray) => {
    const trackSpecificArray = [...chosenTrackArray];

    pullQuestionChoices(trackSpecificArray)
}

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

    checkAnswer(userChoice, randomNumberForQuestionOrder, correctA);
}

const checkAnswer = (userChoice, randomNumberForQuestionOrder, correctA) => {

    $('#answers').on('submit', function (e) {
        e.preventDefault();

        const userAnswer = $('input[name=answer]:checked').val();

        if (userAnswer === correctA) {
            alert('you did it!');
            tallyCorrect = tallyCorrect + 1;
            console.log(tallyCorrect);
            removeAskedQuestions(userChoice, randomNumberForQuestionOrder, tallyCorrect);
        } else {
            alert('oh no, try again');
        }

    });

}

const removeAskedQuestions = (userChoice, randomNumberForQuestionOrder, tallyCorrect) => {

    // remove question that was just displayed to avoid repetition
    const filteredTrack = userChoice.filter((questions, index) => {
        if (index !== randomNumberForQuestionOrder) {
            return true;
        }
    });

    checkArrayLength(filteredTrack, tallyCorrect);

}


// check to see how many questions there are left
const checkArrayLength = (array, tally) => {
    if (array.length > 0) {
        pullQuestionChoices(array);
    } else {
        trackCompleted(tally);
    }
}

const trackCompleted = (tally) => {
    alert('you\'re all done!');
    console.log(tally);
}


$(function() {
    // console.log('ready');
    $('#chooseTrackFrom').on('submit', trackFormSubmit);
});