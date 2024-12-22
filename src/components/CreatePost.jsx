import { useContext, useRef } from "react";
import { PostList } from "../store/post-list-store";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {

  const{addPost}=useContext(PostList);
  const navigate=useNavigate();
  
  let useridElement=useRef();
  let titleElement=useRef();
  let bodyElement=useRef();
  let reactionElement=useRef();
  let tagsElement=useRef();


const handledChange=(event)=>{
  event.preventDefault('');
  let userid=useridElement.current.value;
  let title=titleElement.current.value;
  let body=bodyElement.current.value;
  let reaction=reactionElement.current.value;
  let tags=tagsElement.current.value.split(' ');

  

   useridElement.current.value='';
   titleElement.current.value='';
   bodyElement.current.value='';
   reactionElement.current.value='';
   tagsElement.current.value='';

   fetch('https://dummyjson.com/posts/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: title,
      body: body,
      reactions: {likes:reaction,dislikes:reaction},
      userId: userid,
      tags: tags,
    })
  })
  .then(res => res.json())
  .then((post)=>{addPost(post)});
  navigate("/")

    };
    
  
  return (
    <form className="create-post" onSubmit={handledChange}>
      <div className="mb-3">
        <label htmlFor="userId" className="form-label">
          Enter Your user ID.
        </label>
        <input
        ref={useridElement}
          type="userId"
          className="form-control"
          id="userId"
          placeholder="Your User ID"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
         Post Title .
        </label>
        <input
        ref={titleElement}
          type="Text"
          className="form-control"
          id="title"
          placeholder="How are You feeling today.."
        />
      </div>
      <div className="mb-3">
        <label htmlFor="body" className="form-label">
          Post Content.
        </label>
        <textarea
        ref={bodyElement}
          type="text" rows="5"
          className="form-control"
          id="userId"
          placeholder="Write Your post Content"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="reaction" className="form-label">
          Number Of Reactions.
        </label>
        <input
        ref={reactionElement}
          type="userId"
          className="form-control"
          id="userId"
          placeholder="How many people reacted to this post"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="tags" className="form-label">
          Write Your Hastags.
        </label>
        <input
        ref={tagsElement}
          type="userId"
          className="form-control"
          id="userId"
          placeholder="Hastags"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Post
      </button>
    </form>
  );
};

export default CreatePost;
