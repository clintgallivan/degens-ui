import Card from "@components/common/Card";
import RetroButton from "@components/common/RetroButton";
import styles from "./AccountSection.module.scss";
import SocialLinksInputCard from "./components/SocialLinksInputCard";
import { useState } from "react";
import { AccountPageProps } from "src/pages/settings/account";
import BioInputCard from "./components/BioInputCard";
import { useToast } from "@context/toastContext";
import { ResData } from "src/pages/api/handle-update-account-settings";
import { clientApi, toAxiosError } from "@utils/api";

export default function AccountSection({ props }: { props: AccountPageProps }) {
    const [name, setName] = useState(props?.session?.user?.name || "");
    const [bio, setBio] = useState(props?.session?.user?.description || "");
    const [instagramLink, setInstagramLink] = useState(
        props?.session?.user?.links?.instagram_link || ""
    );
    const [youtubeLink, setYoutubeLink] = useState(props?.session?.user?.links?.youtube_link || "");
    const [tiktokLink, setTiktokLink] = useState(props?.session?.user?.links?.tik_tok_link || "");
    const [redditLink, setRedditLink] = useState(props?.session?.user?.links?.reddit_link || "");
    const [otherLink, setOtherLink] = useState(props?.session?.user?.links?.bio_link_1 || "");

    const { showSuccessToast, showErrorToast } = useToast();

    const handleSubmit = async () => {
        try {
            const res = await clientApi.post<ResData>("/api/handle-update-account-settings", {
                _id: props?.session?.user?._id || null,
                uid: props?.session?.user?.uid || null,
                name: name.length > 0 ? name : "Anon",
                bio: bio.length > 0 ? bio : null,
                instagramLink: instagramLink.length > 0 ? instagramLink : null,
                youtubeLink: youtubeLink.length > 0 ? youtubeLink : null,
                tiktokLink: tiktokLink.length > 0 ? tiktokLink : null,
                redditLink: redditLink.length > 0 ? redditLink : null,
                otherLink: otherLink.length > 0 ? otherLink : null,
            });
            showSuccessToast("Success", res?.data?.message || "");
        } catch (error: any) {
            const axiosError = toAxiosError(error);
            showErrorToast("Failure", axiosError?.data?.message || error?.message || "");
        }
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
                            <div className={styles.header_text}>Account</div>
                            <div className={styles.link_columns_container}>
                                <div className={styles.sub_header_container}>
                                    <div className={styles.sub_header_text}>Name</div>
                                    <SocialLinksInputCard link={name} setLink={setName} />
                                </div>
                                <div className={styles.sub_header_container}>
                                    <div className={styles.sub_header_text}>Profile Picture</div>
                                </div>
                            </div>
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
