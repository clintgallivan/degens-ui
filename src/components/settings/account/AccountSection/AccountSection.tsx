import Card from '@components/common/Card';
import RetroButton from '@components/common/RetroButton';
import styles from './AccountSection.module.scss';
import SocialLinksInputCard from './components/SocialLinksInputCard';
import { useState } from 'react';
import { AccountPageProps } from 'src/pages/settings/account';
import BioInputCard from './components/BioInputCard';
import { useToast } from '@context/toastContext';

export default function AccountSection({ props }: { props: AccountPageProps }) {
    const [bio, setBio] = useState(props.user?.description || '');
    const [instagramLink, setInstagramLink] = useState(props.user?.links?.instagram_link || '');
    const [youtubeLink, setYoutubeLink] = useState(props.user?.links?.youtube_link || '');
    const [tiktokLink, setTiktokLink] = useState(props.user?.links?.tik_tok_link || '');
    const [redditLink, setRedditLink] = useState(props.user?.links?.reddit_link || '');
    const [otherLink, setOtherLink] = useState(props.user?.links?.bio_link_1 || '');

    const { showSuccessToast, showErrorToast } = useToast();

    const handleSubmit = async () => {
        showSuccessToast('Profile Updated', 'Your profile has been updated successfully!');
        // const validateEmail = () =>
        //     String(email)
        //         .toLowerCase()
        //         .match(
        //             /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        //         );
        // if (validateEmail() != null) {
        //     try {
        //         const res = await axios.post(
        //             '/api/email',
        //             { email },
        //             {
        //                 headers: {
        //                     'Content-Type': 'application/json',
        //                 },
        //             },
        //         );
        //         res.status === 201 ? setEmailSuccessAlert(true) : null;
        //     } catch (e) {
        //         setEmailAlert(true);
        //     }
        // } else {
        //     setEmailAlert(true);
        // }
    };

    return (
        <>
            <div className="content-area">
                <div className={styles.container}>
                    <Card>
                        <div className={styles.title_text}>Account Settings</div>
                        <div className={styles.sub_title_text}>
                            Updating these settings will allow all users to view your bio and social
                            links on your profile.
                        </div>
                        <div className={styles.card_container}>
                            <div className={styles.header_text}>About</div>
                            <div className={styles.sub_header_container}>
                                <div className={styles.sub_header_text}>Bio</div>
                                <BioInputCard bio={bio} setBio={setBio} />
                            </div>
                            <div className={styles.header_text}>Social Links</div>
                            <div className={styles.link_columns_container}>
                                <div className={styles.column_container}>
                                    <div className={styles.sub_header_container}>
                                        <div className={styles.sub_header_text}>Instagram</div>
                                        <SocialLinksInputCard
                                            link={instagramLink}
                                            setLink={setInstagramLink}
                                        />
                                    </div>
                                    <div className={styles.sub_header_container}>
                                        <div className={styles.sub_header_text}>Youtube</div>
                                        <SocialLinksInputCard
                                            link={youtubeLink}
                                            setLink={setYoutubeLink}
                                        />
                                    </div>

                                    <div className={styles.sub_header_container}>
                                        <div className={styles.sub_header_text}>TikTok</div>
                                        <SocialLinksInputCard
                                            link={tiktokLink}
                                            setLink={setTiktokLink}
                                        />
                                    </div>
                                </div>

                                <div className={styles.column_container}>
                                    <div className={styles.sub_header_container}>
                                        <div className={styles.sub_header_text}>Reddit</div>
                                        <SocialLinksInputCard
                                            link={redditLink}
                                            setLink={setRedditLink}
                                        />
                                    </div>
                                    <div className={styles.sub_header_container}>
                                        <div className={styles.sub_header_text}>Other</div>
                                        <SocialLinksInputCard
                                            link={otherLink}
                                            setLink={setOtherLink}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.submit_button_container}>
                            <RetroButton onClick={() => handleSubmit()}>
                                <div className={styles.submitButtonText}>
                                    Update Profile Settings
                                </div>
                            </RetroButton>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
}
