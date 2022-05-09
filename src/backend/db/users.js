import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Adarsh",
    lastName: "Balika",
    username: "adarshbalika",
    password: "adarshBalika123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    profilePic:"https://ik.imagekit.io/qrhnvir8bf0/videolibararyimages/you17_Ce73x_iFLF.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1649502739841"
  },
  {
    _id: uuid(),
    firstName: "Mariya",
    lastName: "Sada",
    username: "Mariyasada",
    password: "Mariyasada123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Adarsh",
    lastName: "Balak",
    username: "adarshbalak",
    password: "adarshBalak123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Riya",
    lastName: "Sada",
    username: "riyasada",
    password: "riyasada123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Maya",
    lastName: "Soni",
    username: "mayasoni",
    password: "mayasoni123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
