import React, { Component } from 'react';
import axios from 'axios';
 
class ProtectedPage extends Component {
    getUser=()=> {
        try {
          const response =axios.get('/user?ID=12345');
          console.log(response);
        } catch (error) {
          console.error(error);
        }
      }
    render() { 
        this.getUser();
        console.log('asd')
        return (
            <>
                <hr></hr>
                <h1>ProtectedPage</h1>
                <hr></hr>
            </>
        );
    }
}
 
export default ProtectedPage;