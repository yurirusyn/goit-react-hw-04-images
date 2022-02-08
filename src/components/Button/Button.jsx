import s from './button.module.css';

const Button = ({ onClick }) => {
  return (
    <button onClick={onClick} className={s.Button} type="button">
      More
    </button>
  );
};

export default Button;
