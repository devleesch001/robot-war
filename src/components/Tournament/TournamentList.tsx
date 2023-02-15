import React from 'react';
import { Button, Card, Divider, Row } from 'antd';
import { BattleInterface, getBattles } from '../../api/BattleApi';
import { getTournaments, TournamentInterface } from '../../api/TournamentApi';
import Label from '../Element/Label';
import { blue, yellow } from '@ant-design/colors';
import { EyeFilled } from '@ant-design/icons';

export interface TournamentLineProps {
    tournament: TournamentInterface;
}
export const TournamentLine: React.FC<TournamentLineProps> = (props) => {
    const { tournament } = props;

    return (
        <Row
            gutter={[18, 18]}
            justify={'start'}
            style={{ textAlign: 'center', verticalAlign: 'middle', justifyContent: 'space-between' }}
        >
            <Label color={blue[5]}>{tournament.name}</Label>

            <Button href={`/tournament/${tournament._id}`} type="default" shape="circle">
                <EyeFilled style={{ color: blue[5], fontSize: '20px' }} />
            </Button>
        </Row>
    );
};

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
                    <TournamentLine tournament={tournament} />
                    <Divider />
                </div>
            ))}
        </Card>
    );
};
export default TournamentList;
