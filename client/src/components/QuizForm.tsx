import { useState } from 'react';
// import { QuestionData } from '../Interfaces/QuestionData';

export default function QuizForm({ questions = []}) {
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({});
    const [message, setMessage] = useState<string>();
    // TODO - when submitting the form,
    // if all questions are answered, send the answers to the server
    // the current data model will not work on the backend
    // it needs to be updated so that the quiz results are saved in the database
    // for example, change Result so that it has a field for numCorrectAnswers, numQuestions, and userId and Level
    //once the model is changed, you can update the graphql to save the results.
    // once the graphql is updated, you can update the quiz form to send the data to the server

    const gradeQuiz = (e) => {
        e.preventDefault();
        let correctAnswers = 0;
        let totalQuestions = questions.length;

        // make sure all questions are answered
        if (Object.keys(selectedAnswers).length !== totalQuestions) {
            setMessage('Please answer all questions before submitting.');
            return;
        }

        if (Object.keys(selectedAnswers).some((answer) => answer === '')) {
            setMessage('Please answer all questions before submitting.');
            return;
        }
        questions.forEach((q) => {
            if (selectedAnswers[q.word] === q.translation) {
                correctAnswers++;
            }
        });
        console.log('Correct Answers:', correctAnswers);
        console.log('Total Questions:', totalQuestions);
    }

    const handleChange = (e) => {
        const { value, name } = e.target;
        console.log('Selected:', value, name);
        setSelectedAnswers((prevAnswers) => ({
            ...prevAnswers,
            [name]: value,
        }));
    };
    console.log('Selected Answers:', selectedAnswers);
    return (
        <form onSubmit={(e) => gradeQuiz(e)}>
            { message && <p>{message}</p>}

            {questions.map((q: any) => (
                <div key={q._id}>
                    <p>{q.word}</p>
                    <select name={q.word} onChange={handleChange} value={selectedAnswers[q.word] || ''}>
                        <option value="" disabled>
                            Select an answer
                        </option>

                        {q.options.map((opt: string, i: number) => (
                            <option key={i} value={opt}>
                                {opt}
                            </option>
                        ))}
                    </select>
                </div>
            ))}

            {/* Spacer so the submit button sticks to bottom */}
            <div style={{ flexGrow: 1 }} />

            {/* Submit button aligned bottom‐right */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                    type="submit"
                >
                    Submit
                </button>
            </div>
        </form>
    )
}
