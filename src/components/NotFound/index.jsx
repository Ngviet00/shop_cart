import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
   style: {
      padding: '20px 0px',

      'a': {
         color: 'black',
      }
   },
}))

function NotFound() {
   const c = useStyles();
   return (
      <div className='container'>
         <h2 className={c.style}>Lỗi không tìm thấy đường dẫn.
            <Link to='/'>
               Quay lại
            </Link>
         </h2>
      </div>
   )
}

export default NotFound
