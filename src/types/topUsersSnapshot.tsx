type TopUser = {
    _id: string;
    uid: string;
    score: number;
    average_mcap_rank: number;
    rank: number;
    image: string;
    name: string;
    username: string;
};

export type TopUsersSnapshot = TopUser[];
