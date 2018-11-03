//this application is not responsive yet, but will be in the future! I'm in the process of adding more quesiton to each track, so this isn't complete yet, but the logic is all there for the app to run!

// holds both question difficulty tracks
let questionTracks = {
    easy: [
        {
            question: 'What do a span and a div have in common?',
            answers: [
                '1) They are both block elements',
                '2) They are both non-semantic elements',
                '3) They have nothing in common!'
            ],
            correctAnswer: '2) They are both non-semantic elements'
        },
        {
            question: 'Which of the following is considered an obsolete element?',
            answers: [
                `<xmp>1) <b></xmp>`,
                `<xmp>2) <em></xmp>`,
                `<xmp>3) <strong></xmp>`
            ],
            correctAnswer: `<xmp>1) <b></xmp>`
        },
        {
            question: 'Which semantic element represents the navigation?',
            answers: [
                `<xmp>1) <footer></xmp>`,
                `<xmp>2) <main></xmp>`,
                `<xmp>3) <nav></xmp>`
            ],
            correctAnswer: `<xmp>3) <nav></xmp>`
        },
        {
            question: 'Which file can be used to write CSS from the given options?',
            answers: [
                `1) website.css`,
                `2) website.js`,
                `3) website.html`
            ],
            correctAnswer: `1) website.css`
        },
        {
            question: 'What HTML element is used to create a numbered list?',
            answers: [
                `1) list`,
                `2) ol`,
                `3) ul`
            ],
            correctAnswer: `2) ol`
        },
        {
            question: 'Which of the following is an invalid background-color porperty?',
            answers: [
                `1) blue`,
                `2) rgba(288,72,18,0.3)`,
                `3) 81`
            ],
            correctAnswer: `3) 81`
        }
    ],

    hard: [
        {
            question: 'Which of the follow gives the top-right border a border radius of 6px?',
            answers: [
                '1) border-radius: 6px 10px 2px 8px',
                '2) border-radius: 20px 6px 4px 16px',
                '3) border-radius: 9px 14px 2px 6px'
            ],
            correctAnswer: '2) border-radius: 20px 6px 4px 16px'
        },
        {
            question: 'Which is better to use when laying out your applications?',
            answers: [
                '1) Flexbox',
                '2) CSSGrid',
                '3) Neither - they both have their use cases'
            ],
            correctAnswer: '3) Neither - they both have their use cases'
        },
        {
            question: 'What\'s the difference between .map and .forEach?',
            answers: [
                '1) They\'re exactly the same',
                '2) One returns a new array, the other does not',
                '3) Who knows, JavaScript is wild'
            ],
            correctAnswer: '2) One returns a new array, the other does not'
        },
        {
            question: 'When should :focus be applied to an element?',
            answers: [
                '1) Whenever an element gets a hover effect',
                '2) It\'s largely unnecessary and can be removed',
                '3) None of the above'
            ],
            correctAnswer: '1) Whenever an element gets a hover effect'
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
        createNewArray(chosenTrackArray);
        $('#chooseTrack').hide();
        $('#questionsOnTrack').show();
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
        return `<div class="indvQuestion">
        <input type="radio" value="${indvAnswer}" name="answer" id=${index}><label for="${index}" tabindex="0" name="answer">${indvAnswer}</label></div>`;
    }).join(' ');

    $('.questionsOnTrack').html(`
    <h2 class="question"> ${question} </h2>
    <form action="#" class="answers" id="answers">
        <div>
            ${answerIndv}
        </div>
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
            removeAskedQuestions(userChoice, randomNumberForQuestionOrder, tallyCorrect);
        } else if (!userAnswer) {
            alert('Please choose an answer!');
        } else {
            alert('oh no, you didn\'t get this one right!');
            removeAskedQuestions(userChoice, randomNumberForQuestionOrder, tallyCorrect);
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

// end of quiz, tally count for correct responses
const trackCompleted = (tally) => {
    $('#questionsOnTrack').hide();
    $('#finalScreen').show();
    $('#finalTally').html(`You got ${tally} questions correct! WOOHOO!`);
}


$(function() {
    $('#chooseTrackFrom').on('submit', trackFormSubmit);
});