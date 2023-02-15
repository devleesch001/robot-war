import React from 'react';
import { Button, Menu, Typography } from 'antd';
import { formatTournament, getTournament, TournamentInterface } from '../../api/TournamentApi';
import { red, yellow, orange, green } from '@ant-design/colors';
import { useParams } from 'react-router-dom';
import { createTheme, Match, SingleEliminationBracket, SVGViewer } from '@g-loot/react-tournament-brackets';
import Label from '../Element/Label';

type TournamentBoardParams = {
    tournamentId: string;
};

const WhiteStyle = {
    textColor: { main: '#000000', highlighted: '#07090D', dark: '#3E414D' },
    matchBackground: { wonColor: green[5], lostColor: '#dfd7cc' },
    score: {
        background: { wonColor: orange[5], lostColor: '#dfd7cc' },
        text: { highlightedWonColor: '#52504b', highlightedLostColor: '#52504b' },
    },
    border: {
        color: '#CED1F2',
        highlightedColor: '#9a958d',
    },
    roundHeader: { backgroundColor: yellow[5], fontColor: '#000' },
    connectorColor: '#CED1F2',
    connectorColorHighlight: '#da96c6',
    svgBackground: '#FAFAFA',
};

const WhiteTheme = createTheme(WhiteStyle);

interface TournamentBordInterface {
    isAdmin: boolean;
}

const TournamentBoard: React.FC<TournamentBordInterface> = (props) => {
    const { isAdmin } = props;

    const { tournamentId } = useParams<TournamentBoardParams>();

    const [tournament, setTournament] = React.useState<TournamentInterface | null>(null);

    React.useEffect(() => {
        if (tournamentId) {
            getTournament(tournamentId).then((tournaments) => {
                setTournament(tournaments);
            });
        }
        // const interval = setInterval(() => {
        //
        // }, 1000);
        // return () => clearInterval(interval);
    }, []);

    return (
        <>
            <Menu
                style={{ justifyContent: 'center', backgroundColor: isAdmin ? red[5] : 'black' }}
                mode="horizontal"
                items={[
                    {
                        label: (
                            <Typography.Title level={1} style={{ color: 'white' }}>
                                Robot Wars
                            </Typography.Title>
                        ),
                        key: 'title',
                        disabled: true,
                        style: { cursor: 'default' },
                    },
                ]}
            />
            {tournament && (
                <div style={{ height: '1000px' }}>
                    <div>{tournament.name}</div>
                    <SingleEliminationBracket
                        theme={WhiteTheme}
                        options={{
                            style: {
                                roundHeader: {
                                    backgroundColor: WhiteStyle.roundHeader.backgroundColor,
                                    fontColor: WhiteStyle.roundHeader.fontColor,
                                },
                                connectorColor: WhiteStyle.connectorColor,
                                connectorColorHighlight: WhiteStyle.connectorColorHighlight,
                            },
                        }}
                        matches={formatTournament(tournament)}
                        // svgWrapper={({ children, ...props }) => (
                        //     <SVGViewer width={1080} height={1080} {...props}>
                        //         {children}
                        //     </SVGViewer>
                        // )}
                        matchComponent={({
                            match,
                            onMatchClick,
                            onPartyClick,
                            onMouseEnter,
                            onMouseLeave,
                            topParty,
                            bottomParty,
                            topWon,
                            bottomWon,
                            topHovered,
                            bottomHovered,
                            topText,
                            bottomText,
                            connectorColor,
                            computedStyles,
                            teamNameFallback,
                            resultFallback,
                        }) => (
                            <Button
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-around',
                                    color: 'white',
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: red[5],
                                }}
                                href={`/fights/${match.id}`}
                                target={'_blank'}
                            >
                                <div onMouseEnter={() => onMouseEnter(topParty.id)} style={{ display: 'flex' }}>
                                    <div>{topParty.name || teamNameFallback}</div>
                                    <div>{topParty.resultText ?? resultFallback(topParty)}</div>
                                </div>
                                <div style={{ height: '1px', width: '100%', background: 'black' }} />
                                <div onMouseEnter={() => onMouseEnter(bottomParty.id)} style={{ display: 'flex' }}>
                                    <div>{bottomParty.name || teamNameFallback}</div>
                                    <div>{bottomParty.resultText ?? resultFallback(topParty)}</div>
                                </div>
                            </Button>
                        )}
                    />
                </div>
            )}
        </>
    );
};
export default TournamentBoard;
