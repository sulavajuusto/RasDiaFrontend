import { BehaviorSubject } from "rxjs";

const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("currentUser"))
);

const currentUser = currentUserSubject.asObservable();

export default currentUser;
