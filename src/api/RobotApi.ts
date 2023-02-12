import axios from 'axios';
import { BattleInterface } from './BattleApi';

const API_URL = process.env.REACT_APP_API_URL;
export interface RobotInterface {
    _id?: string;
    name: string;
}

interface RobotGetInterface {
    _id?: string;
}
export const getRobots = async (params?: RobotGetInterface) => {
    const result = await axios.get<RobotInterface[]>(`${API_URL}/api/robot`, { params: params });
    return result.data;
};

export const getRobot = async (params: { _id: string }) => {
    const result = await axios.get<RobotInterface[]>(`${API_URL}/api/robot`, { params: params });
    return result.data[0];
};

export const addRobot = async (data: BattleInterface) => {
    const result = await axios.post<BattleInterface>(`${API_URL}/api/robot`, data);
    return result.data;
};
