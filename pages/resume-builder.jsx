import QUESTIONS from '@/constants/questions';
import generateDescription from '@/lib/openai';
import { useEffect, useState } from 'react';
import Select from 'react-select';

const ResumeBuilder = () => {
  const [answers, setAnswers] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState({});
  const [resume, setResume] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initializeChat = () => {
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

  const handleSelectChange = (event) => {
    const { value, name } = event;
    setResponse({ ...response, [name]: value });
  };

  const handleBack = () => {
    setPrompt(QUESTIONS[answers.length - 1]);
    setResponse(answers[answers.length - 1]);
    setAnswers(answers.slice(0, answers.length - 1));
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
        `act as resume builder: take this questionare and create an expert resume, modern and formal, this is the format for the resume.

        Formatter rules:
        - contact info, all in one line
        - personal info, in two lines uppercased
        - summary, in multiple lines, 3-5 sentences
        - Work experiences(3-5), in multiple lines, 3-5 sentences, and 3-5 bullets of responsibilities and key accomplishments, each bullet in a new line
        - Technologies list separated by commas
        - Soft-Skills list separated by commas
        - Education in 3 lines
        - Headings in bold
        
        Format:
        "email
        phone
        Twitter
        Linkedin
        Portfolio
        location

        FULL NAME
        JOB TITLE

        SUMMARY

        MOST RECENT WORK EXPERIENCES:
        RESPONSIBILITIES:
        KEY ACCOMPLISHMENTS:

        TECHNOLOGIES
        
        SOFT-SKILLS
        
        EDUCATION
        Institution (degree)
        date(start - end) • Location

        LANGUAGES
        Language - Fluency - Level"

        This is the questionaire to create the resume: ${questionaire}`
      );
      setResume(resume);
    }
  };

  return (
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
              name={prompt.name}
              onChange={handleChange}
              type={prompt.type}
              value={response.text || ''}
            />
          )}
          {prompt.type === 'number' && (
            <input
              className="w-full p-4 rounded-lg shadow-md"
              name={prompt.name}
              onChange={handleChange}
              type="number"
              value={response.number || ''}
            />
          )}
          {prompt.type === 'textarea' && (
            <textarea
              className="w-full p-4 rounded-lg shadow-md"
              name={prompt.name}
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
                  type={prompt.type}
                  value={option}
                />
                <label className="ml-2" htmlFor={option}>
                  {option}
                </label>
              </div>
            ))}
          {prompt.type === 'select' && (
            <Select
              isMulti={prompt.multiple}
              name={prompt.name}
              onChange={handleSelectChange}
              options={prompt.options.map((option) => ({ value: option, label: option }))}
              value={
                prompt.multiple
                  ? response[prompt.name]
                  : { value: response[prompt.name], label: response[prompt.name] }
              }
            />
          )}
          <section className="flex flex-col items-center justify-between w-full mt-8 space-x-2 space-y-4 md:flex-row">
            <button
              className={`w-full py-4 mt-4 rounded-lg shadow-md ${
                answers.length === 0
                  ? 'bg-gray-200 text-gray-400 cursor-default'
                  : 'text-white bg-blue-500'
              }`}
              disabled={answers.length === 0}
              name="back"
              onClick={handleBack}
              type="button"
            >
              Back
            </button>
            <button
              className="w-full py-4 mt-4 text-white bg-blue-500 rounded-lg shadow-md"
              name="continue"
              type="submit"
            >
              Continue
            </button>
          </section>
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
            <div className="w-full max-w-xl p-8 bg-white rounded-lg shadow-md">
              <pre
                className="font-sans text-sm text-gray-800 whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: resume }}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ResumeBuilder;
