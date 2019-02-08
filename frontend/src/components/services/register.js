import { BehaviorSubject } from "rxjs";
import axios from "axios";

import handleResponse from "./handleResponse";

const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("currentUser"))
);

function register(username, password) {
  return (
    axios({
      method: "post",
      url: "https://rasdiaweb.azurewebsites.net/api/users/register",
      data: {
        username: username,
        password: password
      }
    })
      //   .then(handleResponse);
      .then(user => {
        localStorage.setItem("currentUserid", JSON.stringify(user.data.id));
        localStorage.setItem("currentUser", JSON.stringify(user.data.token));
        currentUserSubject.next(user);
      })
  );
}

export default register;
