import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';


class Editstudent extends Component
{
    state = {
        name:'',
        course:'',
        email:'',
        phone:'',
    }

    handleInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    async componentDidMount(){
        const stundent_id = this.props.match.params.id;

        const res = await axios.get(`http://localhost:8000/api/edit-student/${stundent_id}`);
        if(res.data.status === 200)
        {
            this.setState({
                name:res.data.student.name,
                course:res.data.student.course,
                email:res.data.student.email,
                phone:res.data.student.phone
            });
        }
    }

    UpdateStudent = async (e) => {
        e.preventDefault();
        document.getElementById("update-btn").disabled  = true;
        document.getElementById("update-btn").innerText = 'Updating';
        const stundent_id = this.props.match.params.id;
        const res = await axios.put(`http://localhost:8000/api/update-student/${stundent_id}`, this.state);
        if(res.data.status === 200)
        {
            swal({
                tite:"Success!",
                text:res.data.message,
                icon: "success",
                button: "ok"
            });
            
            document.getElementById("update-btn").disabled  = false;
            document.getElementById("update-btn").innerText = 'Update Student';
           
        }else{
            console.log (res.data.status);
        }
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Edit Students<Link to={'/'} className="btn btn-primary btn-sm float-end">Back page</Link></h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.UpdateStudent}>
                                    <div className="form-group mb-3">
                                        <label>Student Name</label>
                                        <input type="text" name="name" onChange={this.handleInput} value={this.state.name} className="form-control" />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Student Course</label>
                                        <input type="text" name="course" onChange={this.handleInput} value={this.state.course} className="form-control" />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Student Email</label>
                                        <input type="text" name="email" onChange={this.handleInput} value={this.state.email} className="form-control" />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Student Phone</label>
                                        <input type="text" name="phone" onChange={this.handleInput} value={this.state.phone} className="form-control" />
                                    </div>
                                    <div className="form-group mb-3">
                                        <button type="submit" id="update-btn" className="btn btn-primary">Update Student</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Editstudent;