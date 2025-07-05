import React, { useContext, useEffect, useState } from 'react'
import { AiFillHeart } from 'react-icons/ai'
import useAuthCheck from '../../hooks/useAuthCheck';
import { useMutation } from 'react-query';
import { useAuth0 } from '@auth0/auth0-react';
import UserDetailContext from '../../context/UserDetailContext';
import { toFav } from '../../utils/api';
import { checkFav, updateFavourites } from '../../utils/common';

const Heart = ({id}) => {
    const [heartColor,setHeartColor]=useState("white");
    const {validateLogin}=useAuthCheck();
    const {user}=useAuth0();
    const {
        userDetails: { token,favourites },
        setUserDetails,
      } = useContext(UserDetailContext);
    
    useEffect(()=>{
        setHeartColor(()=>checkFav(id,favourites))
    },[favourites])
    const {mutate}=useMutation({
        mutationFn:()=>toFav(id,user?.email,token),
        onSuccess:()=>{
            setUserDetails((prev)=>({
                ...prev,
                favourites:updateFavourites(id,prev.favourites)

            }))
        }
    })

    const handleColor=()=>{
        if(validateLogin()){
            mutate()
            setHeartColor((prev)=>prev==="#fa325f"?"white":"#fa325f")
        }
    }
  return (
    <div>
      <AiFillHeart className="heart" size={24} color={heartColor} onClick={(e)=>{
        e.stopPropagation()
        handleColor()}}/>
    </div>
  )
}

export default Heart
