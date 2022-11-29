import Card from '@components/common/Card';
import RetroButton from '@components/common/RetroButton';
import styles from './AccountSection.module.scss';
import SocialLinksInputCard from './components/SocialLinksInputCard';

export default function AccountSection({ props }: any) {
  const BioInput = () => {
    return (
      <div className={styles.bio_input_container}>
        <textarea
          className={styles.input}
          placeholder="Enter bio here"
          name="name"
          maxLength={160}

          // onChange={(e) => onChange(e.target.value)}
        />
      </div>
    );
  };
  return (
    <>
      <div className="content-area">
        <div className={styles.container}>
          <Card>
            <div className={styles.title_text}>Account Settings</div>
            <div className={styles.card_container}>
              <div className={styles.header_text}>About</div>
              <div className={styles.sub_header_container}>
                <div className={styles.sub_header_text}>Bio</div>
                <BioInput />
              </div>
              <div className={styles.header_text}>Social Links</div>
              <div className={styles.link_columns_container}>
                <div className={styles.column_container}>
                  <div className={styles.sub_header_container}>
                    <div className={styles.sub_header_text}>Instagram</div>
                    <SocialLinksInputCard props={props} />
                  </div>
                  <div className={styles.sub_header_container}>
                    <div className={styles.sub_header_text}>Youtube</div>
                    <SocialLinksInputCard props={props} />
                  </div>

                  <div className={styles.sub_header_container}>
                    <div className={styles.sub_header_text}>TikTok</div>
                    <SocialLinksInputCard props={props} />
                  </div>
                </div>

                <div className={styles.column_container}>
                  <div className={styles.sub_header_container}>
                    <div className={styles.sub_header_text}>Reddit</div>
                    <SocialLinksInputCard props={props} />
                  </div>
                  <div className={styles.sub_header_container}>
                    <div className={styles.sub_header_text}>Other</div>
                    <SocialLinksInputCard props={props} />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
