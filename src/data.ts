export type VideoCategory = 'learn' | 'make' | 'mindset';

export type Video = {
  id: string;
  category: VideoCategory;
  tag: string;
  title: string;
  description: string;
  topics: string[];
};

export const videos: Video[] = [
  { id: 'RBSGKlAvoiM', category: 'learn', tag: 'Learn', title: 'Data structures, easy to advanced', description: 'Build a practice that compounds over time.', topics: ['software', 'programming', 'computer science', 'engineering', 'coding'] },
  { id: 'aircAruvnKk', category: 'learn', tag: 'Learn', title: 'But what is a neural network?', description: 'Make complex ideas easier to understand.', topics: ['ai', 'artificial intelligence', 'machine learning', 'data science', 'math'] },
  { id: 'rfscVS0vtbw', category: 'make', tag: 'Make', title: 'Learn Python from scratch', description: 'Start building useful things with code.', topics: ['python', 'programming', 'coding', 'automation', 'software'] },
  { id: 'Ke90Tje7VS0', category: 'learn', tag: 'Learn', title: 'React for beginners', description: 'A practical start to building interfaces.', topics: ['react', 'javascript', 'frontend', 'web development', 'coding'] },
  { id: 'bMknfKXIFA8', category: 'make', tag: 'Make', title: 'Build a React project', description: 'Turn an idea into a project people can use.', topics: ['react', 'javascript', 'frontend', 'web development', 'projects'] },
  { id: 'PkZNo7MFNFg', category: 'learn', tag: 'Learn', title: 'JavaScript full course', description: 'Learn the language behind the web.', topics: ['javascript', 'web development', 'frontend', 'programming', 'coding'] },
  { id: 'zJSY8tbf_ys', category: 'make', tag: 'Make', title: 'Web development full course', description: 'A broad map for becoming a web developer.', topics: ['web development', 'html', 'css', 'javascript', 'frontend'] },
  { id: 'M7lc1UVf-VE', category: 'mindset', tag: 'Mindset', title: 'Build your first embedded video', description: 'Understand the building blocks behind video on the web.', topics: ['youtube', 'video', 'web development', 'html', 'projects'] }
];

export const categories: Array<'all' | VideoCategory> = ['all', 'learn', 'make', 'mindset'];

export function rankVideos(videoList: Video[], intent: string): Video[] {
  const words = intent.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
  if (!words.length) return videoList;

  return [...videoList].sort((first, second) => {
    const score = (video: Video) => video.topics.reduce((total, topic) => total + Number(words.some((word) => topic.includes(word))), 0);
    return score(second) - score(first);
  });
}
