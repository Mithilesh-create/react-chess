import Symbol from './Symbol.js';

// TODO
// Implement O-O and O-O-O

export default class Pgn {
  static convert(pieces, move, capture='') {
    let pgn;
    switch (move.piece.symbol) {
      case Symbol.ROOK:
        pgn = Symbol.ROOK + capture + move.to;
        break;
      case Symbol.KNIGHT:
        pgn = Symbol.KNIGHT + capture + move.to;
        break;
      case Symbol.BISHOP:
        pgn = Symbol.BISHOP + capture + move.to;
        break;
      case Symbol.QUEEN:
        pgn = Symbol.QUEEN + capture + move.to;
        break;
      case Symbol.KING:
        // O-O, white king
        if (move.piece.color === Symbol.WHITE &&
            move.from === 'e1' &&
            move.to === 'g1' &&
            pieces['f1'] === undefined &&
            pieces['g1'] === undefined) {
            pgn = 'O-O';
        }
        // O-O-O, white king
        else if (move.piece.color === Symbol.WHITE &&
            move.from === 'e1' &&
            move.to === 'c1') {
            pgn = 'O-O-O';
        }
        else {
            pgn = Symbol.KING + capture + move.to;
        }
        break;
      case Symbol.PAWN:
        if (move.from.charAt(0) === move.to.charAt(0)) {
          pgn = move.to;
        } else {
          pgn = move.from.charAt(0) + 'x' + move.to;
        }
        break;
      default:
        break;
    }

    return pgn;
  }
}
