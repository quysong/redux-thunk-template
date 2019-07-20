import * as Types from './constants'

var iniState = {
    employeeArr: [],
    employeeEditing: {
        Id: 0,
        Name: '',
        Email: '',
        Address: '',
        Phone: ''
    }
}

var employee = (state = iniState, action) => {
    switch (action.type) {
        case Types.FETCH_EMPLOYEE:
            return { ...state };
        case Types.FETCH_EMPLOYEE_SUCCESS:
            state.employeeArr = action.payload;
            console.log('state', state.employeeArr)
            return  { ...state } ;
        case Types.FETCH_EMPLOYEE_FAILURE:
            return { ...state };

        case Types.FETCH_EMPLOYEE_BY_ID:
            return { ...state };
        case Types.FETCH_EMPLOYEE_BY_ID_SUCCESS:
            return { ...state, employeeEditing: action.payload };
        case Types.FETCH_EMPLOYEE_BY_ID_FAILURE:
            return { ...state };

        case Types.INSERT_EMPLOYEE:
            return { ...state };
        case Types.INSERT_EMPLOYEE_SUCCESS:
                let id = action.payload.id;
                state.employeeArr[state.employeeArr.length-1].id = id;
                return { ...state };
        case Types.INSERT_EMPLOYEE_FAILURE:
            console.log('Types.INSERT_EMPLOYEE_FAILURE', action.payload)
            return { ...state };

        case Types.UPDATE_EMPLOYEE:
            return { ...state };
        case Types.UPDATE_EMPLOYEE_SUCCESS:
            var newArr = [...state.employeeArr];
            var foundIndex = newArr.findIndex(x => x.Id === action.payload.Id);
            newArr[foundIndex] = action.payload;
            return {
                ...state,
                employeeArr: newArr
            };
        case Types.UPDATE_EMPLOYEE_FAILURE:
            return { ...state };

        case Types.DELETE_EMPLOYEE:
                console.log('DELETE_EMPLOYEE state', state)
            return { ...state };
        case Types.DELETE_EMPLOYEE_SUCCESS:
            console.log('DELETE_EMPLOYEE_SUCCESS state', state)
            return  { ...state };
        case Types.DELETE_EMPLOYEE_FAILURE:
            return { ...state };
        default:
            return { ...state };
    }
}

export default employee;