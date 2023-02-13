import axios from 'axios';
import { RobotInterface } from './RobotApi';
import { finished } from 'stream';

const API_URL = process.env.REACT_APP_API_URL;

export interface BattleInterface {
    _id?: string;
    fighters: RobotInterface[];
    win?: RobotInterface;

    status?: string;
}

export const getBattles = async () => {
    const result = await axios.get<BattleInterface[]>(`${API_URL}/api/battle`);
    return result.data;
};

export const getBattle = async (id: string) => {
    const result = await axios.get<BattleInterface>(`${API_URL}/api/battle`, { params: { id: id } });
    return result.data;
};

export const addBattle = async (data: BattleInterface) => {
    const result = await axios.post<BattleInterface>(`${API_URL}/api/battle`, data);
    return result.data;
};

export interface BattleUpdateInterface {
    _id: string;
    fighters: RobotInterface[];
    win?: RobotInterface;

    status?: string;
}
export const updateBattle = async (data: BattleUpdateInterface) => {
    const result = await axios.patch<BattleInterface>(`${API_URL}/api/battle`, data);
    return result.data;
};
