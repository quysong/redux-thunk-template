import React, { Component } from 'react';
// import Employee from './Employee';
import PopupEmployee from './PopupEmployee';

import { connect } from 'react-redux'
import * as actions from './../../redux/Employee/actions'
import { DatePicker } from 'antd';

class ListEmployee extends Component {
  constructor(props) {
    super(props);
    const newEmployee = {
      Id: 0,
      Name: '',
      Email: '',
      Address: '',
      Phone: ''
    }
    this.state = {
      idLast:''
    }
  }
  componentDidMount() {
    this.props.onGetEmployee();
  }
  componentWillReceiveProps(nextprops){
    console.log('nextprops', nextprops);
    console.log('nextprops isLast', nextprops.employees[nextprops.employees.length-1].id);
    this.setState({ 
      idLast:nextprops.employees[nextprops.employees.length-1].id
     });
  }
  onAddLast=()=>{
    let obj = {
      name:"name"+new Date().getTime(),
      mail:"mail"+new Date().getTime(),
      address:"address"+new Date().getTime(),
      phone:"phone"+new Date().getTime(),
    }
    this.props.onInsertEmployee(obj);
  }
  onEdit=()=>{
    let obj = {
      id:1,
      name:"name"+new Date().getTime(),
      mail:"mail"+new Date().getTime(),
      address:"address"+new Date().getTime(),
      phone:"phone"+new Date().getTime(),
    }
    this.props.onEditEmployee(obj);
  }
  onDeleteLast=()=>{
    this.props.onDeleteEmployee(this.state.idLast);
  }
  render() {
    let results = this.props.employees;
    console.log('results', results);
    // if(results.length>0){
    //   console.log('results.length>0', results.length)
    // }else{
    //   console.log('results.length', results.length)
    // }
    return (
      <>
        List employee
        <hr></hr>
        <button onClick={()=>this.onAddLast()}>Add</button>
        <button onClick={()=>this.onEdit()}>Edit</button>
        <button onClick={()=>this.onDeleteLast()}>DeleteLast</button>
        <hr></hr>
        <div>{JSON.stringify(results)}</div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    employees: state.employee.employeeArr
    // employeeEditing:state.employee.employeeEditing
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onGetEmployee: () => {
      dispatch(actions.getEmployee());
    },
    onGetEmployeeById: (id) => {
      dispatch(actions.getEmployeeById(id));
    },
    onInsertEmployee: (obj) => {
      dispatch(actions.insertEmployee(obj));
    },
    onEditEmployee: (obj) => {
      dispatch(actions.editEmployee(obj));
    },
    onDeleteEmployee: (id) => {
      dispatch(actions.deleteEmployee(id));
    }
  }
}

// export default ListEmployee;
export default connect(mapStateToProps, mapDispatchToProps)(ListEmployee)