import Swal from "sweetalert2";
import { startLogin, startRegister } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";
import { useAppDispatch } from "../../store/store";
import "./login.css";

export const LoginScreen = () => {
  const [formLogin, handleInputLogin] = useForm({
    inEmail: "",
    inPassword: "",
  });
  const [formRegister, handleInputRegister] = useForm({
    registerName: "",
    registerEmail: "",
    registerPassword: "",
    registerConfirm: "",
  });

  const dispatch = useAppDispatch();

  const { inEmail, inPassword } = formLogin;
  const { registerName, registerEmail, registerPassword, registerConfirm } = formRegister;

  const handleLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(startLogin(inEmail, inPassword));
  };
  const isValid = () => {
    if (registerName.trim().length === 0) {
      Swal.fire("Error", "Name is requerid", "error");
      return false;
    }

    if (registerPassword !== registerConfirm || registerPassword.length < 5) {
      Swal.fire(
        "Error",
        "Password should be at least 5 characters and match",
        "error"
      );
      return false;
    }

    return true;
  };

  const handleRegisterSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isValid()) {
      dispatch(startRegister(registerName, registerEmail, registerPassword));
    }
  };

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Login</h3>
          <form onSubmit={handleLoginSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Email"
                name="inEmail"
                value={inEmail}
                onChange={handleInputLogin}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="inPassword"
                value={inPassword}
                onChange={handleInputLogin}
              />
            </div>
            <div className="form-group mb-2">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Register</h3>
          <form onSubmit={handleRegisterSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                name="registerName"
                value={registerName}
                onChange={handleInputRegister}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                name="registerEmail"
                value={registerEmail}
                onChange={handleInputRegister}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="registerPassword"
                value={registerPassword}
                onChange={handleInputRegister}
              />
            </div>

            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                name="registerConfirm"
                value={registerConfirm}
                onChange={handleInputRegister}
              />
            </div>

            <div className="form-group mb-2">
              <input type="submit" className="btnSubmit" value="Register" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
