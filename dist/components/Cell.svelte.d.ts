import '../../app.css';
import GameCell from '../state/game_cell.svelte';
type $$ComponentProps = {
    cell: GameCell;
};
declare const Cell: import("svelte").Component<$$ComponentProps, {}, "">;
type Cell = ReturnType<typeof Cell>;
export default Cell;
