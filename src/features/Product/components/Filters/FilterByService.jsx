import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

FilterByService.propTypes = {
   onChange: PropTypes.func,
   filters: PropTypes.object
};

FilterByService.defaultProps = {
   onChange: null
}

function FilterByService({ filters = {}, onChange }) {

   const handleChange = (event) => {
      if (!onChange) return;
      const { name, checked } = event.target;
      onChange({
         [name]: checked
      });
   };

   const service = [
      {
         key: 'isFreeShip', value: 'isFreeShip',
      }
   ]
   return (
      <div className="checkbox">
         {
            service.map(item => (
               <p key={item.key}>
                  <FormControlLabel
                     control={
                        <Checkbox
                           checked={Boolean(filters[item.key])}
                           onChange={handleChange}
                           name={item.key} />
                     }
                     label={item.value} />
               </p>

            ))
         }
      </div>
   );
}

export default FilterByService;