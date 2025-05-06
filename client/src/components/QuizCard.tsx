import { useState } from 'react';
import { QuestionData } from '../Interfaces/QuestionData';
 
question: QuestionData

const Quiz: () => { 
    let [index, setIndex] = useState(0);
    let [questions, setQuestions] = useState([]);

    const chechAns = (e,ans) => {
        if (questions[index].answer === ans) {
            e.target.classList.add('correct');
        } else {
            e.target.classList.add('wrong');

    } 
    return (
        <div className="quiz-container">
            <h1>Quiz</h1>
            <hr />
            <h2> {index + 1} / {questions.question} </h2>
            <ul>
            <li onClick={(e)=>{chechAns(e,1)}}>{questions.option1}</li>
            <li onClick={(e)=>{chechAns(e,2)}}>{questions.option2}</li>
            <li onClick={(e)=>{chechAns(e,3)}}>{questions.option3}</li>
            <li onClick={(e)=>{chechAns(e,4)}}>{questions.option4}</li>
            </ul>
            <button>Next</button>
        <div className="index">1 of 5 questions</div>
        </div>
    )
}
    
}
