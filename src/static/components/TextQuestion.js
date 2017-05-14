import React from 'react';
import {Field} from 'redux-form';

const renderField = (props) => {
    const {input, type, label,  rows, cols} = props;

    return (
        <div>
            <textarea {...input} type={type} label={label} rows={rows} cols={cols} className='form-control'/>
        </div>
    )
};

const TextQuestion = (props)  => {

    const {name, question} = props;


    return (
        <div className='question-component'>
            <span className='question'>{question}</span>
            <Field name={name} component={renderField} type='text' rows='3' cols='20' />
        </div>
    );
}

TextQuestion.propTypes = {
    name: React.PropTypes.string.isRequired,
    question: React.PropTypes.string.isRequired,
}

export default TextQuestion;

