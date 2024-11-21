import classes from './index.module.css';

export function ButtonPrimary({ children, className, ...props }) {
  return (
    <button
      className={`${classes.button__root} ${classes.button__primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
export function ButtonSecondary({ children, className, ...props }) {
  return (
    <button
      className={`${classes.button__root} ${classes.button__secondary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
export function ButtonTertiary({ children, className, ...props }) {
  return (
    <button
      className={`${classes.button__root} ${classes.button__tertiary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
