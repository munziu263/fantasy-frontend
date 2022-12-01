import "./App.css";
import { useEffect, useReducer } from "react";
import { ActionType, Player, State } from "./FPLTypes";
import { PlayerCarousel } from "./components/PlayerCarousel";
import { PlayerSelection } from "./components/PlayerSelection";

const RULES = {
  1: { type: "GPK", min: 1, max: 1, total: 2 },
  2: { type: "DEF", min: 3, max: 5, total: 5 },
  3: { type: "MID", min: 2, max: 5, total: 5 },
  4: { type: "FWD", min: 1, max: 3, total: 3 },
};

const playerReducer = (state: State, action: ActionType) => {
  switch (action.type) {
    case "SET_PLAYERS":
      return { ...state, players: action.players };
    case "ADD_TO_SQUAD":
      const prevSquadState = state.squad[action.player.ElementType.id];
      const newState = {
        players: state.players.filter(
          (player) => player.Element.id !== action.player.Element.id
        ),
        squad: {
          ...state.squad,
          [action.player.ElementType.id]: prevSquadState
            ? [...prevSquadState, action.player]
            : [action.player],
        },
      };
      return {
        ...state,
        ...newState,
      };
    case "REMOVE_FROM_SQUAD":
      return {
        ...state,
        players: [...state.players, action.player],
      };
    default:
      throw new Error("No Action");
  }
};

const initialState: State = {
  players: [],
  squad: { 1: [], 2: [], 3: [], 4: [] },
  selection: { 1: [], 2: [], 3: [], 4: [] },
};

function App() {
  const [state, dispatch] = useReducer(playerReducer, initialState);

  const getPlayers = async () => {
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    const players: Player[] = await fetch("/players", options).then(
      (response) => response.json()
    );
    dispatch({ type: "SET_PLAYERS", players: players });
  };

  const filterGPK = (player: Player) => player.ElementType.id === 1;
  const filterDEF = (player: Player) => player.ElementType.id === 2;
  const filterMID = (player: Player) => player.ElementType.id === 3;
  const filterFWD = (player: Player) => player.ElementType.id === 4;

  useEffect(() => {
    getPlayers();
  }, []);

  return (
    <div className="App text-slate-50 bg-slate-900">
      <div className="flex flex-col">
        <div>My Team</div>
        <PlayerSelection
          players={state.squad[1]}
          dispatch={dispatch}
          action="REMOVE_FROM_SQUAD"
          rules={RULES[1]}
        />
        <PlayerSelection
          players={state.squad[2]}
          dispatch={dispatch}
          action="REMOVE_FROM_SQUAD"
          rules={RULES[2]}
        />
        <PlayerSelection
          players={state.squad[3]}
          dispatch={dispatch}
          action="REMOVE_FROM_SQUAD"
          rules={RULES[3]}
        />
        <PlayerSelection
          players={state.squad[4]}
          dispatch={dispatch}
          action="REMOVE_FROM_SQUAD"
          rules={RULES[4]}
        />
      </div>
      {/* Player Selection Carousels */}
      <div className="flex flex-col">
        <div>GPK</div>
        <PlayerCarousel
          players={state.players}
          dispatch={dispatch}
          action="ADD_TO_SQUAD"
          filter={filterGPK}
        />
        <div>DEF</div>
        <PlayerCarousel
          players={state.players}
          dispatch={dispatch}
          action="ADD_TO_SQUAD"
          filter={filterDEF}
        />
        <div>MID</div>
        <PlayerCarousel
          players={state.players}
          dispatch={dispatch}
          action="ADD_TO_SQUAD"
          filter={filterMID}
        />
        <div>FWD</div>
        <PlayerCarousel
          players={state.players}
          dispatch={dispatch}
          action="ADD_TO_SQUAD"
          filter={filterFWD}
        />
      </div>
    </div>
  );
}

export default App;
