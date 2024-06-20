import { ObjectId } from "mongodb";

interface Links {
    bio_link_1: string | null;
    twitter_link: string | null;
    discord_link: string | null;
    youtube_link: string | null;
    telegram_link: string | null;
    instagram_link: string | null;
    tik_tok_link: string | null;
    reddit_link: string | null;
}
export interface UserSession {
    _id: ObjectId;
    created_at: number;
    uid: string;
    username: string | null;
    name: string | null;
    image: string | null;
    description: string | null;
    links: Links;
}

export interface Session {
    user: UserSession;
    expiresAt: number;
}
