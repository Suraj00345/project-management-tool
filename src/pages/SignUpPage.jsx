import { Helmet } from "react-helmet";
import FloatingElements from "../components/Auth/FloatingElements";
import SignUpForm from "../components/Auth/SignUpForm";
import VerificationForm from "../components/Auth/verificationForm";
import { useRegistrationStore } from "../store/useRegisrationStore";

export default function Signup() {
  const showState = useRegistrationStore((state) => state.state);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 flex items-center justify-center">
      <Helmet>
        <title>Sign Up | Organivo</title>
        <meta name="description" content="Create your Organivo account." />
      </Helmet>
      <FloatingElements />

      {/* Main SignUp page start from here*/}

      <section className="w-full">
        {showState === "REGISTER" && <SignUpForm />}
        {showState === "VERIFY" && <VerificationForm />}
      </section>
    </div>
  );
}
