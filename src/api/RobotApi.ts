import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
export interface RobotInterface {
    _id: string;
    name: string;
}

export const getRobots = async () => {
    const result = await axios.get<RobotInterface[]>(`${API_URL}/api/robot`);
    return result.data;
};
