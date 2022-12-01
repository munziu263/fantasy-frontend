import { Dispatch } from "react";
import { ActionType, Player } from "../FPLTypes";
import { PlayerCard } from "./PlayerCard";

interface PlayerCarouselProps {
  players: Player[];
  filter: any;
  action: any;
  dispatch: Dispatch<ActionType>;
}

export const PlayerCarousel = (props: PlayerCarouselProps) => {
  return (
    <div className="flex overflow-x-auto">
      {props.players
        .slice(0)
        .filter(props.filter)
        .sort((a: Player, b: Player) => b.Element.form - a.Element.form)
        .map((player: Player) => (
          <PlayerCard
            player={player}
            key={player.Element.id}
            dispatch={props.dispatch}
            action={props.action}
          />
        ))}
    </div>
  );
};
