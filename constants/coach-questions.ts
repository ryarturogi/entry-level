export interface Question {
  text: string;
  type: string;
  name: string;
  multiple?: boolean;
  options?: string[];
}

export type SelectOption = {
  value: string;
  label: string;
  name: string;
};

const QUESTIONS: Question[] = [
  {
    text: 'What are your current life goals and how can I help you achieve them?',
    type: 'text',
    name: 'lifeGoals',
  },
  {
    text: 'What areas of your life are you most satisfied with and why?',
    type: 'text',
    name: 'satisfaction',
  },
  {
    text: 'What areas of your life do you feel you need the most improvement in?',
    type: 'text',
    name: 'improvement',
  },
  {
    text: 'How do you handle stress and challenges in your personal life?',
    type: 'text',
    name: 'stressHandling',
  },
  {
    text: 'What are your long-term life goals and how can we develop a plan to achieve them?',
    type: 'text',
    name: 'longTermGoals',
  },
  {
    text: 'What are your values and how do they align with your life goals?',
    type: 'text',
    name: 'values',
  },

  {
    text: 'What are your current career goals and how can I help you achieve them?',
    type: 'text',
    name: 'careerGoals',
  },
  {
    text: 'Can you describe your current job and how it aligns with your overall career aspirations?',
    type: 'text',
    name: 'currentJob',
  },
  {
    text: 'What are your strengths and weaknesses in the workplace?',
    type: 'text',
    name: 'strengthsWeaknesses',
  },
  {
    text: 'Are you satisfied with your current work-life balance? If not, how can we improve it?',
    type: 'text',
    name: 'workLifeBalance',
  },
  {
    text: 'What are your long-term career goals and how can we develop a plan to achieve them?',
    type: 'text',
    name: 'longTermCareerGoals',
  },
  {
    text: 'Are there any specific skills or areas of expertise that you would like to develop further?',
    type: 'text',
    name: 'skillsDevelopment',
  },
];

export default QUESTIONS;
