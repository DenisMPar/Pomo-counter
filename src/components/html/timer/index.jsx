import { useCountStore, useTimerStore } from '../../../hooks/store';
import { useTimer } from '../../../hooks/timer';
import { ButtonPrimary, ButtonSecondary, ButtonTertiary } from '../ui/buttons';
import classes from './index.module.css';

export function TimerComponent() {
  const { minutes, remainingSeconds, allSecondsSetted } = useTimer();
  const activeTimer = useTimerStore((state) => state.activeTimer);
  const setStarted = useTimerStore((state) => state.setStarted);
  const started = useTimerStore((state) => state.started);
  const setStartSeconds = useTimerStore((state) => state.setStartSeconds);
  const pomodoroSeconds = useTimerStore((state) => state.pomodoroSeconds);
  const setActiveTimer = useTimerStore((state) => state.setActiveTimer);

  const pomodoroCounts = useCountStore((state) => state.pomodoroCount);
  const cansCount = useCountStore((state) => state.cansCount);
  const boxesCount = useCountStore((state) => state.boxesCount);
  return (
    <div className={classes.timer_root}>
      <div>
        <span>{activeTimer}</span>
        <h1 className={classes.timer__title}>
          {String(minutes).padStart(2, '0')}:
          {String(remainingSeconds).padStart(2, '0')}
        </h1>
      </div>
      <div className={classes.timer__buttons_container}>
        <ButtonPrimary
          disabled={!allSecondsSetted}
          onClick={() => setStarted(true)}
        >
          Start
        </ButtonPrimary>
        <ButtonSecondary disabled={!started} onClick={() => setStarted(false)}>
          Pause
        </ButtonSecondary>
        <ButtonTertiary
          className={classes.timer__reset_button}
          disabled={!allSecondsSetted}
          onClick={() => {
            setStartSeconds(pomodoroSeconds);
            setActiveTimer('pomodoro');
            setStarted(false);
          }}
        >
          Resettt
        </ButtonTertiary>
      </div>
    </div>
  );
}
