import React from 'react'
import { Modal } from 'semantic-ui-react'

const DeleteModal = ({ trigger, onDelete, label }) => {
  return (
    <Modal
      size='small'
      dimmer='inverted'
      trigger={trigger}
      header={`Hapus ${label}`}
      content={`Apakah anda yakin ingin menghapus ${label} ini?`}
      actions={[
        { content: 'Tidak', key: 'no', triggerClose: true },
        { content: 'Ya', onClick: onDelete, key: 'yes', color: 'red' }
      ]}
    />
  )
}

export default DeleteModal
