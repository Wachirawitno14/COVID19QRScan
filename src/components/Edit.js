import React from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Edit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            key: '',
            place: '',
            address: '',
            time: ''
        }
    }

    componentDidMount = () => {
        const ref = firebase.firestore().collection('Place').doc(this.props.match.params.id);
        ref.get()
            .then((doc) => {
                if (doc.exists) {
                    const place = doc.data();
                    this.setState({
                        key: doc.id,
                        place: place.place,
                        address: place.address,
                        time: place.time,
                    });
                } else {
                    console.log("No such document");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState({ board: state });
    }

    onSubmit = (e) => {

        e.preventDefault();

        const { place, address, time } = this.state;

        const updateRef = firebase.firestore().collection('Place').doc(this.state.key);
        updateRef.set({
            place,
            address,
            time
        })
            .then((docRef) => {
                this.setState({
                    key: '',
                    place: '',
                    address: '',
                    time: '',
                });
                this.props.history.push("/show/" + this.props.match.params.id);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="container">
                <div className="panel panel-default">
                    <div className="panel-hedding">
                        <h3 className="panel-title">
                            แก้ไขสถานที่
                        </h3>
                    </div>
                    <div className="panel-body">
                        <h4><Link to={`/show/${this.state.key}`} className="btn btn-primary">กลับหนัาหลัก</Link></h4>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="title">สถานที่:</label>
                                <input type="text" className="form-control" name="place" value={this.state.place} onChange={this.onChange} placeholder="place"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">ที่อยู่:</label>
                                <input type="text" className="form-control" name="address" value={this.state.address} onChange={this.onChange} placeholder="address"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="author">เวลาเริ่ม:</label>
                                <input type="text" className="form-control" name="time" value={this.state.time} onChange={this.onChange} placeholder="time"/>
                            </div>
                            <button type="submit" className="btn btn-success">บันทึก</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Edit;