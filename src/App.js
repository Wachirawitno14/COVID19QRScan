import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import firebase from './Firebase';
import QRCode from 'qrcode.react';
class App extends React.Component {

    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('Place');
        this.unsubscribe = null;
        this.state = {
            Place: [],
        }
    }

    onCollectionUpdate = (querySnapshot) => {
        const Place = [];
        querySnapshot.forEach((doc) => {
            const { place, address, time } = doc.data();
            Place.push({
                key: doc.id,
                place: place,
                address: address,
                time: time,
                // doc: doc,
            });
        });
        this.setState({
            Place: Place,
        });
    }

    componentDidMount = () => {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }

    componentWillUnmount = () => {
        this.unsubscribe();
    }


    render() {
        return (
            <div className="container">
                <div className="panel panel-default">
                    <div className="pnel-heading">
                        <h3 className="panel-title">
                            รายชื่อสถานที่
                        </h3>
                    </div>
                    <div className="panel-body">
                        <h4><Link to="/create">เพิ่มสถานที่</Link></h4>
                        <table className="table table-stripe">
                            <thead>
                                <tr>
                                    <th>ชื่อสถานที่</th>
                                    <th>ที่อยู่</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.Place.map(Place =>
                                    <tr key={Place.key}>
                                        <td><Link to={`/show/${Place.key}`}>{Place.place}</Link></td>
                                        <td>{Place.address}</td>
                                        <td><QRCode  value={Place.place}></QRCode></td>
                                        
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}


export default App;
