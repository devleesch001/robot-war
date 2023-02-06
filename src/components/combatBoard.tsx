import React, {useEffect} from "react";
import {Card, Divider, Col, Row} from 'antd';
import {Battle, getListBattle} from "../api/route";


const combats = [
    {id: 1, fighter: ["equipe1","equipe2"]}, //pour plus tard ajouter une images du robot
    {id: 2, fighter: ["equipe4","equipe3"]}
];


const CombatBoard: React.FC = () => {
    const [battleList, setbattlelist] = React.useState<Battle[]>([]);

    React.useEffect(() => {
        const interval = setInterval(() => {
            getListBattle()
                .then((battle) => {
                    setbattlelist(battle)
                })
                .catch((err) => {
                    setbattlelist([])
                });
        }, 1000);
        return () => clearInterval(interval);
    }, []);


    return (
        <>
            <Card title="Board Fights" bordered={false} style={{width: 500}}
                  headStyle={{backgroundColor: "black", color: "whitesmoke"}}>

                {
                    combats.map(combat => (
                        <Row>
                        <Col xs={{span: 10, offset: 1}} lg={{span: 6, offset: 2}}>
                            {combat.team_1.}
                        </Col>
                        <Col xs={{span: 20, offset: 1}} lg={{span: 6, offset: 2}}>

                        </Col>
                        <Divider style={{color:"green"}}>vs</Divider>
                    </Row>
                    ))
                }
            </Card>
        </>
    )


}
export default CombatBoard