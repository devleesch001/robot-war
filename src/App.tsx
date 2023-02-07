import React from 'react';
import './App.css';
import CardCombatBoard from './components/BattleBord/cardCombatBoard';
import GridBattleBoard from './components/BattleBord/gridBattleBoard';
import NewTournament from './components/NewTournament/newTournament';

function App() {
    return (
        <div className="App">
            <NewTournament />
        </div>
    );
}

export default App;
