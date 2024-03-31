interface Links {
    bio_link_1: string;
    twitter_link: string;
    discord_link: string;
    youtube_link: string;
    telegram_link: string;
    instagram_link: string;
    tik_tok_link: string;
    reddit_link: string;
}
export interface UserSession {
    _id: string;
    date_created: number;
    uid: string;
    username: string;
    name: string;
    image: string;
    image_hi_res: string;
    description: string;
    links: Links;
}

export interface Session {
    user: UserSession;
    expiresAt: Date;
}
