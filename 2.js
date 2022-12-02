// CONSTANTS

const PLAYER = 0;
const OPPONENT = 1;
const DRAW = 2;

const ROCK = 0;
const PAPER = 1;
const SCISSORS = 2;

const BEAT_MAP = {
  [ROCK]: PAPER,
  [PAPER]: SCISSORS,
  [SCISSORS]: ROCK,
};

const OPPONENT_CODE_MAP = {
  A: ROCK,
  B: PAPER,
  C: SCISSORS,
};

const PLAYER_CODE_MAP = {
  X: ROCK,
  Y: PAPER,
  Z: SCISSORS,
};

const RESULT_CODE_MAP = {
  X: OPPONENT,
  Y: DRAW,
  Z: PLAYER,
};

const MOVE_POINT_MAP = {
  [ROCK]: 1,
  [PAPER]: 2,
  [SCISSORS]: 3,
};

const RESULT_POINT_MAP = {
  [PLAYER]: 6,
  [OPPONENT]: 0,
  [DRAW]: 3,
};

// UTILS

const sum = (arr) => arr.reduce((acc, val) => acc + val, 0);

// DOMAIN

const getRoundWinner = ([opponentMove, playerMove]) =>
  playerMove === opponentMove
    ? DRAW
    : BEAT_MAP[playerMove] === opponentMove
    ? OPPONENT
    : PLAYER;

const getRoundPoints = ([opponentMove, playerMove]) => {
  const winner = getRoundWinner([opponentMove, playerMove]);
  return RESULT_POINT_MAP[winner] + MOVE_POINT_MAP[playerMove];
};

const getResponseMove = ([opponentMove, expectedResult]) => {
  return expectedResult === DRAW
    ? opponentMove
    : expectedResult === PLAYER
    ? BEAT_MAP[opponentMove]
    : BEAT_MAP[BEAT_MAP[opponentMove]];
};

const getRoundPointsB = ([opponentMove, expectedResult]) => {
  const playerMove = getResponseMove([opponentMove, expectedResult]);
  return getRoundPoints([opponentMove, playerMove]);
};

const mapEncryptedRoundToRound =
  (leftMap, rightMap) =>
  ([left, right]) => {
    return [leftMap[left], rightMap[right]];
  };

const getResult = (encryptedRounds, decryptRound, getPoints) => {
  return sum(encryptedRounds.map(decryptRound).map(getPoints));
};

// EXECUTION

const input = require("fs").readFileSync("2.input", "utf8");

const encryptedRounds = input.split("\n").map((line) => {
  return line.split(" ");
});

const A = getResult(
  encryptedRounds,
  mapEncryptedRoundToRound(OPPONENT_CODE_MAP, PLAYER_CODE_MAP),
  getRoundPoints
);

const B = getResult(
  encryptedRounds,
  mapEncryptedRoundToRound(OPPONENT_CODE_MAP, RESULT_CODE_MAP),
  getRoundPointsB
);

console.log(A, B);
