import QUESTIONS, { Question, SelectOption } from '@/constants/coach-questions';
import generateDescription from '@/lib/openai';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';

const CareerCoach = (): React.ReactElement => {
  const [answers, setAnswers] = useState<string[]>([]);
  const [prompt, setPrompt] = useState<Question>(QUESTIONS[0]);
  const [response, setResponse] = useState<any>({});
  const [resume, setResume] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const initializeChat = (): void => {
      setPrompt(QUESTIONS[0]);
    };

    initializeChat();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = event.target;

    if (type === 'checkbox' || type === 'radio') {
      const isChecked = (event.target as HTMLInputElement).checked;
      setResponse({ ...response, [name]: isChecked });
    } else {
      setResponse({ ...response, [name]: value });
    }
  };

  const handleSelectChange = ({ value, name }: SelectOption): void => {
    setResponse({ ...response, [name]: value });
  };

  const handleBack = (): void => {
    setPrompt(QUESTIONS[answers.length - 1]);
    setResponse(answers[answers.length - 1]);
    setAnswers(answers.slice(0, answers.length - 1));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
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

      const resume: string = await generateDescription(
        `act as life coach / career coach: take this questionare and create an expert consulting advices, modern and formal.

        Formatter rules:
        - Coach name, in one lines uppercased
        - Response, in multiple lines, 5-8 sentences
        - Headings in bold
        
        Format:
        Couch Name: ${response.name}
        RESPONSE

       Questions and answers, write some advices after understanding the data: ${questionaire}`
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
          <p className="mb-8 text-xl font-semibold">Consult</p>
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

export default CareerCoach;
