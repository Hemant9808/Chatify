import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// interface message{
//     _id:string,
//     content:string,
//     sender:any,
//     chat:any,
//     createdAt:any

// }
interface reduxState {
    user:any,
    messages:any ,
    chat:any
}

const initialState : reduxState = {
    user:{},
    messages:[],
    chat:[]
};

const userSlice = createSlice({
     name:'user',
     initialState,
     reducers:{
        updateUser:(state,action:PayloadAction<any>)=>{
        state.user=action.payload
       },
       updateChat:(state,action)=>{
        state.chat=action.payload
       },
       updateAllMessages:(state,action: PayloadAction<any>)=>{
        state.messages = action.payload
       },
       addSingleMessage:(state,action: PayloadAction<any>)=>{
        const newMessage=action.payload
        state.messages.push(newMessage)
       }
     }

})
export const { updateUser,updateChat,updateAllMessages,addSingleMessage}=userSlice.actions;
export default userSlice.reducer;