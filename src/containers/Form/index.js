/**
 * Wrapper for redux-form Field with semantic-ui components
 *
 */

import React from 'react'
import { Field as ReduxField } from 'redux-form'
import { Form, Input, Dropdown, Image } from 'semantic-ui-react'
export * from './validation'

export const errorMessageStyle = {
  marginTop: 5,
  fontWeight: 'normal'
}

const renderSimple = (props) => {
  const {
    input,
    meta: { touched, error },
    type = 'text',
    label,
    placeholder = '',
    ...other
  } = props

  return (
    <Input
      error={touched && !!error}
      placeholder={placeholder}
      {...input} type={type}
      {...other}
    />
  )
}

const renderField = (props) => {
  const {
    input,
    meta: { touched, error },
    control: Control = 'input',
    type = 'text',
    label,
    placeholder = '',
    style,
    ...other
  } = props

  return (
    <Form.Field error={touched && !!error} style={style}>
      <label>{label}</label>
      <Control placeholder={placeholder} {...input} type={type} {...other} />
      {touched && (error && <label style={errorMessageStyle}>{error}</label>)}
    </Form.Field>
  )
}

const renderFileInput = (parentProps) => (props) => {
  const {
    input,
    meta: { touched, error },
    label,
    ...other
  } = props

  const {
    onChange
  } = parentProps

  return (
    <Form.Field error={touched && !!error}>
      <label>{label}</label>
      {/* this one for presentation */}
      <input type='file' onChange={onChange} {...other} />
      {/* this one for storing the value */}
      <input {...input} style={{display: 'none'}} />
      {input.value && <Image size='small' src={input.value} />}{/* TODO detect file type */}
      {touched && (error && <label style={errorMessageStyle}>{error}</label>)}
    </Form.Field>
  )
}

const renderCheckbox = (props) => {
  const {
    input,
    meta: { touched, error },
    label,
    ...other
  } = props

  return (
    <Form.Field error={touched && !!error}>
      <Form.Checkbox {...input} label={label} {...other} />
      {touched && (error && <label style={errorMessageStyle}>{error}</label>)}
    </Form.Field>
  )
}

const renderRadio = ({ input, label, type, options, meta: { touched, error, warning } }) => {
  const radios = options.map(o => (
    <label key={o.value}>
      <input
        type='radio'
        {...input}
        value={o.value}
        checked={o.value === input.value}
      />
      &nbsp;{o.label}
    </label>
  ))

  return (
    <Form.Field error={touched && !!error}>
      <label style={{display: 'block'}}>{label}</label>
      {radios}
      {touched && (error && <label style={{...errorMessageStyle, display: 'block'}}>{error}</label>)}
    </Form.Field>
  )
}

export const renderSelection = (props) => {
  const {
    input,
    icon = 'dropdown',
    label,
    options,
    meta: { touched, error } = {},
    placeholder = '',
    style,
    search = true,
    ...other
  } = props
  return (
    <Form.Field error={touched && !!error} style={style}>
      <label style={{display: 'block'}}>{label}</label>
      <Dropdown
        icon={icon}
        noResultsMessage='Tidak ditemukan'
        selectOnBlur={false}
        onChange={(e, data) => input.onChange(data.value)}
        placeholder={placeholder}
        search={search}
        selection
        options={options}
        {...other}
      />
      {touched && (error && <label style={{...errorMessageStyle, display: 'block'}}>{error}</label>)}
    </Form.Field>
  )
}

export const Radio = ({ name, label, options, renderField }) => (
  <ReduxField component={renderRadio} label={label} name={name} options={options} />
)

export const SimpleField = (props) => (
  <ReduxField {...props} component={renderSimple} />
)

export const Field = (props) => (
  <ReduxField {...props} component={renderField} />
)

export const Checkbox = (props) => (
  <ReduxField {...props} component={renderCheckbox} />
)

export const Selection = (props) => (
  <ReduxField {...props} component={renderSelection} />
)

export const FileInput = (props) => (
  <ReduxField {...props} component={renderFileInput(props)} />
)
