import classes from './index.module.css';
export function TimerSelect({ onChange, label, text }) {
  return (
    <label htmlFor={label} className={classes.label}>
      {text}
      <select
        className={classes.select}
        onChange={(e) => onChange({ value: e.target.value, label })}
        defaultValue={''}
      >
        <option value='' disabled>
          Select time
        </option>
        <option value={3}>3 segundo</option>
        <option value={300}>5 minutes</option>
        <option value={600}>10 minutes</option>
        <option value={900}>15 minutes</option>
        <option value={1200}>20 minutes</option>
        <option value={1500}>25 minutes</option>
        <option value={1800}>30 minutes</option>
        <option value={2100}>35 minutes</option>
        <option value={2400}>40 minutes</option>
        <option value={2700}>45 minutes</option>
        <option value={3000}>50 minutes</option>
        <option value={3300}>55 minutes</option>
        <option value={3600}>1 hour</option>
      </select>
    </label>
  );
}
