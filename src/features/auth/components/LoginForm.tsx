import { FormEventHandler, useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../slices/authApiSlice";
import { useAppDispatch } from "../../../app/hooks";
import { authActions } from "../slices/authSlice";

const LoginForm = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const handleSubmit: FormEventHandler = useCallback(
    async (event) => {
      event.preventDefault();
      const email = emailRef.current!.value;
      const password = passwordRef.current!.value;
      if (!!email.trim() && !!password.trim()) {
        try {
          const userData = await login({ username: email, password }).unwrap();
          dispatch(authActions.setCredentials({ ...userData }));
          setErrorMessage("");
          navigate("/dashboard");
        } catch (e: any) {
          if (!e?.data) {
            setErrorMessage("No Server Response");
          } else if (e.data?.status === 400) {
            setErrorMessage("Missing Username or Password");
          } else if (e.reponse?.data === 401) {
            setErrorMessage("Unauthorized");
          } else {
            setErrorMessage("Login Failed");
          }
        }
      }
    },
    [emailRef, passwordRef]
  );

  return (
    <form onSubmit={handleSubmit}>
      {errorMessage && <p>{errorMessage}</p>}
      <div>
        <label htmlFor="email">Email</label>
        <input autoFocus ref={emailRef} type="email" id="email" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input ref={passwordRef} type="password" id="password" />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
