import stateSerializer from './stateSerializer'
import moveParser from './moveParser'

class AiService {
  constructor(url) {
    this.url = url;
  }

  getMoveUrl(game, state) {
    return `${this.url}/api/v0/${game}/${state}`;
  }

  postMoveUrl(game) {
    return `${this.url}/api/v0/${game}`;
  }

  getMove(game, state, callback, errCallback) {
    let serializedState = stateSerializer(game)(state);
    let getMoveUrl = this.getMoveUrl(game, serializedState);

    fetch(getMoveUrl).then(function(res) {
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

  postMove(game, state, callback, errCallback) {
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

