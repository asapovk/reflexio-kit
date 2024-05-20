

export type Cell = {
    width: number;
    isSelected: number;
}

export type Row = {
    height: number;
    cells: Array<Cell>;
}

export type IGridState = {
    selectionMode: {
        cell: boolean;
        row: boolean;
        column: boolean;
    }
    resizeMode: boolean;
    rows: Array<Row> // Массив строк
}   