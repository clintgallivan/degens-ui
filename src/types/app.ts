import { ObjectId } from "mongodb";

export type SystemInfo = {
    _id: ObjectId;
    maintenance_mode_enabled: boolean;
    sign_up_enabled: boolean;
    login_enabled: boolean;
};
