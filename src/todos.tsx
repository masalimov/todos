export interface Todo {
   title: string;
   desc: string;
   image: string;
   done: boolean;
   createdAt: string;
   key: number;
}

const date1 = new Date(2026, 2, 10, 10, 15);
const date2 = new Date(2026, 2, 20, 16, 40);

const todos = [
   {
      title: 'Изучить React',
      desc: 'Да поскорее!',
      image: '',
      done: true,
      createdAt: date1.toLocaleString(),
      key: date1.getTime(),
   },
   {
      title: 'Написать первое React-приложение',
      desc: 'Список запланированных дел',
      image: '',
      done: false,
      createdAt: date2.toLocaleString(),
      key: date2.getTime(),
   },
];

export default todos;
