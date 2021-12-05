db = db.getSiblingDB('app');

db.createCollection('users');

db.users.insert([
 {
    name: 'user',
    pwd: 'pwd',
    locked: false
  },
]);