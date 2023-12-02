import { useAppSelector } from '../redux/hooks'
import { selectUserAuthData } from '../redux/selectors'

export const useAuth = () => {
    const token = useAppSelector(selectUserAuthData)
    return token
}
