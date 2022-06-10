import styles from './ButtonRow.module.scss';

type ButtonPropTypes = {
  children: any;
  selectedChild: any;
  onClick: (item: any) => void;
};

type ItemPropTypes = {
  text: string;
};

export default function ButtonRow({
  children,
  selectedChild,
  onClick,
}: ButtonPropTypes) {
  const ButtonHandler = () => {
    return children.map((item: ItemPropTypes) => {
      return (
        <button
          key={item.text}
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
