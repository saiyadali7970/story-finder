export interface Story {
  id: number;
  title: string;
  author: string;
  category: string;
  date: string; 
}

export const stories: Story[] = [
  { id: 1, title: 'Next.js Tutorial', author: 'John', category: 'Tech', date: '2024-10-01' },
  { id: 2, title: 'Learn React', author: 'Jane', category: 'Tech', date: '2024-09-20' },
  { id: 3, title: 'Cooking Tips', author: 'Emily', category: 'Lifestyle', date: '2024-08-15' },
  { id: 4, title: 'Travel Guide', author: 'Mike', category: 'Travel', date: '2024-07-05' },
];
