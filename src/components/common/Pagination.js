import React from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const pagesNumber = ({ to, currentPage, lastPage }) => {
  const offset = 4

  if (!to) {
    return []
  }
  var pageFrom = currentPage - offset
  if (pageFrom < 1) {
    pageFrom = 1
  }
  var pageTo = pageFrom + (offset * 2)
  if (pageTo >= lastPage) {
    pageTo = lastPage
  }
  var pagesArray = []
  while (pageFrom <= pageTo) {
    pagesArray.push(pageFrom)
    pageFrom++
  }
  return pagesArray
}

const activeStyle = {
  backgroundColor: '#37b1ad',
  color: 'white'
}

const Pagination = ({ prefix, to, current_page: currentPage, last_page: lastPage }) => {
  const numbers = pagesNumber({ to, currentPage, lastPage })
  return lastPage <= 1 ? (
    null
  ) : (
    <Menu pagination size='small'>
      <Menu.Item
        disabled={currentPage === 1}
        as={Link}
        to={`${prefix}1`}
        icon='angle double left'
      />
      {numbers.map(p =>
        <Menu.Item
          key={p}
          as={Link}
          to={`${prefix}${p}`}
          name={p.toString()}
          style={(+p) === (+currentPage) ? activeStyle : {}}
          active={(+p) === (+currentPage)} />)
      }
      <Menu.Item
        disabled={currentPage === lastPage}
        as={Link}
        to={`${prefix}${lastPage}`}
        icon='angle double right'
      />
    </Menu>
  )
}

export default Pagination
