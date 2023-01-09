import QUESTIONS from '@/constants/questions';
import generateDescription from '@/lib/openai';
import { useEffect, useState } from 'react';

const ResumeBuilder = () => {
  const [answers, setAnswers] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [resume, setResume] = useState('');

  useEffect(() => {
    const initializeChat = async () => {
      setPrompt(QUESTIONS[0]);
    };

    initializeChat();
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === 'checkbox') {
      setResponse({ ...response, [name]: checked });
    } else {
      setResponse({ ...response, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if the user has selected at least one option for the skills or job experiences prompts
    if (prompt.type === 'checkbox' && !Object.values(response).some((value) => value)) {
      return;
    }

    setIsLoading(true);
    setAnswers([...answers, response]);
    setResponse({});
    setPrompt(QUESTIONS[answers.length + 1]);
    setIsLoading(false);

    if (answers.length === QUESTIONS.length - 1) {
      const questionaire = answers.reduce((acc, answer, index) => {
        const question = QUESTIONS[index].text;
        const answerText = Object.values(answer).join(', ');
        return `${acc} ${question} ${answerText}`;
      }, '');

      const resume = await generateDescription(
        `act as resume builder: take this questionare and create an expert resume, modern and formal, separate by responsabilities and key accomplishments, format title, date, employer, summary, list of responsabilities, list of key accomplishments and list of skills separate by commas: ${questionaire}`
      );
      setResume(resume);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center h-screen mt-10 ">
        <h1 className="w-full max-w-4xl mb-2 text-3xl font-semibold text-center">
          Welcome to the resume builder!
        </h1>
        <h2 className="w-full max-w-4xl mb-8 text-xl font-semibold text-center">
          To get started, please provide some information about yourself.
        </h2>
        {answers.length !== QUESTIONS.length ? (
          <form
            className="w-full max-w-2xl p-8 bg-white rounded-lg shadow md"
            onSubmit={handleSubmit}
          >
            <p className="mb-6 text-xl font-semibold">{prompt.text}</p>
            {prompt.type === 'text' && (
              <input
                className="w-full p-4 rounded-lg shadow-md"
                name="text"
                onChange={handleChange}
                type="text"
                value={response.text || ''}
              />
            )}
            {prompt.type === 'textarea' && (
              <textarea
                className="w-full p-4 rounded-lg shadow-md"
                name="textarea"
                onChange={handleChange}
                rows={5}
                value={response.textarea || ''}
              />
            )}
            {prompt.type === 'checkbox' &&
              prompt.options.map((option) => (
                <div className="mb-4" key={option}>
                  <input
                    checked={response[option] || false}
                    id={option}
                    name={option}
                    onChange={handleChange}
                    type="checkbox"
                    value={option}
                  />
                  <label className="ml-2" htmlFor={option}>
                    {option}
                  </label>
                </div>
              ))}
            <button
              className="w-full py-4 mt-4 text-white bg-blue-500 rounded-lg shadow-md"
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? 'Loading...' : 'Continue'}
            </button>
          </form>
        ) : (
          <>
            <p className="mb-8 text-xl font-semibold">Resume</p>
            {isLoading && (
              <p className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path className="opacity-75" d="M4 12a8 8 0 018-8v8z" fill="currentColor" />
                </svg>
                Loading...
              </p>
            )}
            {!isLoading && (
              <textarea
                className="w-full max-w-xl p-8 bg-white rounded-lg shadow-md"
                id="resume"
                name="resume"
                onChange={handleChange}
                rows={20}
                value={resume}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ResumeBuilder;
