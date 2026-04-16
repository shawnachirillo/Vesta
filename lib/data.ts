export type EventItem = {
  id: string;
  title: string;
  time: string;
  location?: string;
  type?: string;
};

export type TaskItem = {
  id: string;
  title: string;
  status: 'now' | 'next' | 'later';
};

export type RoutineItem = {
  id: string;
  name: string;
  people: string;
  steps: string[];
  suggestedMedia?: string;
};

export const todaySummary = {
  weather: '56° · Cloudy',
  dateLabel: 'Thursday, April 16',
  status: '2 events · 3 priority tasks · after-school routine ready'
};

export const todayEvents: EventItem[] = [
  { id: '1', title: 'School dropoff', time: '8:15 AM', location: 'Elementary school', type: 'Family' },
  { id: '2', title: 'Design work block', time: '10:00 AM', location: 'Home office', type: 'Work' },
  { id: '3', title: 'Pickup', time: '3:15 PM', location: 'Elementary school', type: 'Family' }
];

export const todayTasks: TaskItem[] = [
  { id: '1', title: 'Pack after-school snack bin', status: 'now' },
  { id: '2', title: 'Reply to school message', status: 'next' },
  { id: '3', title: 'Reset living room before bedtime', status: 'later' }
];

export const routines: RoutineItem[] = [
  {
    id: 'morningmatt',
    name: 'Morning Matt',
    people: 'Matt',
    steps: ['Bathroom', 'Get dressed', 'Breakfast', 'Bag + shoes check', 'Leave house'],
    suggestedMedia: 'Morning music playlist'
  },
  {
    id: 'workmorningshawna',
    name: 'Work Morning Shawna',
    people: 'Shawna',
    steps: ['Bathroom', 'Energy work/meditation','Movement','Get Amal Ready', 'Breakfast', 'Bag + Lunch + ID + Wallet check', 'Leave house'],
    suggestedMedia: 'Morning music playlist'
  },
  {
    id: 'morningshawna',
    name: 'Morning Shawna',
    people: 'Shawna',
    steps:  ['Bathroom', 'Energy work/meditation','Movement','Get Amal Ready', 'Breakfast', 'Check emails + Create daily plan'],
    suggestedMedia: 'Morning music playlist'
  },
  {
    id: 'afterschool',
    name: 'After School',
    people: 'Amal + parent',
    steps: ['Snack', 'Quiet decompression', 'Check backpack', 'Pick one calm activity'],
    suggestedMedia: 'Calm YouTube playlist'
  },
  {
    id: 'evening',
    name: 'Evening',
    people: 'Household',
    steps: ['Make dinner', 'eat', 'cleanup kitchen', 'clean up livingroom', 'head upstairs for nighttime routine'],
    suggestedMedia: 'Evening music playlist'
  },
  {
    id: 'bedtime',
    name: 'Bedtime',
    people: 'Amal + parent',
    steps: ['Tidy reset', 'Bath / wash up','Brush teeth', 'Pajamas', 'Read book', 'Feed fish','Lights out'],
    suggestedMedia: 'Wind-down music'
  }
];

export const quickLinks = {
  youtube: 'https://www.youtube.com/',
  music: 'https://music.youtube.com/',
  calendar: '/calendar',
  tasks: '/tasks',
  notes: '/notes',
  library: '/library',
  routines: '/routines'
};

export const librarySections = [
  {
    id: 'finances',
    title: 'Finances',
    description: 'Budget, bills, subscriptions, savings goals',
    items: ['Monthly budget sheet', 'Bills checklist', 'Subscriptions tracker']
  },
  {
    id: 'documents',
    title: 'Documents',
    description: 'Insurance, medical forms, school paperwork, warranties',
    items: ['Insurance folder', 'School forms', 'Medical records links']
  },
  {
    id: 'family',
    title: 'Family',
    description: 'Contacts, schedules, emergency info, birthdays',
    items: ['Emergency contacts', 'School info', 'Important dates']
  },
  {
    id: 'home',
    title: 'Home',
    description: 'Wi-Fi info, appliance manuals, maintenance, vendors',
    items: ['Wi-Fi details', 'Manuals', 'Maintenance log']
  }
];

export const notes = [
  'Pick up extra fruit for after school.',
  'Check daughter’s folder for teacher note.',
  'Move recurring bedtime reset to 7:15 PM.'
];
