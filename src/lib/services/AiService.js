import stateSerializer from './stateSerializer'
import moveParser from './moveParser'

class AiService {
  constructor(url) {
    this.url = url;
  }

  moveUrl(game, state) {
    return `${this.url}/api/v0/${game}/${state}`;
  }

  getMove(game, state, callback, errCallback) {
    let serializedState = stateSerializer(game)(state);
    let moveUrl = this.moveUrl(game, serializedState);

    fetch(moveUrl).then(function(res) {
      if (res.status === 200) {
        res.text().then(function(text) {
          let move = moveParser(game)(text);
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

