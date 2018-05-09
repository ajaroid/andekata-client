import { path } from 'ramda'
import is from 'is_js'

const notNull = x => !!x

// build query params, including the '?'
export const buildQuery = params => {
  const esc = encodeURIComponent
  const queryString = Object.keys(params).map((k) =>
    params[k] ? esc(k) + '=' + esc(params[k]) : null
  ).filter(notNull)

  return queryString.length >= 1
    ? '?' + queryString.join('&')
    : ''
}

// convert api response to semantic ui options format
export const toOptions = items => {
  return items.map(i => {
    return {
      text: i.name,
      value: i.id
    }
  })
  // const emptyOption = {
  //   text: '-- None --',
  //   value: ''
  // }
  // const options = items.map(i => {
  //   return {
  //     text: i.name,
  //     value: i.id
  //   }
  // })
  //
  // return [emptyOption, ...options]
}

export const toOptionsCustom = ({ textField = 'name', valueField = 'id' }) => items => {
  return items.map(i => {
    return {
      text: i[textField],
      value: i[valueField]
    }
  })
}

export const mapObject = (fn, o) => {
  return Object.keys(o).map(k => fn(o[k], k))
}

export const extractKelurahan = resource => {
  if (!resource.village) return ''
  const kelurahan = path(['village', 'name'], resource)
  const kecamatan = path(['village', 'subdistrict', 'name'], resource)
  const kabupaten = path(['village', 'subdistrict', 'regency', 'name'], resource)
  const provinsi = path(['village', 'subdistrict', 'regency', 'provincy', 'name'], resource)

  return [kelurahan, kecamatan, kabupaten, provinsi].join(', ')
}

export const openPdf = blob => {
  const file = new window.Blob([blob], {type: 'application/pdf'})
  const fileURL = window.URL.createObjectURL(file)
  window.open(fileURL)
}

export const foldErrorValidations = (validations) => {
  return Object.keys(validations).map(k => {
    if (is.array(validations[k])) {
      return validations[k].join('\n')
    }
    return validations[k]
  }).join('\n')
}
