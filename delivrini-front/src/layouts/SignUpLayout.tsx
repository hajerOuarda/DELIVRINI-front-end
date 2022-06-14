import { ReactElement, useEffect } from "react"; 
import SignUpPage from "../pages/SignUpPage";
import { listRestaurantAction } from "../store/actions/restaurantAction";
 import { useAppDispatch } from "../store/hooks";

interface Props {
    children: React.ReactNode | ReactElement[] ;
}
const SignUpLayout = (props :Props) => {
     const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch<any>(
            listRestaurantAction(0, 50)
        )
    }, []);
    return (
        <>
            <SignUpPage /> 
        </>
    );
};

export default SignUpLayout;
