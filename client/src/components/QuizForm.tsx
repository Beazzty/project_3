import { useState } from 'react';
import { QuestionData } from '../Interfaces/QuestionData';

export default function QuizForm({ questions = [] }: { questions: QuestionData[] }) {
    const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: string }>({});
    const [message, setMessage] = useState<string>();

    const gradeQuiz = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        let correctAnswers = 0;
        const totalQuestions = questions.length;

        // Ensure all questions are answered
        if (Object.keys(selectedAnswers).length !== totalQuestions) {
            setMessage('Please answer all questions before submitting.');
            return;
        }

        questions.forEach((q) => {
            if (selectedAnswers[q.word] === q.translation) {
                correctAnswers++;
            }
        });

        setMessage(`You got ${correctAnswers} out of ${totalQuestions} correct!`);
        console.log('Correct Answers:', correctAnswers);
        console.log('Total Questions:', totalQuestions);
    };

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value, name } = e.target;
        setSelectedAnswers((prevAnswers) => ({
            ...prevAnswers,
            [name]: value,
        }));
    };

    return (
        <form onSubmit={gradeQuiz}>
            {message && <p>{message}</p>}

            {questions.map((q) => (
                <div key={q._id}>
                    <p>{q.word}</p>
                    <select name={q.word} onChange={handleChange} value={selectedAnswers[q.word] || ''}>
                        <option value="" disabled>
                            Select an answer
                        </option>
                        {q.options.map((opt, i) => (
                            <option key={i} value={opt}>
                                {opt}
                            </option>
                        ))}
                    </select>
                </div>
            ))}

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button type="submit">Submit</button>
            </div>
        </form>
    );
}
