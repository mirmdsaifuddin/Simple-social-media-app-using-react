import { createContext, useCallback, useReducer,useState,useEffect } from "react";

const default_context = {
  postList: [],
  addPost: () => {},
  fetching:false,
  deletePost: () => {},
};


export const PostList = createContext(default_context);

const postListReducer = (currVal, action) => {
  let newPostList = currVal;
  if (action.type === "DELETE") {
    newPostList = currVal.filter((post) => post.id !== action.payload.postId);
  }
  else if(action.type==='ADD_INITIAL_POSTS'){
    newPostList=action.payload.posts;
  }
  else if(action.type==='ADD'){
    newPostList=[action.payload,...currVal]
  }
  return newPostList;
};

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(
    postListReducer,
    []
  );

  const addPost = (post) => {

    dispatchPostList({
      type:"ADD",
      payload:post,
    })
  };

  const addInitialPosts = (posts) => {

    dispatchPostList({
      type:"ADD_INITIAL_POSTS",
      payload:{
        posts,
      }
    })
  };
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true);
    const controller=new AbortController();
    const signal=controller.signal;

    fetch("https://dummyjson.com/posts",{ signal})
      .then((res) => res.json())
      .then((data) => {
        addInitialPosts(data.posts);
        setFetching(false);
      });
      return ()=>{
       
        controller.abort();
      }
  }, []);

  // const handledGetPostClicked=()=>{
  //   //this can be achieved by useeffect hook to reduce onclick function to render every time when changed in state.
  //   fetch('https://dummyjson.com/posts')
  //   .then(res => res.json())
  //   .then((data)=>{
  //     addInitialPosts(data.posts)
  //   });
  // }


  const deletePost = useCallback((postId) => {
    //console.log(`deleted post ${postId}`)
    dispatchPostList({
      type: "DELETE",
      payload: {
        postId,
      },
    });
  },[dispatchPostList]);

  return (
    <PostList.Provider value={{ postList, addPost,fetching, deletePost }}>
      {children}
    </PostList.Provider>
  );
};
export default PostListProvider;
