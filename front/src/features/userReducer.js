import React from 'react';
import {createSlice} from "@reduxjs/toolkit";

export const itemsSlice = createSlice({
    name: "items",
    initialState: {
        users: [],
        conversations: [],
        conversation: "",
    }, reducers: {
        updateUsers: (state, action) => {
            state.users = action.payload;
        },
        updateConversations: (state, action) => {
            state.conversations = action.payload
        },
        updateConversation: (state, action) => {
            state.conversation = action.payload
        }
    }
});

export const {updateUsers, updateConversations, updateConversation} = itemsSlice.actions;

export default itemsSlice.reducer;