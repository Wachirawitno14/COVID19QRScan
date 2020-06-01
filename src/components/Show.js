import React from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Show extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            place: {},
            key: '',
        }
    }

    componentDidMount = () => {
        
        const ref = firebase.firestore().collection('Place').doc(this.props.match.params.id);
        ref.get().then((doc) => {
            if (doc.exists) {
                this.setState({
                    place: doc.data(),
                    key: doc.id,
                    isLoading: false,
                });
            } else {
                console.log("No such document.");
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    delete = (id) => {
        firebase.firestore().collection('boards').doc(id).delete()
            .then(() => {
                console.log("Document successfully deleted!")
                this.props.history.push("/");
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="container">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h4><Link to="/">Place list</Link></h4>
                        <h3 className="panel-title">
                            {this.state.place.place}
                        </h3>
                    </div>
                    <div className="panel-body">
                        <dl>
                            <dt>Address:</dt>
                            <dd>{this.state.place.address}</dd>
                            <dt>Time:</dt>
                            <dd>{this.state.place.time}</dd>
                        </dl>
                        <Link to={`/edit/${this.state.key}`} className="btn btn-success">Edit</Link>
                        <button onClick={() => this.delete(this.state.key)} className="btn btn-danger">Delete</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Show;