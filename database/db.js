import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('friends.db');

export function initDb() {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS friends (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          mbti TEXT NOT NULL
        );`,
        [],
        () => resolve(),
        (_, error) => reject(error)
      );
    });
  });
}


export function insertFriend(name, mbti) {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO friends (name, mbti) VALUES (?, ?)',
        [name, mbti],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
}

export function getAllFriends() {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM friends',
        [],
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error)
      );
    });
  });
}
