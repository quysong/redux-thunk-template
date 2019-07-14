import React, { Component } from 'react';
import './EditiableTable.css';

import { connect } from 'react-redux';
import * as actions from './../../../redux/Employee/actions';

import DataGrid, {
    Column,
    Editing,
    Popup,
    Paging,
    Position,
    Form
} from 'devextreme-react/data-grid';
import { Item } from 'devextreme-react/form';
import axios from 'axios';
const url='http://localhost:8800/employee';
axios.defaults.headers.common['Content-Type'] = 'application/json';

class EditableTable extends Component {
    onEditorEnterKey=()=>{
        console.log('onEditorEnterKey')
    }
    componentDidMount() {
        this.props.onGetEmployee();
      }
      onRowUpdatingCustom=(e)=>{
          console.log('onRowUpdatingCustom', e)
      }
    onRowRemoving = (e) => {
        console.log('onRowRemoving', e)
        let id = 11;
        // Call api delete
        // axios
        //     .delete(url+'/'+id)
        //     .then(res => {
        //         console.log('res', res)
        //     })
        //     .catch(err => {
        //         console.log(err.message);
        //     });
        //
    }
    onRowInsertingCustom=(e)=>{
        console.log('onRowInserting', e)
    }
    render() {
        console.log('this.props.employees;', this.props.employees);
        return (
            <div id={'data-grid-demo'}>
                <DataGrid
                    dataSource={this.props.employees}
                    keyExpr={'id'}
                    showBorders={true}
                    onRowInserting={(e)=>this.onRowInsertingCustom(e)}
                    onRowUpdating={(e)=>this.onRowUpdatingCustom(e)}
                    onRowRemoving={(e)=>this.onRowRemoving(e)}
                >
                    <Paging enabled={false} />
                    <Editing
                        mode={'popup'}
                        allowUpdating={true}
                        allowAdding={true}
                        allowDeleting={true}
                        >
                        <Popup title={'Employee Info'} showTitle={true} width={700} height={525}>
                            <Position my={'top'} at={'top'} of={window} />
                        </Popup>
                        <Form onEditorEnterKey={()=>this.onEditorEnterKey()}>
                            <Item itemType={'group'} colCount={2} colSpan={2}>
                                <Item dataField={'name'} />
                                <Item dataField={'mail'} />
                                <Item dataField={'address'} />
                                <Item dataField={'phone'} />
                            </Item>
                        </Form>
                    </Editing>
                    <Column dataField={'id'} caption={'ID'} width={70} />
                    <Column dataField={'name'} />
                    <Column dataField={'address'} />
                    <Column dataField={'mail'} />
                    <Column dataField={'phone'}/>
                </DataGrid>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      employees: state.employee.employeeArr
    }
  }
  
  const mapDispatchToProps = (dispatch, props) => {
    return {
      onGetEmployee: () => {
        dispatch(actions.getEmployee());
      },
      onDeleteEmployee: (id) => {
        dispatch(actions.deleteEmployee(id));
      }
    }
  }

// export default EditableTable;
export default connect(mapStateToProps, mapDispatchToProps)(EditableTable)