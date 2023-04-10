import React from 'react'
import { ChatBubbleOutlined,
    FavoriteBorderOulines,
    FavoriteOutlined,
    ShareOutlined
} from '@mui/icons-material'
import {Box, Divider,Iconbutton,Typography,useTheme } from '@mui/material';
import FlexBetween from '../../components/FlexBetween';
import Friend from "components/Friend"
import WidgetWrapper from '../../components/WidgetWrapper';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import state, { setPost } from '../../state';
 
likes={
  "useriddsfadf":true,
  "userid2":true
}

const PostWidget = ({
  
  postId,
  postUserId,
  name, 
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
})=>{
  const {palette}=useTheme();
    const dispatch = useDispatch();
    const [isComments, setIsComments]=useState(false);
    const loggedInUserId=useSelector((state)=>state)
    const isLiked=Boolean(likes[loggedInUserId])
    const likeCount=Object.keys(likes).length;
    
    const token=useSelector((state)=>state.token);
    
    
    const main=palette.neutral.main;
    const primary=palette.primary.main;

    const patchLike=async()=>{
      const response =await fetch(`http://localhost:3001/posts/${postId}/like`,{
        method:"PATCH",
        headers:{
          Authoriation:`Bearer ${token}`,
          "Content-Type":"application/json"
        },
        body:JSON.stringify({userId: loggedInUserId})
      });
      const updatedpost=await response.json();
      dispatch(setPost({post: updatedpost}));
    };
    return (
      <WidgetWrapper m="2rem 0">
        <Friend friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
        />
        <Typography color={main} sx={{mt:"1rem"}}>
            {description}
        </Typography>
        {picturePath && (
          <img
          width="100%"
          height="auto"
          alt="post"
          style={{borderRadius:"0.75rem",marginTop:"0.75rem"}}
          src={`http://localhost:3001/assets/${picturePath}`}
          />
        )}
      </WidgetWrapper>
    )
}

export default PostWidget
