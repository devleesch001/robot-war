import axios from "axios";

export interface Robot{
    id:number,
    name:string,

}

export interface Battle{
    id:number,
    figthers: any[],

    stateOfBattle:string

}

export const getListBattle = async () => {
     return (await axios.get(`http://localhost:4000/cars`)).data as Battle[];
};