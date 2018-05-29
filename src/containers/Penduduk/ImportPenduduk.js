import React from 'react'
import { connect } from 'react-redux'
import { Modal, Icon, Button } from 'semantic-ui-react'
import { fetchOptions as fetchKelurahanOptions } from '../../reducers/options/kelurahan'
import { importPenduduk } from '../../actions/penduduk'
import { renderSelection as Selection } from '../Form'

class ImportPenduduk extends React.Component {
  constructor () {
    super()

    this.state = {
      villageId: null,
      modalOpen: false
    }

    this.handleChangeExcel = this.handleChangeExcel.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
    this.searchKelurahan = this.searchKelurahan.bind(this)
    this.handleVillageChange = this.handleVillageChange.bind(this)
  }
  componentWillMount () {
    const { fetchKelurahanOptions, village } = this.props
    if (village) {
      fetchKelurahanOptions({ q: village.name }).then(response => {
        this.setState({
          villageId: village.id
        })
      })
    }
  }
  searchKelurahan (e, data) {
    const { fetchKelurahanOptions } = this.props
    if (data.searchQuery.length < 3) return
    fetchKelurahanOptions({ q: data.searchQuery })
  }
  handleVillageChange (e, data) {
    this.setState({
      villageId: data.value
    })
  }
  handleChangeExcel (e) {
    const { importPenduduk } = this.props

    const villageId = this.state.villageId

    if (e.target.files.length <= 0) {
      return
    }

    const file = e.target.files[0]

    importPenduduk({ file, village_id: villageId })
      .then(response => {
        this.excelInput.value = null

        this.setState({
          modalOpen: true
        })
      })
      .catch(e => {
        window.alert('Terjadi kesalahan saat import data penduduk')
        console.log('e import penduduk', e)
      })
  }
  handleCloseModal () {
    this.setState({
      modalOpen: false
    })
  }
  renderModal () {
    return (
      <Modal
        open={this.state.modalOpen}
        onClose={this.handleCloseModal.bind(this)}
        inverted
        size='mini'
      >
        <Modal.Content style={{textAlign: 'center'}}>
          <p>Data penduduk sedang masuk antrian untuk diproses</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.handleCloseModal.bind(this)}>
            <Icon name='checkmark' /> Selesai
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
  render () {
    const {
      isImportingExcel,
      kelurahanOptions,
      village
    } = this.props
    return (
      <span style={{
        display: 'inline-block'
      }}>

        {this.renderModal()}

        <Selection
          icon='search'
          style={{display: 'inline-block'}}
          placeholder='Cari kelurahan'
          onSearchChange={this.searchKelurahan}
          onChange={this.handleVillageChange}
          value={this.state.villageId}
          loading={kelurahanOptions.isLoading}
          disabled={isImportingExcel || village}
          options={kelurahanOptions.options}
        /> {' '}

        <Button disabled={!this.state.villageId || isImportingExcel} loading={isImportingExcel}>
          <label style={{cursor: 'pointer'}} htmlFor='import-penduduk'>
            <Icon name='file' /> Import
            <input
              id='import-penduduk'
              hidden
              accept='.xls,.xlsx'
              type='file'
              onChange={this.handleChangeExcel}
              ref={input => {
                this.excelInput = input
              }}
            />
          </label>
        </Button>

      </span>
    )
  }
}

const mapStateToProps = state => ({
  isImportingExcel: state.penduduk.isImportingExcel,
  kelurahanOptions: state.options.kelurahan
})

export default connect(mapStateToProps, {
  fetchKelurahanOptions,
  importPenduduk
})(ImportPenduduk)
