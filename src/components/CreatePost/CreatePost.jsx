import React, { useState } from "react";
import { GrImage, AiOutlineFileGif, BsEmojiSmile } from "../icons";
import "../CreatePost/createpost.css";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addPosts, editPost } from "../../redux/post/postSlice";
import Picker from "emoji-picker-react-2";
import { Link } from "react-router-dom";
import { Loader } from "../Loader/Loader";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebaseconfige";
import { setLoading } from "../../redux/post/postSlice";

export const CreatePost = ({
  postData,
  setPostData,
  isEditing,
  setIsEditing,
  imgUrl,
  setImgUrl,
}) => {
  const [showEmoji, setShowEmoji] = useState(false);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { editPostStatus, status, deletePostStatus } = useSelector(
    (state) => state.post
  );

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setPostData((prevData) => ({ ...prevData, [name]: value }));
  };

  const imageChangeHandler = (e) => {
    setPostData({ ...postData, image: e.target.files[0] });
    const fileReader = new FileReader();
    fileReader.onload = function (event) {
      setImgUrl(event.target.result);
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };
  const createPostclickHandler = () => {
    if (postData.content === "") {
      toast("please fill the form field", { icon: "✔" });
    } else if (postData && isEditing) {
      dispatch(editPost(postData));
      setIsEditing(!isEditing);
    } else {
      dispatch(
        addPosts({
          ...postData,
          createdAt: Date.now(),
          userId: user.id,
        })
      );
    }
    setPostData({ content: " " });
    setImgUrl("");
  };

  const cancelupdatePostHandler = () => {
    setIsEditing(false);
    setPostData({ content: " " });
    setImgUrl("");
  };
  const onEmojiClick = (e, emojiObject) => {
    e.preventDefault();
    setPostData((prevData) => ({
      ...prevData,
      content: postData.content + emojiObject.emoji,
    }));
    setShowEmoji(false);
  };

  const uploadFile = (e) => {
    e.preventDefault();
    const file = postData.image;
    if (!file && postData.content) {
      return createPostclickHandler();
    }
    const id = Math.random().toString(36).substring(2, 15);
    const fileNameStr = file.name.split(".");
    const extension = fileNameStr[fileNameStr.length - 1];
    const filePath = `postImage/${id}.${extension}`;
    //storage ref
    const storage = getStorage(app);
    const imageRef = ref(storage, filePath);

    // Upload the file and metadata
    const uploadTask = uploadBytesResumable(imageRef, file);
    setLoading();
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
          const newPost = {
            filePath,
            imgUrl: downloadURL,
            content: postData.content,
            userId: user.id,
            createdAt: Date.now(),
          };
          if (!isEditing) {
            dispatch(addPosts(newPost));
            setPostData({ content: "" });
            setImgUrl("");
          } else {
            dispatch(
              editPost({
                filePath,
                id: postData.id,
                content: postData.content,
                imgUrl: downloadURL,
              })
            );
            setPostData({ content: "" });
            setImgUrl("");
            setIsEditing(false);
          }
        });
      }
    );
  };

  return (
    <div className="create-post-container flex-center border-round">
      <div className="avatar-image-container">
        <Link to={`/profile/${user.id}`}>
          <img
            className="avatar avatar-xsm"
            src={user.photoURL ? user.photoURL : "https://picsum.photos/200"}
            alt="user profile"
          />
        </Link>
      </div>
      <div className="textarea-with-icon-container flex-center flex-direction-column">
        <textarea
          cols="50"
          className="textarea-of-createPost"
          placeholder="Write something interesting... "
          name="content"
          id="content"
          value={postData.content}
          onChange={(e) => changeHandler(e)}
          required
        />
        {imgUrl != "" && (
          <div className="post-image">
            <img className="responsive-image" alt="post-image" src={imgUrl} />
          </div>
        )}
        <div className="icons-and-post-btn-container flex-center">
          <div className="icons-container flex-center">
            <label className="label-for-icons flex-center">
              <input
                type="file"
                className="input-for-image"
                accept="image/jpeg,image/png,image/webp"
                onChange={imageChangeHandler}
              />
              <GrImage className="icons" />
            </label>
            <AiOutlineFileGif className="icons" />
            <BsEmojiSmile
              className="icons"
              onClick={() => setShowEmoji((showEmoji) => !showEmoji)}
            />
          </div>

          <span className="btn-container flex-center">
            {isEditing && (
              <button
                className="btn btn-of-post border-round"
                onClick={cancelupdatePostHandler}
              >
                Cancel
              </button>
            )}
            <button
              className="btn btn-of-post border-round"
              onClick={(e) => {
                e.preventDefault();
                uploadFile(e);
              }}
            >
              {isEditing ? "Update Post" : "Post"}
            </button>
          </span>
        </div>
      </div>

      {showEmoji && (
        <div className="emojicontainer">
          <Picker onEmojiClick={onEmojiClick} className="picker-emoji" />
        </div>
      )}
      <div className="loader homepage">
        {editPostStatus === "loading" && <Loader />}
        {status === "loading" && <Loader />}
        {deletePostStatus === "loading" && <Loader />}
      </div>
    </div>
  );
};
