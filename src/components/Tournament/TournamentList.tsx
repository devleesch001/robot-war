import React from 'react';
import { Button, Card, Divider, Row } from 'antd';
import { getTournaments, TournamentInterface } from '../../api/TournamentApi';
import Label from '../Element/Label';
import { blue } from '@ant-design/colors';
import { EyeFilled } from '@ant-design/icons';

export interface TournamentLineProps {
    tournament: TournamentInterface;
    isAdmin: boolean;
}
export const TournamentLine: React.FC<TournamentLineProps> = (props) => {
    const { tournament, isAdmin } = props;

    return (
        <Row
            gutter={[18, 18]}
            justify={'start'}
            style={{ textAlign: 'center', verticalAlign: 'middle', justifyContent: 'space-between' }}
        >
            <Label color={blue[5]}>{tournament.name}</Label>

            <Button href={`/${isAdmin ? 'admin/' : ''}tournament/${tournament._id}`} type="default" shape="circle">
                <EyeFilled style={{ color: blue[5], fontSize: '20px' }} />
            </Button>
        </Row>
    );
};

interface TournamentListInterface {
    isAdmin: boolean;
}
const TournamentList: React.FC<TournamentListInterface> = (props) => {
    const [tournaments, setTournaments] = React.useState<TournamentInterface[]>([]);
    const { isAdmin } = props;

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
                    <TournamentLine tournament={tournament} isAdmin={isAdmin} />
                    <Divider />
                </div>
            ))}
        </Card>
    );
};
export default TournamentList;
