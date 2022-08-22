const baseSoundPath = '/sounds/l1';

export const lessons = [
  {
    title: 'welcome',
    duration: 4,
    isNeedRecording: true,
    question: 'What is you name?',
    src: '/sounds/hi.mp3'
  },
  {
    title: 'l0',
    duration: 99,
    isNeedRecording: false,
    src: `${baseSoundPath}/s1.mp3`
  },
  {
    title: 'q0',
    duration: 3,
    isNeedRecording: true,
    question: 'What do you think are the obstacles to the digital economy?',
    src: `${baseSoundPath}/q1.mp3`
  },
  {
    title: 'l1',
    duration: 96,
    isNeedRecording: false,
    src: `${baseSoundPath}/s2.mp3`
  },
  {
    title: 'q1',
    duration: 6,
    isNeedRecording: true,
    question: 'If all regions are evenly distributed in the future according to Will Gibson, what problems will Innopils have and why?',
    src: `${baseSoundPath}/q2.mp3`
  },
  {
    title: 'l2',
    duration: 10 * 60 + 41,
    isNeedRecording: false,
    src: `${baseSoundPath}/s3.mp3`
  },
  {
    title: 'q2',
    duration: 9,
    isNeedRecording: true,
    question: 'Do you think the voice assistant really knows everything in the world or is it a figure of speech of a relative nature?',
    src: `${baseSoundPath}/q3.mp3`
  },
  {
    title: 'l3',
    duration: 2 * 60 + 43,
    isNeedRecording: false,
    src: `${baseSoundPath}/s4.mp3`
  },
  {
    title: 'q3',
    duration: 6,
    isNeedRecording: true,
    question: 'Why does the point of technological singularity not pose a threat to humanity?',
    src: `${baseSoundPath}/q4.mp3`
  },
  {
    title: 'l4',
    duration: 2 * 60 + 34,
    isNeedRecording: false,
    src: `${baseSoundPath}/s5.mp3`
  },
  {
    title: 'q4',
    duration: 7,
    isNeedRecording: true,
    question: 'Why is the instability and instability of the VUCA world a boon to humanity?',
    src: `${baseSoundPath}/q5.mp3`
  },
  {
    title: 'l5',
    duration: 60 + 52,
    isNeedRecording: false,
    src: `${baseSoundPath}/s6.mp3`
  },
  {
    title: 'q5',
    duration: 5,
    isNeedRecording: true,
    question: 'What are the prerequisites for economic growth through digital transformation?',
    src: `${baseSoundPath}/q6.mp3`
  },
  {
    title: 'l6',
    duration: 60 + 45,
    isNeedRecording: false,
    src: `${baseSoundPath}/s7.mp3`
  },
  {
    title: 'q6',
    duration: 5,
    isNeedRecording: true,
    question: 'Why artificial intelligence will not replace natural intelligence?',
    src: `${baseSoundPath}/q7.mp3`
  },
  {
    title: 'l7',
    duration: 12 * 60 + 39,
    isNeedRecording: false,
    src: `${baseSoundPath}/s8.mp3`
  },
  {
    title: 'q7',
    duration: 10,
    isNeedRecording: true,
    question: 'Do you think the educational company that Thomas Frey talked about will work solely on the basis of artificial intelligence?',
    src: `${baseSoundPath}/q8.mp3`
  },
];

/*
const baseSoundPath = '/sounds/l1';

export const lessons = [
  {
    title: 'welcome',
    duration: 4,
    isNeedRecording: true,
    question: 'Как зовут Вас?',
    src: '/sounds/hi.mp3'
  },
  {
    title: 'l0',
    duration: 99,
    isNeedRecording: false,
    src: `${baseSoundPath}/s1.mp3`
  },
  {
    title: 'q0',
    duration: 3,
    isNeedRecording: true,
    question: 'В чем на Ваш взгляд препятствия на пути цифровой экономики?',
    src: `${baseSoundPath}/q1.mp3`
  },
  {
    title: 'l1',
    duration: 96,
    isNeedRecording: false,
    src: `${baseSoundPath}/s2.mp3`
  },
  {
    title: 'q1',
    duration: 6,
    isNeedRecording: true,
    question: 'Если все регионы будут равномерно распределены в будущем по Уилу Гибсону, какие появятся проблемы у Иннопилса и почему?',
    src: `${baseSoundPath}/q2.mp3`
  },
  {
    title: 'l2',
    duration: 10 * 60 + 41,
    isNeedRecording: false,
    src: `${baseSoundPath}/s3.mp3`
  },
  {
    title: 'q2',
    duration: 9,
    isNeedRecording: true,
    question: 'Как Вы думаете, действительно ли голосовой помощник знает все на свете или это фигура речи относительного характера?',
    src: `${baseSoundPath}/q3.mp3`
  },
  {
    title: 'l3',
    duration: 2 * 60 + 43,
    isNeedRecording: false,
    src: `${baseSoundPath}/s4.mp3`
  },
  {
    title: 'q3',
    duration: 6,
    isNeedRecording: true,
    question: 'Почему точка технологической сингулярности не несет в себе угрозы для человечества?',
    src: `${baseSoundPath}/q4.mp3`
  },
  {
    title: 'l4',
    duration: 2 * 60 + 34,
    isNeedRecording: false,
    src: `${baseSoundPath}/s5.mp3`
  },
  {
    title: 'q4',
    duration: 7,
    isNeedRecording: true,
    question: 'Почему нестабильность и неустойчивость VUCA мира является благом для человечества?',
    src: `${baseSoundPath}/q5.mp3`
  },
  {
    title: 'l5',
    duration: 60 + 52,
    isNeedRecording: false,
    src: `${baseSoundPath}/s6.mp3`
  },
  {
    title: 'q5',
    duration: 5,
    isNeedRecording: true,
    question: 'Каковы предпосылки экономического роста за счет цифровой трансформации?',
    src: `${baseSoundPath}/q6.mp3`
  },
  {
    title: 'l6',
    duration: 60 + 45,
    isNeedRecording: false,
    src: `${baseSoundPath}/s7.mp3`
  },
  {
    title: 'q6',
    duration: 5,
    isNeedRecording: true,
    question: 'Почему искусственный интеллект не заменит интеллект естественный?',
    src: `${baseSoundPath}/q7.mp3`
  },
  {
    title: 'l7',
    duration: 12 * 60 + 39,
    isNeedRecording: false,
    src: `${baseSoundPath}/s8.mp3`
  },
  {
    title: 'q7',
    duration: 10,
    isNeedRecording: true,
    question: 'Будет ли на ваш взгляд образовательная компания, о которой говорил Томас Фрей, работать исключительно на основе искусственного интеллекта?',
    src: `${baseSoundPath}/q8.mp3`
  },
];
*/
