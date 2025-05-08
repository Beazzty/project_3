import { useNavigate } from 'react-router-dom';

export default function SkillSelect() {
  const navigate = useNavigate();

  const handleLevelSelect = (level: string) => {
    // Store the selected level in localStorage
    localStorage.setItem('selectedLevel', level);
    // Navigate to the quiz page
    navigate('/quiz');
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-[#006847] via-[#C4A777] to-[#CE1126] bg-clip-text text-transparent">
        Select Your Level
      </h1>
      <div className="flex flex-col gap-4 w-full">
        <button 
          onClick={() => handleLevelSelect('BEGINNER')}
          className="text-xl uppercase px-8 py-4 rounded-lg bg-gradient-to-r from-[#006847] to-[#004225] text-white hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-md text-center"
        >
          Beginner
        </button>
        <button 
          onClick={() => handleLevelSelect('INTERMEDIATE')}
          className="text-xl uppercase px-8 py-4 rounded-lg bg-gradient-to-r from-[#C4A777] to-[#FFD700] text-[#004225] hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-md text-center"
        >
          Intermediate
        </button>
        <button 
          onClick={() => handleLevelSelect('ADVANCED')}
          className="text-xl uppercase px-8 py-4 rounded-lg bg-gradient-to-r from-[#CE1126] to-[#a30d1e] text-white hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-md text-center"
        >
          Advanced
        </button>
      </div>
    </div>
  );
}
