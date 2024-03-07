interface User {
    name: string;
    image: string;
    image_hi_res: string;
    uid: string;
    username: string;
}

export interface Session {
    user: User;
    expires: string;
}
