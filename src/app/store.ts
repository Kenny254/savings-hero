/* globals firebase */

const firebase = window.firebase

const config = {
  apiKey: 'AIzaSyA7MHn5QVVqlWvDzvXmwUvh5C7WRuR6lWs',
  authDomain: 'hacktomorrow-2fee6.firebaseapp.com',
  databaseURL: 'https://hacktomorrow-2fee6.firebaseio.com/',
  projectId: 'hacktomorrow-2fee6',
  storageBucket: 'hacktomorrow-2fee6.appspot.com',
  messagingSenderId: '696839577065'
}

firebase.initializeApp(config)

const db = firebase.database()

let transactions = null

let callback = null

const starCountRef = firebase.database().ref('transactions');
starCountRef.on('value', function(snapshot) {
  const value = snapshot.val()
    .map(transaction => ({
      amount: parseFloat(transaction.amount),
      category: transaction.category,
      subcategory: transaction.subcategory,
      desc: transaction.desc,
      date: new Date(transaction.date)
    }))

  transactions = transactions === null ? transactions : transactions.concat(value)

  if (callback) {
    callback(value)
  }
});

export default {
  getTransactions () {
    return transactions
  },

  setEventHandler (cb) {
    callback = cb
  }
}
