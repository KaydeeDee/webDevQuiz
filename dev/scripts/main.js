// holds both question difficulty tracks
let questionTracks = {
    easy: [
        {
            question: 'What do a span and a div have in common?',
            answers: [
                'They are both block elements',
                'They are both non-semantic elements',
                'They have nothing in common!'
            ],
            correctAnswer: 'They are both non-semantic elements'
        },
        {
            question: 'Which of the following is considered an obsolete element?',
            answers: [
                `b`,
                `em`,
                `strong`
            ],
            correctAnswer: `b`
        },
        {
            question: 'Which semantic element represents the navigation?',
            answers: [
                `footer`,
                `main`,
                `nav`
            ],
            correctAnswer: `nav`
        },
        {
            question: 'Which file can be used to write CSS from the given options?',
            answers: [
                `website.css`,
                `website.js`,
                `website.html`
            ],
            correctAnswer: `website.css`
        },
        {
            question: 'What HTML tag is used to create a numbered list?',
            answers: [
                `list`,
                `ol`,
                `ul`
            ],
            correctAnswer: `ol`
        },
        {
            question: 'Which of the following is an invalid background-color porperty?',
            answers: [
                `blue`,
                `rgba(288,72, 18, 0.3)`,
                `81`
            ],
            correctAnswer: `81`
        }
    ],

    hard: [
        {
            question: 'Which of the follow gives the top-right border a border radius of 6px?',
            answers: [
                'border-radius: 6px 10px 2px 8px',
                'border-radius: 20px 6px 4px 16px',
                'border-radius: 9px 14px 2px 6px'
            ],
            correctAnswer: 'border-radius: 20px 6px 4px 16px'
        },
        {
            question: 'Which is better to use when laying out your applications?',
            answers: [
                'Flexbox',
                'CSSGrid',
                'Neither - they both have their use cases'
            ],
            correctAnswer: 'Neither - they both have their use cases'
        },
        {
            question: 'what do cows do?',
            answers: [
                'moo',
                'dark',
                'meow'
            ],
            correctAnswer: 'moo'
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
        return `<div>
        <input type="radio" value="${indvAnswer}" name="answer" id=${index}><label for="${index}">${indvAnswer}</label></div>`
    });

    $('body').html(`
    <p class="question"> ${question} </p>
    <form action="#" class="answers" id="answers">
        ${answerIndv}
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

// end of quiz, tally count for correct responses
const trackCompleted = (tally) => {
    alert('you\'re all done!');
    console.log(tally);
}


$(function() {
    // console.log('ready');
    $('#chooseTrackFrom').on('submit', trackFormSubmit);
});