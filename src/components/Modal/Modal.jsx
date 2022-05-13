import "../Modal/modal.css";
import { FaTimes } from "../icons";

export const Modal = ({ setShow }) => {
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
                accept="image/jpeg,image/png,image/webp, image/gif"
              />
              Edit
            </label>
          </div>
          <img
            className="avatar avatar-lg"
            src="https://picsum.photos/200"
            alt="user profile"
          />
        </div>
        <div className="bio-with-textarea-container flex-center flex-direction-column">
          <h4 className="bio-header">Bio</h4>
          <textarea
            cols="47"
            className="textarea-of-bio"
            placeholder="Enter Your Bio"
          />
        </div>
        <div className="protfolio-with-textarea-container flex-center flex-direction-column">
          <h4 className="portfolio-header">Portfolio Link</h4>
          <input
            type="url"
            className="input-of-portfolio"
            placeholder="Enter Your Portfolio link"
          />
        </div>
        <div className="btn-container flex-center">
          <button className="btn btn-secondary border-round">Save</button>
        </div>
      </div>
    </div>
  );
};
