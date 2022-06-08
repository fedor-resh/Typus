import {useSelector} from "react-redux";

export function useUserSelector() {
    return useSelector(state => state.user)
}
export function useRoomDataSelector() {
    return useSelector(state => state.roomData.value)
}