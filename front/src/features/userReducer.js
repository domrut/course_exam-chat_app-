import React from 'react';
import {createSlice} from "@reduxjs/toolkit";

export const itemsSlice = createSlice({
    name: "items",
    initialState: {
        users: [],
        conversations: [],
        conversation: "",
        currentUser: ""
    }, reducers: {
        updateUsers: (state, action) => {
            state.users = action.payload;
        },
        updateConversations: (state, action) => {
            state.conversations = action.payload
        },
        updateConversation: (state, action) => {
            state.conversation = action.payload
        },
        updateCurrentUser: (state, action) => {
            state.currentUser = action.payload
        }
    }
});

export const {updateUsers, updateCurrentUser, updateConversations, updateConversation} = itemsSlice.actions;

export default itemsSlice.reducer;