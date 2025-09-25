import axios from 'axios';
import { BattleInterface } from './BattleApi';

const API_URL = process.env.REACT_APP_API_URL;
export interface RobotInterface {
    _id?: string;
    name: string;
    stats: StatRobot;
}

interface StatRobot {
    win: number;
    draw: number;
    loose: number;
    score: number;
}
interface RobotGetInterface {
    _id?: string;
}
export const getRobots = async (params?: RobotGetInterface) => {
    const result = await axios.get<RobotInterface[]>(`${API_URL}/api/robot`, { params: params });
    return result.data;
};

export const getRobot = async (params: { id: string }) => {
    const result = await axios.get<RobotInterface>(`${API_URL}/api/robot`, { params: params });
    return result.data;
};

export const addRobot = async (data: BattleInterface) => {
    const result = await axios.post<BattleInterface>(`${API_URL}/api/robot`, data);
    return result.data;
};

export const getRobotsWithStats = async (params?: RobotGetInterface) => {
    const result = await axios.get<RobotInterface[]>(`${API_URL}/api/robot/stat`, { params: params });
    return result.data;
};
