import { BehaviorSubject } from "rxjs";

const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("currentUser"))
);

function logout() {
  localStorage.removeItem("currentUser");
  localStorage.removeItem("currentUserid");
  currentUserSubject.next(null);
}

export default logout;
