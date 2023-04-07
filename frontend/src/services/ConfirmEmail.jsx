import { Navigate, useParams } from 'react-router';
import { userAPI } from './UserService';

const ConfirmEmail = () => {
    const { id } = useParams();
    console.log(encodeURIComponent(id))
    userAPI.useConfirmEmailQuery(encodeURIComponent(id));
    return <Navigate to={'/'} replace />;
}

export default ConfirmEmail;