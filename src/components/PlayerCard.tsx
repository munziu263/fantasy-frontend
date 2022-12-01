import { Dispatch } from "react";
import { ActionType, Player, PositionColor } from "../FPLTypes";

interface PlayerCardProps {
  player: Player;
  dispatch: Dispatch<ActionType>;
  action: any;
}

export const PlayerCard = (props: PlayerCardProps) => {
  const playerImage = (code: number) =>
    `https://resources.premierleague.com/premierleague/photos/players/250x250/p${code}.png`;

  const positionColor: PositionColor = {
    1: "bg-gradient-to-b from-zinc-800 border-0 border-zinc-500 hover:border-2",
    2: "bg-gradient-to-b from-slate-800 border-0 border-slate-500 hover:border-2",
    3: "bg-gradient-to-b from-cyan-900 border-0 border-cyan-500 hover:border-2",
    4: "bg-gradient-to-b from-teal-900 border-0 border-teal-500 hover:border-2",
  };
  return (
    <div
      className={`flex flex-col items-center font-mono w-32 h-52 p-1 m-1 rounded-xl ${
        positionColor[props.player.ElementType.id]
      }`}
      onClick={() =>
        props.dispatch({ type: props.action, player: props.player })
      }
      draggable
    >
      <div className="flex flex-row items-center space-x-8 text-sm">
        <div className="flex-col">
          <div className="rounded-full px-2 bg-stone-900">FORM</div>
          <div>{props.player.Element.form}</div>
        </div>
        <div className="flex-col">
          <div className="rounded-full px-2 bg-stone-900">EP</div>
          <div>{props.player.Element.ep_this}</div>
        </div>
      </div>
      <img
        className="rounded-full w-24 h-24"
        src={playerImage(props.player.Element.code)}
        alt={props.player.Element.web_name}
      />
      <div className="w-full font-medium text-lg truncate">
        {props.player.Element.web_name}
      </div>
      <div className="flex flex-row items-center space-x-3 text-sm">
        <div>{props.player.Team.short_name}</div>
        <div className="text-lg font-bold">
          {"£" + (props.player.Element.now_cost / 10).toFixed(1)}
        </div>
        <div>{props.player.ElementType.singular_name_short}</div>
      </div>
    </div>
  );
};
