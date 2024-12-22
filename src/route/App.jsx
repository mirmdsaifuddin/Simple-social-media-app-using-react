import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Headers from "../components/Headers";
import Footers from "../components/Footers";
import SideBar from "../components/SideBar";
import CreatePost from "../components/CreatePost";
import PostList from "../components/PostList";
import { useState } from "react";
import PostListProvider from "../store/post-list-store";
import { Outlet } from "react-router-dom";

function App() {
  const [SeletedTab, SetSelectedTab] = useState("Home");
  return (
    <PostListProvider>
      <div className="appContainer">
        <SideBar
          SeletedTab={SeletedTab}
          SetSelectedTab={SetSelectedTab}
        ></SideBar>
        <div className="content">
          <Headers></Headers>
          <Outlet></Outlet>
          <Footers></Footers>
        </div>
      </div>
    </PostListProvider>
  );
}

export default App;
