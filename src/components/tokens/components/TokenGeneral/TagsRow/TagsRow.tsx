import ChipCard from '@components/common/ChipCard';
import { Row } from 'react-bootstrap';
import styles from './TagsRow.module.scss';

export default function TagsRow({ props }) {
  const tags = props.tokenMetadata[0].categories;

  const Tags = () => {
    return tags.map((item) => {
      return item ? (
        <div className={styles.tag_container}>
          <ChipCard key={item} children={`#${item}`} button />
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
