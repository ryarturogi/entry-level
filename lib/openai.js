import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateDescription = async (prompt) => {
  const model = 'text-davinci-003';
  const { data } = await openai.createCompletion({
    model,
    prompt,
    max_tokens: 2048,
    n: 1,
  });

  return data.choices[0].text.trim();
};

export default generateDescription;
