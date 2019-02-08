import { BehaviorSubject } from "rxjs";

const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem("currentUser"))
);

const currentUserValue = {
  currentUserValue: currentUserSubject.value
};

export default currentUserValue;
