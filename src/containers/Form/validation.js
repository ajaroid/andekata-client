/**
 * Wrap validator with revalidate
 *
 */

import { createValidator } from 'revalidate'
import * as v from 'validator'

export const isEmail = createValidator(
  message => value => (v.isEmail(value + '') ? undefined : message),
  'Please enter valid email address'
)
