import React from 'react';
import { Card } from 'antd';

const combats = [
    { id: 1, fighter: ['equipe1', 'equipe2'] }, //pour plus tard ajouter une images du robot
    { id: 2, fighter: ['equipe4', 'equipe3'] },

    { id: 3, fighter: ['equipe5', 'equipe6'] },
    { id: 4, fighter: ['equipe7', 'equipe8'] },
];

const TournamentBoard: React.FC = () => {
    return (
        <Card
            title="Board Tournament"
            style={{ minWidth: 280 }}
            headStyle={{ backgroundColor: 'black', color: 'whitesmoke' }}
        ></Card>
    );
};
export default TournamentBoard;
