import "../Modal/modal.css";
import { FaTimes } from "../icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebaseconfige";
import { updateUserData, setLoader } from "../../redux/auth/authslice";

export const Modal = ({ setShow, user }) => {
  const dispatch = useDispatch();
  const { updateDataStatus, getUserProfileStatus } = useSelector(
    (state) => state.auth
  );
  const [editUserData, setUserData] = useState({
    bio: user?.bio || "",
    portfolioLink: user?.portfolioLink || "",
    photo: "",
  });

  const [photoURL, setPhotoURL] = useState(
    user?.photoURL || "https://picsum.photos/200"
  );

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const profileHandler = (e) => {
    setUserData({ ...editUserData, photo: e.target.files[0] });
    const fileReader = new FileReader();
    fileReader.onload = function (event) {
      setPhotoURL(event.target.result);
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  const uploadFile = (e) => {
    e.preventDefault();
    const file = editUserData.photo;
    if (!file && editUserData.bio && editUserData.portfolioLink) {
      return dispatch(
        updateUserData({
          bio: editUserData.bio,
          portfolioLink: editUserData.portfolioLink,
        })
      );
    }
    const id = Math.random().toString(36).substring(2, 15);
    const fileNameStr = file.name.split(".");
    const extension = fileNameStr[fileNameStr.length - 1];
    const filePath = `profile/${id}.${extension}`;
    //storage ref
    const storage = getStorage(app);
    const imageRef = ref(storage, filePath);

    // Upload the file and metadata
    const uploadTask = uploadBytesResumable(imageRef, file);
    setLoader();
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        console.log(snapshot.totalBytes);
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
      },
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const newUser = {
            filePath,
            photoURL: downloadURL,
            bio: editUserData.bio,
            portfolioLink: editUserData.portfolioLink,
          };
          dispatch(updateUserData(newUser));
          setLoader();
        });
      }
    );
  };

  return (
    <div className="modal-outer-container">
      <div className="modal-for-edit-details flex-center flex-direction-column border-round">
        <div className="title-and-close-icon flex-center">
          <h4 className="title-of-modal">Edit Profile</h4>
          <FaTimes className="close-icon" onClick={() => setShow(false)} />
        </div>
        <div className="profile-picture-and-edit-btn-container flex-center flex-direction-column">
          <div className="edit-profile-header flex-center">
            <h4 className="header-name">Profile Picture</h4>
            <label className="edit-option">
              <input
                type="file"
                className="input-for-edit"
                accept="image/jpeg,image/png,image/webp"
                onChange={profileHandler}
                name="profile"
              />
              Edit
            </label>
          </div>
          <img className="avatar avatar-lg" src={photoURL} alt="user profile" />
        </div>
        <div className="bio-with-textarea-container flex-center flex-direction-column">
          <h4 className="bio-header">Bio</h4>
          <textarea
            cols="47"
            className="textarea-of-bio"
            placeholder="Enter Your Bio"
            onChange={(e) => onChangeHandler(e)}
            name="bio"
            value={editUserData.bio}
          />
        </div>
        <div className="protfolio-with-textarea-container flex-center flex-direction-column">
          <h4 className="portfolio-header">Portfolio Link</h4>
          <input
            type="url"
            className="input-of-portfolio"
            placeholder="Enter Your Portfolio link"
            onChange={(e) => onChangeHandler(e)}
            name="portfolioLink"
            value={editUserData.portfolioLink}
          />
        </div>
        <div className="btn-container flex-center">
          <button
            className="btn btn-secondary border-round"
            onClick={(e) => {
              uploadFile(e), setShow(false);
              setLoader();
            }}
          >
            Save
          </button>
        </div>
      </div>
      <div className="loader homepage">
        {updateDataStatus === "loading" && <Loader />}
        {getUserProfileStatus === "loading" && <Loader />}
      </div>
    </div>
  );
};
