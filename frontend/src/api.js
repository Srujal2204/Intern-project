import { API_URL } from "./utils"

export const CreateTask = async (taskObj)=>{
    const url = `${API_URL}/tasks`;
    console.log("url",url);
    const options = {
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        body: JSON.stringify(taskObj)
    };
    try { 
        const result  = await fetch(url,options);
        const data = await result.json(); 
        return data;   
    } catch (err) {
        return err; 
    }
}

export const GetAllTasks = async ()=>{
    const url = `${API_URL}/tasks`;
    console.log("url",url);
    const options = {
        method:'GET',
        headers:{
            'Content-type':'application/json'
        } 
    };
    try { 
        const result  = await fetch(url,options);
        const data = await result.json(); 
        return data;   
    } catch (err) {
        return err; 
    }
}

export const DeleteTask = async (id)=>{
    const url = `${API_URL}/tasks/${id}`;
    console.log("url",url);
    const options = {
        method:'DELETE',
        headers:{
            'Content-type':'application/json'
        } 
    };
    try { 
        const result  = await fetch(url,options);
        const data = await result.json(); 
        return data;   
    } catch (err) {
        return err; 
    }
}

export const UpdateTask = async (id,reqBody)=>{
    const url = `${API_URL}/tasks/${id}`;
    console.log("url",url);
    const options = {
        method:'PUT',
        headers:{
            'Content-type':'application/json'
        } ,
        body: JSON.stringify(reqBody)
    };
    try { 
        const result  = await fetch(url,options);
        const data = await result.json(); 
        return data;   
    } catch (err) {
        return err; 
    }
}