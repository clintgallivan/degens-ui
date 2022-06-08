import styles from './ButtonRow.module.scss';

export default function ButtonRow({ children, selectedChild, onClick }) {
  const ButtonHandler = () => {
    return children.map((item) => {
      return (
        <button
          onClick={() => onClick(item)}
          className={
            selectedChild == item.text ? styles.button_selected : styles.button
          }
        >
          {item.text}
        </button>
      );
    });
  };

  return <div>{ButtonHandler()}</div>;
}
