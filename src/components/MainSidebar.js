import React from 'react'
import { connect } from 'react-redux'
import { hasPrivilege } from '../reducers/auth'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class MenuItem extends React.Component {
  constructor () {
    super()
    this.toggle = this.toggle.bind(this)

    this.state = {
      isOpen: false
    }
  }
  toggle () {
    this.setState(prev => {
      return {
        ...prev,
        isOpen: !prev.isOpen
      }
    })
  }
  render () {
    const { name, onSubmenuClick, items = [] } = this.props
    const { isOpen } = this.state
    const icon = isOpen ? 'angle down' : 'angle right'
    const menuStyle2 = {
      display: isOpen ? 'block' : 'none',
      borderBottom: '1px solid rgba(148, 148, 148, 0.1)'
    }
    const menuStyle = {
      borderBottom: '1px solid rgba(148, 148, 148, 0.1)'
    }
    const submenuStyle = {
      marginTop: 0
    }

    if (isOpen) {
      menuStyle.background = 'rgba(0,0,0,.03)'
      menuStyle.color = 'rgba(0,0,0,.95)'
    }

    return (
      <div>
        <Menu.Item onClick={this.toggle} name={name} icon={icon} style={menuStyle} />
        <Menu.Item as='div' style={menuStyle2} onClick={onSubmenuClick}>
          {
            items.length > 0 && <Menu.Menu style={submenuStyle}>
              {items.filter(i => i.hidden !== true).map(i => <Menu.Item key={i.name} as={Link} to={i.to} icon={i.icon} name={i.name} />)}
            </Menu.Menu>
          }
        </Menu.Item>
      </div>
    )
  }
}

const MainSidebar = (props) => {
  const { onToggleSidebar, hasPrivilege } = props
  return (
    <Menu vertical size='huge' className='app-sidebar-menu'>
      <Menu.Item as={Link} to='/' icon='dashboard' name='Dashboard' onClick={onToggleSidebar} />

      {
        hasPrivilege(['surat-pelayanan-index']) ? <MenuItem
          name='Pelayanan Surat'
          onSubmenuClick={onToggleSidebar}
          items={[
            // { to: '/surat-keluar-masuk', name: 'Surat Keluar Masuk', icon: 'circle thin' },
            // { to: '/surat-pelayanan', name: 'Surat Pelayanan', icon: 'circle thin' }
            { to: '/surat-pengantar', name: 'Surat Pengantar', icon: 'send outline', hidden: !hasPrivilege('surat-pelayanan-index') },
            { to: '/surat-keterangan', name: 'Surat Keterangan', icon: 'file text', hidden: !hasPrivilege('surat-pelayanan-index') }
          ]}
        /> : null
      }

      {
        hasPrivilege(['penduduk-index']) ? <MenuItem
          name='Kependudukan'
          onSubmenuClick={onToggleSidebar}
          items={[
            // { to: '/kk', name: 'Kartu Keluarga', icon: 'vcard outline' },
            { to: '/penduduk', name: 'Penduduk', icon: 'users', hidden: !hasPrivilege('penduduk-index') }
          ]}
        /> : null
      }

      {
        hasPrivilege([
          'pekerjaan-index',
          'pendidikan-index',
          'agama-index',
          'shk-index',
          'keperluan-surat-index',
          'status-kawin-index'
        ]) ? <MenuItem
          name='Referensi'
          onSubmenuClick={onToggleSidebar}
          items={[
            { to: '/pekerjaan', name: 'Pekerjaan', icon: 'black tie', hidden: !hasPrivilege('pekerjaan-index') },
            { to: '/pendidikan', name: 'Pendidikan', icon: 'student', hidden: !hasPrivilege('pendidikan-index') },
            { to: '/agama', name: 'Agama', icon: 'moon', hidden: !hasPrivilege('agama-index') },
            { to: '/shk', name: 'Status Hubungan Keluarga', icon: 'minimize', hidden: !hasPrivilege('shk-index') },
            { to: '/keperluan-surat', name: 'Keperluan Surat', icon: 'archive', hidden: !hasPrivilege('keperluan-surat-index') },
            { to: '/status-kawin', name: 'Status Kawin', icon: 'check circle', hidden: !hasPrivilege('status-kawin-index') }
          ]}
        /> : null
      }

      {
        hasPrivilege([
          'provinsi-index',
          'kabupaten-index',
          'kecamatan-index',
          'kelurahan-index'
        ]) ? <MenuItem
          name='Wilayah'
          onSubmenuClick={onToggleSidebar}
          items={[
            { to: '/provinsi', name: 'Provinsi', icon: 'marker', hidden: !hasPrivilege('provinsi-index') },
            { to: '/kabupaten', name: 'Kabupaten', icon: 'bus', hidden: !hasPrivilege('kabupaten-index') },
            { to: '/kecamatan', name: 'Kecamatan', icon: 'map signs', hidden: !hasPrivilege('kecamatan-index') },
            { to: '/kelurahan', name: 'Kelurahan', icon: 'tree', hidden: !hasPrivilege('kelurahan-index') }
          ]}
        /> : null
      }

      {
        hasPrivilege([
          'group-index',
          'user-index',
          'dept-index',
          'position-index',
          'employee-index'
        ]) ? <MenuItem
          name='System'
          onSubmenuClick={onToggleSidebar}
          items={[
            { to: '/group', name: 'Group', icon: 'group', hidden: !hasPrivilege('group-index') },
            { to: '/user', name: 'User', icon: 'user', hidden: !hasPrivilege('user-index') },
            { to: '/department', name: 'Departemen', icon: 'building outline', hidden: !hasPrivilege('dept-index') },
            { to: '/position', name: 'Jabatan', icon: 'sitemap', hidden: !hasPrivilege('position-index') },
            { to: '/employee', name: 'Karyawan', icon: 'suitcase', hidden: !hasPrivilege('employee-index') }
          ]}
        /> : null
      }

      {hasPrivilege('identitas-desa-index') ? <Menu.Item as={Link} to='/desa' icon='info circle' name='Identitas Desa' onClick={onToggleSidebar} /> : null}

    </Menu>
  )
}

const mapStateToProps = state => {
  return {
    hasPrivilege: hasPrivilege(state)
  }
}
export default connect(mapStateToProps)(MainSidebar)
