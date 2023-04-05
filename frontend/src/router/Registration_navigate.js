import { useSelector } from "react-redux"

export default () => {
    const {isAuth, type} = useSelector(state => state.user)
}