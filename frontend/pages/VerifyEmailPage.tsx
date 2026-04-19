import VerifyEmail from "../components/VerifyEmail";
import {useLocation} from "react-router-dom";

export default function VerifyEmailPage() {
    const location = useLocation();
  const isResendMode = location.state?.tokenRequired || false;
    return (
        <VerifyEmail tokenRequired={isResendMode} />
    )
}
