import stateSerializer from './stateSerializer'
import moveParser from './moveParser'

class AiService {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  getMoveUrl(game: string, state: string): string {
    return `${this.url}/api/v0/${game}/${state}`;
  }

  postMoveUrl(game: string): string {
    return `${this.url}/api/v0/${game}`;
  }

  // TODO: change any to game state
  getMove(game: string, state: any, callback: Function, errCallback: Function) {
    let serializedState = stateSerializer(game)(state);
    let getMoveUrl = this.getMoveUrl(game, serializedState);

    fetch(getMoveUrl).then(function(res) {
      if (res.status === 200) {
        res.text().then(function(text) {
          let move = moveParser(game)(text, state);
          callback(move);
        });
      } else {
        errCallback("INVALID_SERVER_RESPONSE");
      }
    }).catch(function(err) {
      errCallback("SERVER_UNAVAILABLE");
    });
  }

  // TODO change any to game state
  postMove(game: string, state: any, callback: Function, errCallback: Function) {
    let serializedState = stateSerializer(game)(state);
    let postMoveUrl = this.postMoveUrl(game);

    fetch(postMoveUrl, { method: "POST", body: serializedState }).then(function(res) {
      if (res.status === 200) {
        res.text().then(function(text) {
          let move = moveParser(game)(text, state);
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

