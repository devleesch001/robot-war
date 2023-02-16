import axios from 'axios';
import { RobotInterface } from './RobotApi';

export interface Ordeal {
    _id?: string;
    name: string;
    robots: RobotInterface[];
    win: RobotInterface[];
}

// export const setOrdeal = async (data: boolean) => {
//     const result = await axios.post<RobotInterface[]>(`${API_URL}/api/ro`, data);
//     return result.data;
// };

// ROUTES POUR RECUPERER les
