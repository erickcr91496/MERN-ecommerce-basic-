import React, {createContext, useState, useEffect} from 'react'
import ProductsApi from './api/ProductsApi';
import axios from 'axios';
import UserApi from './api/UserApi';
import CategoriesAPI from './api/CategoriesAPI';

export const GlobalState = createContext()

export const DataProvider = ({children}) => {
    const [token, setToken] = useState(false)


    useEffect(() =>{
        const firstLogin = localStorage.getItem('firstLogin')
        if(firstLogin){

            const refreshToken = async () =>{
                const res = await axios.get('/user/refresh_token')
        
                //console.log(res.data.accestoken)
              setToken(res.data.accestoken)
    
              setTimeout(() => {
                  refreshToken()
              }, 10 * 60 * 1000)
            }    
            refreshToken()
        }

    },[])

    const state = {
        token: [token,setToken],
        productsApi: ProductsApi(),
        userAPI: UserApi(token),
        categoriesAPI: CategoriesAPI()
    }

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}