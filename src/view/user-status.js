
import {generateProfile} from "./profile";
export const createUserStatusTemplate = (rank) => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${rank}</p>
      <img class="profile__avatar" src="${generateProfile}" alt="Avatar" width="35" height="35">
    </section>`
  );
};
