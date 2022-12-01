import { Dispatch } from "react";
import { ActionType, Player } from "../FPLTypes";
import { PlayerCard } from "./PlayerCard";

interface PlayerSelectionProps {
  players: Player[];
  action: any;
  dispatch: Dispatch<ActionType>;
  rules: any;
}

export const PlayerSelection = (props: PlayerSelectionProps) => {
  return (
    <div className="flex flex-row items-center justify-center">
      <div className="w-1/12 justify-center">{props.rules.type}</div>
      <div className="flex flex-row w-5/12 justify-center">
        {props.players
          ? props.players
              .slice(0)
              .map((player: Player) => (
                <PlayerCard
                  player={player}
                  key={player.Element.id}
                  dispatch={props.dispatch}
                  action={props.action}
                />
              ))
          : ""}
      </div>
      <div className="flex flex-row w-3/12 justify-start overflow-x-auto">
        {props.players
          ? props.players
              .slice(0)
              .map((player: Player) => (
                <PlayerCard
                  player={player}
                  key={player.Element.id}
                  dispatch={props.dispatch}
                  action={props.action}
                />
              ))
          : ""}
      </div>
    </div>
  );
};
