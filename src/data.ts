import { TimeSlice } from './components/TimelineBlock/types';

export const slices: TimeSlice[] = [
  {
    id   : 'tech-80',
    from : 1980,
    to   : 1986,
    label: 'Технологии',
    events: [
      {
        year: 1980,
        title: 'Sinclair ZX80',
        description: 'Sinclair Research выпускает домашний компьютер ZX80'
      },
      {
        year: 1982,
        title: 'ZX Spectrum',
        description: 'Легендарный 8-битный компьютер появляется на рынке'
      },
      {
        year: 1984,
        title: 'Apple Macintosh',
        description: 'Apple демонстрирует первый Macintosh с GUI'
      },
      {
        year: 1986,
        title: 'IBM PC/AT',
        description: 'IBM выводит на рынок PC / AT с процессором 80286'
      }
    ]
  },
  {
    id   : 'games-84',
    from : 1984,
    to   : 1990,
    label: 'Игры',
    events: [
      { year: 1984, title: 'Tetris', description: 'Алексей Пажитнов создаёт «Тетрис»' },
      { year: 1985, title: 'NES worldwide', description: 'Nintendo начинает мировой выпуск NES' },
      { year: 1986, title: 'The Legend of Zelda', description: 'Выходит первая часть Zelda' },
      { year: 1988, title: 'Sega Mega Drive', description: 'Старт продаж 16-битной консоли Sega' },
      { year: 1990, title: 'SNES', description: 'Nintendo представляет Super NES' }
    ]
  },
  {
    id   : 'films-87',
    from : 1987,
    to   : 1991,
    label: 'Кино',
    events: [
      { year: 1987, title: '«Хищник»', description: 'Predator, США, реж. Джон Мактирнан' },
      { year: 1988, title: 'Кто подставил кролика Роджера', description: 'Who Framed Roger Rabbit, США, Р. Земекис' },
      { year: 1989, title: 'Назад в будущее 2', description: 'Back to the Future 2, Р. Земекис' },
      { year: 1990, title: 'Крепкий орешек 2', description: 'Die Hard 2, США, Ренни Харлин' },
      { year: 1991, title: 'Семейка Аддамс', description: 'The Addams Family, США, Барри Зонненфельд' }
    ]
  },
  {
    id   : 'books-92',
    from : 1992,
    to   : 1997,
    label: 'Литература',
    events: [
      {
        year: 1992,
        title: 'Нобелевка — Дерек Уолкотт',
        description: 'Карибский поэт получает премию по литературе'
      },
      {
        year: 1994,
        title: '«Невеста ветра»',
        description: 'Исторический роман С. Фицера (пример художественного бестселлера года)'
      },
      {
        year: 1995,
        title: 'Нобелевка — Шеймас Хини',
        description: 'Ирландский поэт удостаивается высшей награды'
      },
      {
        year: 1997,
        title: 'Гарри Поттер',
        description: 'Выходит «Harry Potter and the Philosopher’s Stone» Дж. К. Роулинг'
      }
    ]
  },
  {
    id   : 'science-95',
    from : 1995,
    to   : 2000,
    label: 'Наука',
    events: [
      { year: 1995, title: 'Первая экзопланета', description: 'Открыта 51 Pegasi b' },
      { year: 1996, title: 'Клонирование Долли', description: 'Первая клонированная овца — Dolly' },
      { year: 1997, title: 'Mars Pathfinder', description: 'Посадка ровера Sojourner на Марсе' },
      { year: 1999, title: 'Геном дрожжей', description: 'Завершена расшифровка генома S. cerevisiae' },
      { year: 2000, title: 'Черновой HGP', description: 'Объявлен черновой вариант Human Genome Project' }
    ]
  },
  {
    id   : 'sport-99',
    from : 1999,
    to   : 2004,
    label: 'Спорт',
    events: [
      { year: 1999, title: 'Финал ЛЧ', description: 'МЮ — Бавария 2:1 (Камп Ноу)' },
      { year: 2000, title: 'Сидней-2000', description: 'XXVII Летние Олимпийские игры' },
      { year: 2002, title: 'ЧМ-2002', description: 'Сборная Бразилии берёт 5-й кубок' },
      { year: 2003, title: 'ЧМ по регби', description: 'Англия — Австралия, «золотой дроп-гол» Уилкинсона' },
      { year: 2004, title: 'Афины-2004', description: 'Вернувшиеся на родину Олимпийские игры' }
    ]
  }
];
