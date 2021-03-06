import ChipCard from '@components/common/ChipCard';
import { Row } from 'react-bootstrap';
import styles from './TagsRow.module.scss';

export default function TagsRow({ props }: any) {
  const tags = props.tokenMetadata[0].categories;

  const Tags = () => {
    return tags.map((item: any) => {
      return item ? (
        <div key={item} className={styles.tag_container}>
          <ChipCard button>{`#${item}`}</ChipCard>
        </div>
      ) : null;
    });
  };
  return (
    <div className={styles.container}>
      <Tags />
    </div>
  );
}
