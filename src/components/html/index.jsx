import { useState } from 'react';
import { useTimerStore } from '../../hooks/store';
import classes from './index.module.css';
import { TimerComponent } from './timer';
import { TimerSelect } from './timer/select';
export function HtmlComponent() {
  const [showSelects, setShowSelects] = useState(false);
  const setPodomoroSeconds = useTimerStore((state) => state.setPomodoroSeconds);
  const setShortBreakSeconds = useTimerStore(
    (state) => state.setShortBreakSeconds
  );
  const setLongBreakSeconds = useTimerStore(
    (state) => state.setLongBreakSeconds
  );
  const setStartSeconds = useTimerStore((state) => state.setStartSeconds);

  function handleSelectTime({ value, label }) {
    if (label === 'pomodoro') {
      setPodomoroSeconds(Number(value));
      setStartSeconds(Number(value));
    } else if (label === 'short-break') {
      setShortBreakSeconds(Number(value));
    } else if (label === 'long-break') {
      setLongBreakSeconds(Number(value));
    }
  }
  return (
    <div className={classes.root}>
      <TimerComponent />
      <div className={classes.setters}>
        <div
          className={
            classes.setters__selects_container +
            ' ' +
            (showSelects ? '' : classes.hidden)
          }
        >
          <TimerSelect
            onChange={handleSelectTime}
            label='pomodoro'
            text='pomodoro'
          />
          <TimerSelect
            onChange={handleSelectTime}
            label='short-break'
            text='Short break'
          />
          <TimerSelect
            onChange={handleSelectTime}
            label='long-break'
            text='Long break'
          />
        </div>
        <button
          className={classes.setters__button}
          onClick={() => setShowSelects(!showSelects)}
        >
          {showSelects ? 'Hide' : 'Show'} Selects
        </button>
      </div>
    </div>
  );
}
