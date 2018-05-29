import React from 'react'
import { Menu, Dropdown } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const MainMenu = ({ user, onCloseSidebar, onToggleSidebar, onLogout, sidebarVisible }) => {
  return (
    <Menu color='teal' inverted fixed='top' size='massive' className='app-main-menu'>
      {/* <Menu.Item icon={sidebarVisible ? 'chevron left' : 'sidebar'} header onClick={onToggleSidebar} /> */}
      <Menu.Item as={Link} to='/' header onClick={onCloseSidebar}>Simdes</Menu.Item>
      <Menu.Menu position='right'>
        <Dropdown item icon='setting'>
          <Dropdown.Menu>
            {user.employee_id && <Dropdown.Item as={Link} to='/profile' icon='user circle outline' text='Profile' />}
            <Dropdown.Item as={Link} to='/reset-password' icon='privacy' text='Reset Password' />
            {user.employee_id && <Dropdown.Item as={Link} to='/my-desa' icon='info circle' text='Identitas Desa Saya' />}
            <Dropdown.Item onClick={onLogout} icon='power' text='Logout' />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    </Menu>
  )
}

const mapStateToProps = state => ({
  user: state.auth.user
})

export default connect(mapStateToProps)(MainMenu)
