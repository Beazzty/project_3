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
        <form onSubmit={gradeQuiz} className="w-full max-w-2xl mx-auto space-y-8">
            {message && (
                <div className={`p-6 rounded-xl text-center text-lg font-semibold transform transition-all duration-500 ${
                    message.includes('Please answer') 
                        ? 'bg-gradient-to-r from-[#CE1126]/10 to-[#a30d1e]/10 text-[#CE1126] animate-pulse' 
                        : 'bg-gradient-to-r from-[#006847]/10 to-[#004225]/10 text-[#006847] animate-float'
                }`}>
                    {message}
                </div>
            )}

            <div className="space-y-6">
                {questions.map((q, index) => (
                    <div 
                        key={q._id} 
                        className="bg-white p-6 rounded-xl shadow-lg border-2 border-[#006847]/10 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#006847] via-[#C4A777] to-[#CE1126]"></div>
                        <p className="text-2xl font-bold bg-gradient-to-r from-[#006847] to-[#004225] bg-clip-text text-transparent mb-4">
                            {q.word}
                        </p>
                        <select 
                            name={q.word} 
                            onChange={handleChange} 
                            value={selectedAnswers[q.word] || ''}
                            className="w-full p-3 rounded-lg border-2 border-[#006847]/20 focus:border-[#006847] focus:ring-2 focus:ring-[#006847]/20 outline-none transition-all duration-300 hover:border-[#006847]/40"
                            aria-label={`Select translation for ${q.word}`}
                        >
                            <option value="" disabled>
                                Select an answer
                            </option>
                            {q.options.map((opt, i) => (
                                <option key={i} value={opt} className="py-2">
                                    {opt}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>

            <div className="flex justify-end">
                <button 
                    type="submit"
                    className="px-8 py-3 bg-gradient-to-r from-[#006847] to-[#004225] text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-md"
                >
                    Submit Quiz
                </button>
            </div>
        </form>
    );
}
