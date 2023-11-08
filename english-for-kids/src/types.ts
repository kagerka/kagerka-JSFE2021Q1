export type AudioArr = [
  {
    audio: 'string',
    word: 'string',
  },
];

export type CategoryCard =
  {
    word: string,
    translate: string,
    picture: string,
    audio: string,
  };

export type CategoryName = CategoryCard[];
