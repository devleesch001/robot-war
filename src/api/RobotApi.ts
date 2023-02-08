import axios from 'axios';
import { BattleInterface } from './BattleApi';

const API_URL = process.env.REACT_APP_API_URL;
export interface RobotInterface {
    _id?: string;
    name: string;
}

export const getRobots = async () => {
    const result = await axios.get<RobotInterface[]>(`${API_URL}/api/robot`);
    return result.data;
};

export const addRobot = async (data: BattleInterface) => {
    const result = await axios.post<BattleInterface>(`${API_URL}/api/robot`, data);
    return result.data;
};
