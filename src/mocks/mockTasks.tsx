import { TTask } from 'types/tasks';

export const mockTasks: TTask[] = [
  {
    name: 'Watch Harry Potter and the Chamber of secrets',
    info: 'Make some tea, find a soft blanket, turn the phone off and enjoy the film',
    isImportant: true,
    isCompleted: false,
    id: 1,
  },
  {
    name: 'Lorem ipsum',
    info: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet eius enim ex nesciunt possimus provident similique sunt, tenetur totam ut! Delectus ex excepturi hic libero odit quibusdam repellendus tenetur ullam.',
    isImportant: false,
    isCompleted: true,
    id: 2,
  },
  {
    name: 'Task 3',
    info: 'This is the 3rd task',
    isImportant: false,
    isCompleted: false,
    id: 3,
  },
];
