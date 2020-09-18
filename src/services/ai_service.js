import exists from '../utils/exists'

class CheckersStateSerializer {
  constructor(state) {
    this.state = state;
  }

  serialize() {
    let board = this.state.squares.map((s) => {
      if (exists(s.piece)) {
        if (s.piece.player_number == 1) {
          if (s.piece.king) {
            return 'B';
          } else {
            return 'b';
          }
        } else if (s.piece.player_number == 2) {
          if (s.piece.king) {
            return 'W';
          } else {
            return 'w';
          }
        }
      } else {
        return '-';
      }
    }).join('');

    let player = this.state.current_player_number == 1 ? 'b' : 'w';

    return board + player;
  }
}

class CheckersMoveParser {
  constructor(move) {
    this.move = move;
  }

  parse() {
    return this.move.split(/-|x/).map(function(e) { return parseInt(e); });
  }
}

class AiService {
  constructor(url) {
    this.url = url;
  }

  moveUrl(game, state) {
    return `${this.url}/api/v0/${game}/${state}`;
  }

  getMove(game, state, callback, errCallback) {
    let serializer = new CheckersStateSerializer(state);
    let serializedState = serializer.serialize();
    let moveUrl = this.moveUrl(game, serializedState);

    fetch(moveUrl).then(function(res) {
      if (res.status === 200) {
        res.text().then(function(text) {
          let parser = new CheckersMoveParser(text);
          let move = parser.parse();
          callback(move);
        });
      } else {
        errCallback("INVALID_SERVER_RESPONSE");
      }
    }).catch(function(err) {
      errCallback("SERVER_UNAVAILABLE");
    });
  }
}

export default AiService

