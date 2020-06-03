import React from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';
import QRCode from 'qrcode.react';

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
        firebase.firestore().collection('Place').doc(id).delete()
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
                        <h4><Link to="/">แสดงรายชื่อสถานที่</Link></h4>
                        <h3 className="panel-title">
                            {this.state.place.place}
                        </h3>
                    </div>
                    <div className="panel-body">
                        <dl>
                            <dt>ที่อยู่:</dt>
                            <dd>{this.state.place.address}</dd>
                            <dt>QR Code:</dt>
                            <dd><QRCode id="1" value={this.state.place} ></QRCode></dd>
                        </dl>
                       <div>
                       <button type="submit" className="btn btn-success" onClick={downloadQR}>บันทึก QR Code</button> 
                       <br />
                       </div> 
                       <div >
                       <br />
                        <Link to={`/edit/${this.state.key}`} className="btn btn-success">แก้ไข</Link>
                        &nbsp; &nbsp; &nbsp; 
                        <button onClick={() => this.delete(this.state.key)} className="btn btn-danger">ลบ</button>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

const downloadQR = () => {
    const canvas = document.getElementById("1");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "QR.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
export default Show;