import { createSlice, configureStore } from '@reduxjs/toolkit';

export const gameMode = createSlice({
  name: 'gameMode',
  initialState: {
    value: 'train',
  },
  reducers: {
    train: (state) => {
      state.value = 'train';
    },
    play: (state) => {
      state.value = 'play';
    },
  },
});

export const categoryName = createSlice({
  name: 'categoryName',
  initialState: {
    value: 'main',
  },
  reducers: {
    categoryMain: (state) => {
      state.value = 'main';
    },
    categoryActionSetA: (state) => {
      state.value = 'actionSetA';
    },
    categoryActionSetB: (state) => {
      state.value = 'actionSetB';
    },
    categoryActionSetC: (state) => {
      state.value = 'actionSetC';
    },
    categoryAdjective: (state) => {
      state.value = 'adjective';
    },
    categoryAnimalSetA: (state) => {
      state.value = 'animalSetA';
    },
    categoryAnimalSetB: (state) => {
      state.value = 'animalSetB';
    },
    categoryFruits: (state) => {
      state.value = 'fruits';
    },
    categoryVegetables: (state) => {
      state.value = 'vegetables';
    },
  },
});

export const playGame = createSlice({
  name: 'playGame',
  initialState: {
    value: 'correct',
  },
  reducers: {
    correct: (state) => {
      state.value = 'correct';
    },
    incorrect: (state) => {
      state.value = 'incorrect';
    },
  },
});

export const failure = createSlice({
  name: 'failure',
  initialState: {
    value: 'noError',
  },
  reducers: {
    error: (state) => {
      state.value = 'error';
    },
    noError: (state) => {
      state.value = 'noError';
    },
  },
});

export const restoreGame = createSlice({
  name: 'restoreGame',
  initialState: {
    value: 'noStart',
  },
  reducers: {
    start: (state) => {
      state.value = 'start';
    },
    noStart: (state) => {
      state.value = 'noStart';
    },
  },
});

export const isWinPage = createSlice({
  name: 'winPage',
  initialState: {
    value: 'noWinPage',
  },
  reducers: {
    winPage: (state) => {
      state.value = 'winPage';
    },
    noWinPage: (state) => {
      state.value = 'noWinPage';
    },
  },
});

export const { train, play } = gameMode.actions;
export const { winPage, noWinPage } = isWinPage.actions;
export const { correct, incorrect } = playGame.actions;
export const { error, noError } = failure.actions;
export const { start, noStart } = restoreGame.actions;
export const {
  categoryMain,
  categoryActionSetA,
  categoryActionSetB,
  categoryActionSetC,
  categoryAdjective,
  categoryAnimalSetA,
  categoryAnimalSetB,
  categoryFruits,
  categoryVegetables,
} = categoryName.actions;

export const store = configureStore({
  reducer: {
    gameMode: gameMode.reducer,
    categoryName: categoryName.reducer,
    playGame: playGame.reducer,
    failure: failure.reducer,
    restoreGame: restoreGame.reducer,
    isWinPage: isWinPage.reducer,
  },
});

// store.subscribe(() => {
//   console.log(store.getState());
// });
