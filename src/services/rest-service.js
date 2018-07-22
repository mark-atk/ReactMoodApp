import axios from 'axios';

export class RestService {
  static addNewEntry(entry) {
    axios.post('http://localhost:3000/add', entry)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  static getAllDataForUser(userId, callBackDataSet) {
    axios.get('http://localhost:3000/getAllItemsForUser', {
      params: {
        userId: userId
      }
    })
      .then(res => {
        callBackDataSet(res.data);
      });
  }
}

export default RestService;