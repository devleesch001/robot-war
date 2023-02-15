import React from 'react';
import { Card, Divider } from 'antd';
import { BattleInterface, getBattles } from '../../api/BattleApi';
import { getTournaments, TournamentInterface } from '../../api/TournamentApi';
import Label from '../Element/Label';
import { yellow } from '@ant-design/colors';

const TournamentList: React.FC = () => {
    const [tournaments, setTournaments] = React.useState<TournamentInterface[]>([]);

    React.useEffect(() => {
        const interval = setInterval(() => {
            getTournaments().then((tournaments) => {
                setTournaments(tournaments);
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Card
            title="Board Tournament"
            style={{ minWidth: 280 }}
            headStyle={{ backgroundColor: 'black', color: 'whitesmoke' }}
        >
            {tournaments.map((tournament, index) => (
                <div key={index}>
                    <Label color={yellow[5]}>{tournament.name}</Label>
                    <Divider />
                </div>
            ))}
        </Card>
    );
};
export default TournamentList;
