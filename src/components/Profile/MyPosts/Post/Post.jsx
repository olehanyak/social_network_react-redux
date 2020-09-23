import React from "react";
import post from "./Post.module.css";

const Post = (props) => {
    return (
        <div className={post.item}>
            <img
                className={post.img}
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSuRBFgBGO67Dxq9V-9vR3SsKBAhssT5hiqKsSFtK4jxuTkRxd1&usqp=CAU"
                alt=""
            />
            {props.message}
            <div>
                <span>{`Like: ${props.like}`}</span>
            </div>
        </div>
    );
};

export default Post;
