import React from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';
import QRCode from 'qrcode.react';
class Create extends React.Component {

    constructor(props) {
        super(props)
        this.ref = firebase.firestore().collection('Place');
        this.state = {
            place: '',
            address: '',
            time: '',
            qrRef: '',
        }
    }


    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onSubmit = (e) => {

        e.preventDefault();

        const { place, address, time,qrRef } = this.state;

        this.ref.add({
            place,
            address,
            time,
            qrRef,
        })
            .then((docRef) => {


                this.setState({
                    place: '',
                    address: '',
                    time: '',
                    qrRef: '',
                });


                this.props.history.push("/");


            })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    }

    render() {
        const { place, address, time } = this.state;
        return (
            <div className="container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                           เพิ่มสถานที่
                        </h3>
                    </div>
                    <div className="panel-body">
                        <h4><Link to="/">รายชื่อสถานที่</Link></h4>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="place">สถานที่:</label>
                                <input type="text" className="form-control" name="place" value={place} onChange={this.onChange} placeholder="place" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">ที่อยู่:</label>
                                <textarea className="form-control" name="address" onChange={this.onChange} placeholder="Address" cols="80" rows="3" value={address}></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="time">เวลา:</label>
                                <input type="text" className="form-control" name="time" value={time} onChange={this.onChange} placeholder="Time" />
                            </div>
                            <div className="form-group">
                            <QRCode value={place} />
                            </div> 
                            <button type="submit" className="btn btn-success">บันทึก</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Create;