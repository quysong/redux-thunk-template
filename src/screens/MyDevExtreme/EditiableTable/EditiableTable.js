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

class EditableTable extends Component {
    onEditorEnterKey = () => {
        console.log('onEditorEnterKey')
    }
    componentDidMount() {
        this.props.onGetEmployee();
    }
    onRowUpdatingCustom = (e) => {
    }
    onRowRemoving = (e) => {
        let id = e.data.id;
        var result = this.props.onDeleteEmployee(id);
    }
    componentWillReceiveProps = (nextProps) => {
        console.log('nextProps', nextProps)
    }
    onRowInsertingCustom = (e) => {
        console.log('this.props.employees 1', this.props.employees)

        let newEmployee = e.data;
        // Call api Insert
        this.props.onInsertEmployee(newEmployee);

        console.log('this.props.employees 2', this.props.employees)
    }
    render() {
        console.log('this.props.employees;', this.props.employees);
        return (
            <div id={'data-grid-demo'}>
                <DataGrid
                    dataSource={this.props.employees}
                    keyExpr={'id'}
                    showBorders={true}
                    onRowInserting={(e) => this.onRowInsertingCustom(e)}
                    onRowUpdating={(e) => this.onRowUpdatingCustom(e)}
                    onRowRemoving={(e) => this.onRowRemoving(e)}
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
                        <Form onEditorEnterKey={() => this.onEditorEnterKey()}>
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
                    <Column dataField={'phone'} />
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
        },
        onInsertEmployee: (obj) => {
            dispatch(actions.insertEmployee(obj));
        },
        onEditEmployee: (obj) => {
            dispatch(actions.editEmployee(obj));
        }
    }
}

// export default EditableTable;
export default connect(mapStateToProps, mapDispatchToProps)(EditableTable)
