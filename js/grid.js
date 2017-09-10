
'use esversion: 6';


function Grid() {
    constructor() {
        this.width = width;
        this.height = heght;
        this.cellWidth = cellWidth;
        this.cells = [];

    }

    initGrid(randomColor = false) {
        for (w = 0; w < this.width) {
            for (h = 0; h < this.height) {
                cells[w][h] = new Cell();
            }
        }
    }


}

class Cell {
    constructor(x, y, width, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.color = color;
    }
}
