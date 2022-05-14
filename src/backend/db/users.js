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
    bio:"full-stack-developer",
    website:"adarshbalika.netlify.app",
    profile:"https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZSUyMGltYWdlc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
  },
  {
    _id: uuid(),
    firstName: "Mariya",
    lastName: "Sada",
    username: "mariyasada",
    password: "mariyasada123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bio:"Aspiring web developer",
    website:"mariyasada.netlify.app",
    profile:"https://ik.imagekit.io/qrhnvir8bf0/1640269829878_G2PxQ9-Ra.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1652437792754"
  },
  {
    _id: uuid(),
    firstName: "John",
    lastName: "Deo",
    username: "john",
    password: "john123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bio:"",
    website:"johndeo.netlify.app",
    profile:"https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmlsZSUyMGltYWdlcyUyMG1lbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
  },
  {
    _id: uuid(),
    firstName: "Ajay",
    lastName: "Malik",
    username: "ajay",
    password: "ajay123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bio:"software engineer at TCS",
    website:"",
    profile:"https://images.unsplash.com/photo-1610024062303-e355e94c7a8c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fHByb2ZpbGUlMjBpbWFnZXMlMjBtZW58ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
  },
  {
    _id: uuid(),
    firstName: "Maya",
    lastName: "Soni",
    username: "mayasoni",
    password: "mayasoni123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bio:"student",
    website:"",
    profile:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
  },
  {
    _id: uuid(),
    firstName: "Bhakti",
    lastName: "Kharatkar",
    username: "bhakti",
    password: "bhakti",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    bio:"Front-end-developer",
    website:"bhaktikharatkar.netlify.app",
    profile:"https://ik.imagekit.io/qrhnvir8bf0/bhakti_3FWSPknhE.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1652437791804"
  },
];
