import React, { useEffect, useState, useRef } from 'react';
import styled from '@emotion/styled';
import { connect } from 'react-redux';

import FillButton from '../components/FillButton';

import { actionUpdateUser } from '../../reduxModules/user'

const ChallengeWrapper = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    padding: '0 20px'
});

const Headers = styled('div')({
    display: 'flex',
    justifyContent: 'center'
});

const Card = styled('div')({
    borderRadius: 20,
    width: 200,
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '0 20px',
    border: '1px solid #000',
    height: '100px'
});

const Quote = styled('div')({
    margin: '20px 0',
    fontSize: 20,

    '>span.incorrect':{
        backgroundColor: '#e74c3c'
    },

    '>span.correct':{
        backgroundColor: '#2ecc71'
    }
    
});

const TextArea = styled('textarea')(() => ({
    resize: 'none',
    overflow: 'auto',
    width: 'auto',
    marginBottom: 20,
    padding: 5
}));

let timer = null;
let timeRemaining;
let numCharacterTyped = 0;
let numTimeElapsed = 0;
let accuracyRes = 100;
let errorRes = 0;
let totalErrors = 0;
let numQuoteNo = 0;

const AppChallenge = ({ quotesArray, fetchingQuotePending, actionUpdateUser }) => {

    const inputArea = useRef(null);
    const quoteText = useRef(null);

    const [numTimeLeft, setNumTimeLeft] = useState(180);
    const [textTimer, setTextTimer] = useState(`${numTimeLeft}s`);
    const [textAccuracy, setTextAccuracy] = useState(0);
    const [textError, setTextError] = useState(0);
    const [textWPM, setTextWPM] = useState(0);

    const [isInGame, setIsInGame] = useState(false);

    const [isGroupResultShown, setIsGroupResultShown] = useState(false);
    const [currentQuote, setCurrentQuote] = useState('');

    const startGame = () => {
        if(!isInGame){
            setIsInGame(true);
            resetValues();
            updateQuote();
        
            clearInterval(timer);
            timer = window.setInterval(() => {
                if (timeRemaining > 0) {
                    timeRemaining -= 1;
                    setNumTimeLeft(numTimeLeft => numTimeLeft - 1);
                    numTimeElapsed += 1;
                }
                else {
                    finishGame();
                }
            }, 1000);
        }
    }

    const resetValues = () => {
        timeRemaining = 180;
        setNumTimeLeft(180);
        totalErrors = 0;
        numQuoteNo = 0;
        numCharacterTyped = 0;
        numTimeElapsed = 0; 
        accuracyRes = 100;
        errorRes = 0;

        if (inputArea.current) {
            inputArea.current.disabled = false;
            inputArea.current.value = '';
        }

        setTextTimer(`${numTimeLeft}s`);
        setTextAccuracy(100);
        setTextError(0);
        setTextWPM(0);
        
        setIsGroupResultShown(false);
    }

    const updateQuote = () => {

        quoteText.current.innerHTML = "";
        let currentQuoteUpdate = quotesArray[numQuoteNo];
        currentQuoteUpdate = currentQuoteUpdate.replace(/ +(?= )/g,'');
        setCurrentQuote(currentQuoteUpdate);

        currentQuoteUpdate.split('').forEach(char => {
            const charSpan = document.createElement('span')
            charSpan.innerText = char
            quoteText.current.appendChild(charSpan)
        })

        if (numQuoteNo < quotesArray.length - 1){
            numQuoteNo += 1;
        }
        else {
            finishGame();
        }
            
    }


    const processCurrentText = () => {
    
        let currInput = inputArea.current.value;
        let currInputArray = currInput.split('');

        numCharacterTyped += 1;

        let quoteSpanArray = quoteText.current.querySelectorAll('span');
        let currentErrors = 0;

        quoteSpanArray.forEach((char, index) => {
            let typedChar = currInputArray[index]

            if (typedChar == null) {
                char.classList.remove('correct');
                char.classList.remove('incorrect');

            } else if (typedChar === char.innerText) {
                char.classList.add('correct');
                char.classList.remove('incorrect');

            } else {
                char.classList.add('incorrect');
                char.classList.remove('correct');
                currentErrors = currentErrors + 1;
            }
        });
        let correctCharacters = (numCharacterTyped - (totalErrors + currentErrors));
        let accuracyVal = ((correctCharacters / numCharacterTyped) * 100);
        
        if(accuracyVal < 0) accuracyVal = 0;
        setTextError(currentErrors);
        setTextAccuracy(Math.round(accuracyVal));
        
        accuracyRes = Math.round(accuracyVal);
        errorRes = totalErrors + currentErrors;
        totalErrors += currentErrors;
        if (currInput.length === currentQuote.length) {
            updateQuote();
            inputArea.current.value = "";
        }
    }
  
    const finishGame = () => {
        clearInterval(timer);

        if (inputArea.current) {
            inputArea.current.disabled = true;
        }
        
        setIsGroupResultShown(true);

        let wpm = Math.round((((numCharacterTyped / 5) / numTimeElapsed) * 60));

        quoteText.current.innerHTML = "Click on restart to start a new game.";
        setTextWPM(wpm);

        setIsInGame(false);

        const completionRate = (numQuoteNo-1)/quotesArray.length*100;

        actionUpdateUser({ wpm, errorRes, accuracyRes, completionRate})
    }

    useEffect(() => {
        setTextTimer(`${numTimeLeft}s`);
    }, [numTimeLeft])

    if(fetchingQuotePending){
        return null;
    }
  
    return (
        <ChallengeWrapper>
            <Headers>
                {
                    isGroupResultShown ? (
                        <>
                            <Card>
                                <label>WPM</label>
                                <span>{textWPM}</span>
                            </Card>
                            <Card>
                                <label>Completion</label>
                                <span>{(numQuoteNo-1)/quotesArray.length*100}%</span>
                            </Card>
                        </>
                    ) : null
                }
                
                <Card>
                    <label>Errors</label>
                    <span>{textError}</span>
                </Card>
                <Card>
                    <label>Time Remaining</label>
                    <span>{textTimer}</span>
                </Card>
                <Card>
                    <label>Accuracy</label>
                    <span>{textAccuracy}</span>
                </Card>
            </Headers>

            <Quote ref={quoteText}>Click on the area below to start the game.</Quote>
            <TextArea ref={inputArea} placeholder="Start typing here..." onInput={() => processCurrentText()} onFocus={() => startGame()}></TextArea>
            { isGroupResultShown ? <FillButton onClick={() => resetValues()}>Restart</FillButton> : null }
            
        </ChallengeWrapper>
    )
}

export default connect(state => ({
    quotesArray: state.challenge.quote,
    fetchingQuotePending: state.challenge.fetchingQuotePending,
}),{ actionUpdateUser })(AppChallenge);