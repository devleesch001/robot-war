import React from "react"

import { SingleEliminationBracket, DoubleEliminationBracket, Match, MATCH_STATES, SVGViewer } from '@g-loot/react-tournament-brackets';



const combats = [
    {id: 1, fighter: ["equipe1","equipe2"]}, //pour plus tard ajouter une images du robot
    {id: 2, fighter: ["equipe4","equipe3"]},

    {id: 3, fighter: ["equipe5","equipe6"]},
    {id: 4, fighter: ["equipe7","equipe8"]},
];


{
    [upper|lower]: [
    ...,
    {
        "id": "WB R5 M1",
        "name": "WB R5 M1",
        "nextMatchId": "WB R6 M1",
        "nextLooserMatchId": "WB R6 M1",
        "startTime": null,
        "tournamentRound": "R5",
        "state": "SCORE_DONE",
        "participants": [
            {
                "id": "ddfee063-adde-4192-95d2-203eb2ebb8f7",
                "resultText": "",
                "isWinner": false,
                "status": "PLAYED",
                "name": "#1"
            }
        ]
    },
    {
        "id": "WB R6 M1",
        "name": "WB R6 M1",
        "nextMatchId": null,
        "nextLooserMatchId": null,
        "startTime": null,
        "tournamentRound": "R6",
        "state": "SCORE_DONE",
        "participants": []
    }
...,
]
}

export const DoubleElimination = () => (
    <DoubleEliminationBracket
        matches={}
        matchComponent={Match}
        svgWrapper={({ children, ...props }) => (
            <SVGViewer width={500} height={500} {...props}>
                {children}
            </SVGViewer>
        )}
    />
);
export const SingleElimination = () => (
    <SingleEliminationBracket
        matches={}
        matchComponent={Match}
        svgWrapper={({ children, ...props }) => (
            <SVGViewer width={500} height={500} {...props}>
                {children}
            </SVGViewer>
        )}
    />
);

const TounamentBoard: React.FC = () =>{

    return(
         <>
            <DoubleElimination/>

         </>

    )

}
export default TounamentBoard