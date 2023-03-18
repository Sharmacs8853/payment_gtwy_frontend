import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {

    const navigate = useNavigate()
    const { isAuth, token } = useSelector((store) => store.authReducer);
    const store = useSelector((store) => store.authReducer);
    useEffect(() => {
        if (!isAuth && token === "") {
            navigate('/login')
        }
    }, [])
    console.log('fjskldj', store)
    return children;

}

export default PrivateRoute