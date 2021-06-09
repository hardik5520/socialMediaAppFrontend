import React, { useEffect, useReducer } from 'react';

import {validate} from '../../Util/Validators'

import './Input.css';

const inputReducer =(state, action) => {
    switch(action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid:validate(action.val, action.validators)
            };
            case 'TOUCH':
                return{
                    ...state,
                    isTouched:true
                };
        default:
            return state;
    }
};

const Input =props=>{

    //useReducer always gives 2 output =>currentstate, here inputstate and dispatch is function we can call
    const [inputState, dispatch]=useReducer(inputReducer, {
        value:props.initialValue || '' , 
        isValid:props.initialValid || false, 
        isTouched:false});    
    
    const{id, onInput}=props;
    const{value, isValid}=inputState;
    
    useEffect( () => {
       onInput(id, value, isValid )
    }, [id, value, isValid, onInput]);

    const changeHandler=(event) => {
        dispatch({type: 'CHANGE',   val: event.target.value, validators:props.validators});
    };

    const touchHandler=()=>{
        dispatch({
            type:'TOUCH'
        });
    };

    const element=props.element === 'input'? 
    (<input id={props.type} 
        type={props.type} 
        placeholder={props.placeholder} 
        onChange={changeHandler} 
        value={inputState.value}
        onBlur={touchHandler}/>) :
    (<textarea id={props.id} 
        rows={props.rows || 3}  
        onChange={changeHandler} 
        value={inputState.value} 
        onBlur={touchHandler}/>);
    
    return <div className={`form-control ${!inputState.isValid && inputState.isTouched && `form-control--invalid`}`}>
        <label htmlFor={props.id}>{props.label}
            {element}
            {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
        </label>
    </div>
}

export default Input;

