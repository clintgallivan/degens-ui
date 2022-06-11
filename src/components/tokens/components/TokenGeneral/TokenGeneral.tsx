import styles from './TokenGeneral.module.scss';
import RetroToken from '@components/common/RetroToken';
import LinkIconRow from './LinkIconRow';
import TagsRow from './TagsRow';

export default function TokenGeneral({ props }: any) {
  const description = () => {
    const defaultValue = props.tokenMetadata[0].description;
    const cleanText = defaultValue.replace(/<\/?[^>]+(>|$)/g, '');
    const slicedValue = cleanText.slice(0, cleanText.indexOf('.') + 1);
    return slicedValue;
  };

  return (
    <div className={styles.container}>
      <div className={styles.icon_container}>
        <RetroToken props={props} />
      </div>
      <div className={styles.text_column}>
        <p className="fs-xxl fw-xxb">{props.tokenMetadata[0].name}</p>
        <p className="fs-xsm fw-b">{description()}</p>
        <LinkIconRow props={props} />
        <TagsRow props={props} />
      </div>
    </div>
  );
}
