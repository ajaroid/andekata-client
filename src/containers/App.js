import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { Grid, Modal, Button, Header } from 'semantic-ui-react'
import MainSidebar from './MainSidebar'
import MainMenu from './MainMenu'
import User from './User'
import Group from './Group'
import Department from './Department'
import Pekerjaan from './Pekerjaan'
import Pendidikan from './Pendidikan'
import Penduduk from './Penduduk'
import Agama from './Agama'
import Position from './Position'
import Kk from './Kk'
import Employee from './Employee'
import Shk from './Shk'
import Desa from './Desa'
import MyDesa from './MyDesa'
import KeperluanSurat from './KeperluanSurat'
import StatusKawin from './StatusKawin'
import Dashboard from './Dashboard'
import Provinsi from './Provinsi'
import Kabupaten from './Kabupaten'
import Kecamatan from './Kecamatan'
import Kelurahan from './Kelurahan'
import SuratKeluarMasuk from './SuratKeluarMasuk'
import SuratPelayanan from './SuratPelayanan'
import SuratPengantar from './SuratPengantar'
import SuratKeterangan from './SuratKeterangan'
import Profile from './Profile'
import ResetPassword from './ResetPassword'
import Forbidden from './Forbidden'
import { logout } from '../actions/auth'
import { toggleSidebar, closeSidebar } from '../actions/ui'
import { clearError } from '../reducers/error/actions'

const ErrorModal = (props) => {
  const {
    message,
    open,
    onClose
  } = props
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeIcon
      size='tiny'
    >
      <Header icon='warning sign' />
      <Modal.Content image>
        <Modal.Description>
          {message}
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={onClose}>Ok</Button>
      </Modal.Actions>
    </Modal>
  )
}

const LoginErrorModal = (props) => {
  const {
    message,
    open,
    onClose
  } = props
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeIcon
      size='tiny'
    >
      <Header icon='warning sign' />
      <Modal.Content image>
        <Modal.Description>
          {message}
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={onClose}>Ok</Button>
      </Modal.Actions>
    </Modal>
  )
}

const AuthorizationErrorModal = (props) => {
  const {
    message,
    open,
    onClose
  } = props
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeIcon
      size='tiny'
    >
      <Header icon='warning sign' />
      <Modal.Content image>
        <Modal.Description>
          {message}
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
}

class App extends React.Component {
  handleCloseLoginError () {
    const { clearError, logout } = this.props
    clearError({
      scope: 'loginError'
    })
    logout()
  }
  handleCloseGenericError () {
    const { clearError } = this.props
    clearError({
      scope: 'genericError'
    })
  }
  handleCloseAuthorizationError () {
    const { clearError } = this.props
    clearError({
      scope: 'authorizationError'
    })
  }
  render () {
    const {
      error,
      isLoggedIn,
      sidebarVisible,
      logout,
      toggleSidebar,
      closeSidebar
    } = this.props

    return isLoggedIn ? (
      <div>
        <MainMenu sidebarVisible={sidebarVisible} onLogout={logout} onToggleSidebar={toggleSidebar} onCloseSidebar={closeSidebar} />
        <Grid padded className='app-pushable'>
          <Grid.Column width={3} className='app-sidebar-column'>
            <MainSidebar />
          </Grid.Column>
          <Grid.Column width={13} className='app-pusher'>
            <Route exact path='/' component={Dashboard} />
            <Route path='/user' component={User} />
            <Route path='/profile' component={Profile} />
            <Route path='/reset-password' component={ResetPassword} />
            <Route path='/group' component={Group} />
            <Route path='/department' component={Department} />
            <Route path='/pekerjaan' component={Pekerjaan} />
            <Route path='/pendidikan' component={Pendidikan} />
            <Route path='/agama' component={Agama} />
            <Route path='/position' component={Position} />
            <Route path='/kk' component={Kk} />
            <Route path='/penduduk' component={Penduduk} />
            <Route path='/employee' component={Employee} />
            <Route path='/shk' component={Shk} />
            <Route path='/keperluan-surat' component={KeperluanSurat} />
            <Route path='/status-kawin' component={StatusKawin} />
            <Route path='/provinsi' component={Provinsi} />
            <Route path='/kabupaten' component={Kabupaten} />
            <Route path='/kecamatan' component={Kecamatan} />
            <Route path='/kelurahan' component={Kelurahan} />
            <Route path='/surat-keluar-masuk' component={SuratKeluarMasuk} />
            <Route path='/surat-pelayanan' component={SuratPelayanan} />
            <Route path='/surat-pengantar' component={SuratPengantar} />
            <Route path='/surat-keterangan' component={SuratKeterangan} />
            <Route path='/desa' component={Desa} />
            <Route path='/my-desa' component={MyDesa} />
            <Route path='/forbidden/:pagename?' component={Forbidden} />
          </Grid.Column>
        </Grid>
        <LoginErrorModal
          message={error.loginError}
          open={!!error.loginError}
          onClose={this.handleCloseLoginError.bind(this)}
        />
        <AuthorizationErrorModal
          message={error.authorizationError}
          open={!!error.authorizationError}
          onClose={this.handleCloseAuthorizationError.bind(this)}
        />
        <ErrorModal
          message={error.genericError}
          open={!!error.genericError}
          onClose={this.handleCloseGenericError.bind(this)}
        />
      </div>
    ) : (
      <Redirect to='/login' />
    )
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  sidebarVisible: state.ui.sidebarVisible,
  error: state.error
})

const mapDispatchToProps = {
  toggleSidebar,
  closeSidebar,
  clearError,
  logout
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
