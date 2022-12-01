import internal from "stream";

interface Player {
  Element: PlayerData;
  Team: Team;
  ElementType: ElementType;
}

interface PlayerData {
  id: number;
  code: number;
  first_name: string;
  last_name: string;
  web_name: string;
  now_cost: number;
  form: number;
  ep_next: number;
  ep_this: number;
}

interface Team {
  id: number;
  code: number;
  name: string;
  short_name: string;
}

interface ElementType {
  id: number;
  plural_name: string;
  singular_name_short: string;
  squad_select: number;
  squad_min_play: number;
  squad_max_play: number;
}

interface Selection {
  [position_id: number]: Player[];
}

interface State {
  players: Player[];
  squad: Selection;
  selection: Selection;
}

type ActionType =
  | { type: "SET_PLAYERS"; players: Player[] }
  | { type: "ADD_TO_SQUAD"; player: Player }
  | { type: "REMOVE_FROM_SQUAD"; player: Player };

interface PositionColor {
  [id: number]: string;
}
