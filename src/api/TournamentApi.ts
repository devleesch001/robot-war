import axios from 'axios';
import { RobotInterface } from './RobotApi';
import { BattleInterface } from './BattleApi';
import { Match, Participant } from '@g-loot/react-tournament-brackets/dist/src/types';

const API_URL = process.env.REACT_APP_API_URL;

export interface TournamentInterface {
    _id: string;
    name: string;
    fighters: RobotInterface[];
    fights: BattleInTournamentInterface[];
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface BattleInTournamentInterface extends BattleInterface {
    nextfight: string;
}

export const getTournaments = async () => {
    const result = await axios.get<TournamentInterface[]>(`${API_URL}/api/tournament`);
    return result.data;
};

export const getTournament = async (id: string) => {
    const result = await axios.get<TournamentInterface>(`${API_URL}/api/tournament`, { params: { id: id } });
    return result.data;
};

interface TournamentPostInterface {
    name: string;
    fighters: RobotInterface[];
}

export const addTournament = async (data: TournamentPostInterface) => {
    const result = await axios.post<BattleInterface>(`${API_URL}/api/tournament`, data);
    return result.data;
};

export const formatTournament = (data: TournamentInterface): Match[] => {
    const value = data.fights.map((fight) => {
        // console.log(fight);
        return {
            id: fight._id ?? '',
            name: fight.fighters.map((robot) => robot.name).join(' vs '),
            nextMatchId: fight.nextfight,
            startTime: fight.startedAt?.toDateString(),
            state: 'NO_PARTY',
            participants: fight.fighters.map((fighter) => {
                return {
                    id: fighter._id,
                    resultText: fight.win === fighter._id ? 'WON' : 'test',
                    isWinner: fight.win === fighter._id,
                    status: 'NO_PARTY',
                    name: fighter.name,
                } as Participant;
            }),
        } as Match;
    });
    console.log(value);
    // value.push({
    //     id: 1,
    //     name: 'test',
    //     nextMatchId: '63eb8d0e6149848c424a8f39',
    //     startTime: new Date().toDateString(),
    //     state: 'NO_PARTY',
    //     participants: [
    //         {
    //             id: 1,
    //             resultText: 'WON',
    //             isWinner: false,
    //             status: 'NO_PARTY',
    //             name: 'test',
    //         },
    //         {
    //             id: 2,
    //             resultText: 'WON',
    //             isWinner: false,
    //             status: 'NO_PARTY',
    //             name: 'test 2',
    //         },
    //     ],
    // });
    return value;
};
