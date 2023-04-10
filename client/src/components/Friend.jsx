import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material"; 
import { Box,IconButton,Typography,useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { useNavigate } from "react-router-dom";

const Friend=({friendId, name, subtitle, userPicturePath})=>{
    const {palette}=useTheme();
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const {_id}=useSelector((state)=>{
        state.user;
    });
    const token=useSelector((state)=>state.token);
    const friends=useSelector((state)=>state.user.friends);
    const primaryLight=palette.primary.light;
    const primaryDark=palette.primary.dark;
    const main=palette.neutral.main;
    const medium=palette.neutral.medium;
    const isFriend=friends.find((friend)=>friend._id==friendId);
    const patchFriend=async()=>{
        const response=await fetch(
            `https://localhost:3001/users/${id}/${friendId}`,
            {
                method:"PATCH",
                headers:{
                    Author:`Bearer ${token}`,
                    "Content-Type":"application.json"
                }
            }
        );
        const data=await response.json();
        dispatch(setFriends({friends: data}));
    };

    return (
        <FlexBetween>
            <FlexBetween gap="1rem">
                <UserImage iamge={userPicturePath} size="55px" />

                
            </FlexBetween>
        </FlexBetween>
    )
}

export default Friend