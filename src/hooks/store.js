import { create } from 'zustand';
export const useCountStore = create((set) => ({
  pomodoroCount: 0,
  cansCount: 0,
  boxesCount: 0,
  incrementCounts: () =>
    set((state) => {
      const newPomodoroCount = state.pomodoroCount + 1;
      const shouldIncrementCan = newPomodoroCount % 4 === 0;
      const shouldIncrementBox =
        state.cansCount > 0 && state.cansCount % 4 === 0;

      return {
        pomodoroCount: newPomodoroCount,
        cansCount: shouldIncrementCan ? state.cansCount + 1 : state.cansCount,
        boxesCount: shouldIncrementBox
          ? state.boxesCount + 1
          : state.boxesCount,
      };
    }),
}));
// export const usePomodoroStore = create((set) => ({
//   pomodoroCount: 0,
//   incrementPomodoroCount: () =>
//     set((state) => ({ pomodoroCount: state.pomodoroCount + 1 })),
//   resetPomodoroCount: () => set(() => ({ pomodoroCount: 0 })),
// }));

// export const useCansStore = create((set) => ({
//   canCount: 0,
//   incrementCanCount: () => set((state) => ({ canCount: state.canCount + 1 })),
//   resetCanCount: () => set(() => ({ canCount: 0 })),
// }));

// export const useBoxesStore = create((set) => ({
//   boxCount: 0,
//   incrementBoxCount: () => set((state) => ({ boxCount: state.boxCount + 1 })),
//   resetBoxCount: () => set(() => ({ boxCount: 0 })),
// }));
export const useTimerStore = create((set) => ({
  activeTimer: 'pomodoro',
  startSeconds: 0,
  started: false,
  pomodoroSeconds: 0,
  shortBreakSeconds: 0,
  longBreakSeconds: 0,
  setPomodoroSeconds: (seconds) => set(() => ({ pomodoroSeconds: seconds })),
  setShortBreakSeconds: (seconds) =>
    set(() => ({ shortBreakSeconds: seconds })),
  setLongBreakSeconds: (seconds) => set(() => ({ longBreakSeconds: seconds })),
  setStarted: (started) => set(() => ({ started })),
  setStartSeconds: (seconds) => set(() => ({ startSeconds: seconds })),
  decrementStartSeconds: () =>
    set((state) => ({ startSeconds: state.startSeconds - 1 })),
  setActiveTimer: (type) => set(() => ({ activeTimer: type })),
}));
