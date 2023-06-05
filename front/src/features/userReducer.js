import React from 'react';
import {createSlice} from "@reduxjs/toolkit";

export const itemsSlice = createSlice({
    name: "items",
    initialState: {
        users: [],
        posts: [],
        currentUser: sessionStorage.getItem("username")
    }, reducers: {
        updateUsers: (state, action) => {
            state.users = action.payload;
        },
        updatePosts: (state, action) => {
            state.posts = action.payload;
        },
        updateCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        }
    }
});

export const {updateUsers, updatePosts, updateCurrentUser} = itemsSlice.actions;

export default itemsSlice.reducer;