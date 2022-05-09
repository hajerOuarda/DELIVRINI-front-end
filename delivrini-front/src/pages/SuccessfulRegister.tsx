import { Link } from "react-router-dom";
import { paths } from "../utils/enums/routes";

export function SuccessfulRegisterPage() {
    return <p>you are successfully register , now go sign in
        <Link to={paths.signin} > Sign in here !</Link>
    </p>;
}