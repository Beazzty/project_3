import { FC, useState, Dispatch, SetStateAction } from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const REGISTER_MUTATION = gql`
  mutation AddUserInput($input: AddUserInput!) {
    addUser(input: $input) {
      token
      user {
        _id
        username
        email
        skillLevel
      }
    }
  }
`;

interface BasicInformationProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  confirmPassword: string;
  setConfirmPassword: Dispatch<SetStateAction<string>>;
}

const BasicInformation: FC<BasicInformationProps> = ({
    setStep,
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
  }) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    const isUsernameValid = username.trim().length > 0;
    const isEmailValid = emailRegex.test(email);
    const isPasswordValid = password.length >= 5;
    const passwordsMatch = password === confirmPassword;
  
    const canContinue =
      isUsernameValid && isEmailValid && isPasswordValid && passwordsMatch;
  
    return (
      <>
        <div className="text-4xl mb-4">Your Basic Information</div>
        <div className="flex flex-col gap-5 w-full">
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="username" className="text-lg">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border rounded px-3 py-2"
              required
            />
            {!isUsernameValid && (
              <p className="text-sm text-red-500">Username cannot be empty.</p>
            )}
          </div>
  
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="email" className="text-lg">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded px-3 py-2"
              required
            />
            {email.length > 0 && !isEmailValid && (
              <p className="text-sm text-red-500">
                Enter a valid email address.
              </p>
            )}
          </div>
  
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="password" className="text-lg">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded px-3 py-2"
              required
              minLength={5}
            />
            {password.length > 0 && !isPasswordValid && (
              <p className="text-sm text-red-500">
                Password must be at least 5 characters.
              </p>
            )}
          </div>
  
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="confirm_password" className="text-lg">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              id="confirm_password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border rounded px-3 py-2"
              required
              minLength={5}
            />
            {confirmPassword.length > 0 && !passwordsMatch && (
              <p className="text-sm text-red-500">Passwords do not match.</p>
            )}
          </div>
  
          <div className="w-full flex items-center justify-center">
            <button
              type="button"
              disabled={!canContinue}
              className={`border rounded px-3 py-2 uppercase cursor-pointer ${
                !canContinue ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => setStep(2)}
            >
              Continue
            </button>
          </div>
        </div>
      </>
    );
  };

interface LevelInformationProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  level: string;
  setLevel: Dispatch<SetStateAction<string>>;
}

const LevelInformation: FC<LevelInformationProps> = ({
  setStep,
  level,
  setLevel,
}) => {
  const canContinue = level !== "";

  return (
    <>
      <div className="text-4xl mb-4">Pick your Spanish Level</div>
      <div className="flex flex-col gap-5 w-full">
        <div className="flex flex-col gap-2 w-full">
          <label className="text-lg">
            Select Level <span className="text-red-500">*</span>
          </label>
          {["BEGINNER", "INTERMEDIATE", "ADVANCED"].map((option) => (
            <label key={option} className="inline-flex items-center gap-2">
              <input
                type="radio"
                name="level"
                value={option}
                checked={level === option}
                onChange={(e) => setLevel(e.target.value)}
                className="form-radio"
              />
              <span>{option}</span>
            </label>
          ))}
          {!canContinue && (
            <p className="text-sm text-red-500">Please select your level.</p>
          )}
        </div>
        <div className="w-full flex items-center justify-center">
          <button
            type="button"
            disabled={!canContinue}
            className={`border rounded px-3 py-2 uppercase cursor-pointer ${
              !canContinue ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => setStep(3)}
          >
            Continue
          </button>
        </div>
      </div>
    </>
  );
};

interface ReviewAndSubmitProps {
  username: string;
  email: string;
  password: string;
  level: string;
}

const ReviewAndSubmit: FC<ReviewAndSubmitProps> = ({
  username,
  email,
  password,
  level,
}) => {
  const navigate = useNavigate();
  const [addUser, { loading, error }] = useMutation(REGISTER_MUTATION, {
    onCompleted({ addUser }) {
      localStorage.setItem("token", addUser.token);
      localStorage.setItem('user', JSON.stringify(addUser.user))
      navigate('/quiz', { replace: true })
    },
  });

  return (
    <>
      <div className="text-4xl mb-4">Confirm & Register</div>
      <div className="flex flex-col gap-4 w-full max-w-md">
        <p>
          <strong>Username:</strong> {username}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Level:</strong> {level}
        </p>
        {error && <p className="text-sm text-red-500">Error: {error.message}</p>}
        <button
          onClick={() =>
            addUser({
              variables: {
                input: {
                  username,
                  email,
                  password,
                  skillLevel: level,
                },
              },
            })
          }
          disabled={loading}
          className={`mt-4 border rounded px-3 py-2 uppercase w-full cursor-pointer ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Registering…" : "Register"}
        </button>
      </div>
    </>
  );
};

const RegisterPage: FC = () => {
  const [step, setStep] = useState<number>(1);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [level, setLevel] = useState<string>("");

  return (
    <>
      {step === 1 && (
        <BasicInformation
          step={step}
          setStep={setStep}
          username={username}
          setUsername={setUsername}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
        />
      )}
      {step === 2 && (
        <LevelInformation step={step} setStep={setStep} level={level} setLevel={setLevel} />
      )}
      {step === 3 && (
        <ReviewAndSubmit
          username={username}
          email={email}
          password={password}
          level={level}
        />
      )}
    </>
  );
};

export default RegisterPage;
