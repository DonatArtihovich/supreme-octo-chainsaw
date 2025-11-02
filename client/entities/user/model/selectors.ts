import { RootState } from "@/app/store";
import { createStatusObjectSelector } from "@/shared/lib";

export const userSelector = (state: RootState) => state.user.user;
export const fetchUserStatusSelector = createStatusObjectSelector(
    (state) => state.user.fetchUserStatus
);