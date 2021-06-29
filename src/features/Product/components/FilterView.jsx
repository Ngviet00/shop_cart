import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import { Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { formatCurrency } from 'ultils';

FilterView.propTypes = {
   filters: PropTypes.object
};

FilterView.defaultProps = {
   filters: {},
   onChange: null
}
const useStyles = makeStyles((theme) => ({
   list_filters: {
      display: 'flex',
      justifyContent: 'flex-start',
      marginBottom: '1em',

      '& li': {
         marginRight: '.5em'
      }
   }
}))

function FilterView({ brands, filters, onChange, categories }) {
   const classes = useStyles();
   const list_filters = [
      {
         id: 1,
         label: () => 'FreeShip',
         isActive: (filters) => filters.isFreeShip,
         isVisible: () => true,
         isRemovable: false,
         onRemove: null,
         onToggle: (filters) => {
            const newFilters = { ...filters };
            if (newFilters.isFreeShip) {
               delete newFilters.isFreeShip;
            } else {
               newFilters.isFreeShip = true;
            }
            return newFilters;
         },
      },
      {
         id: 2,
         label: (filters) => {

            return categories
               .filter(x => x.id === filters.categoryId)
               .map((item) => { return item.name });
         },
         isActive: () => true,
         isVisible: (filters) => Object.keys(filters).includes('categoryId'),
         isRemovable: true,
         onRemove: (filters) => {
            const newFilters = { ...filters };
            delete newFilters.categoryId;
            return newFilters;
         },
         onToggle: null,
      },
      {
         id: 3,
         label: (filters) => {
            if (filters.salePrice_gte === 0 && filters.salePrice_lte === 500000) {
               return 'Dưới 500.000';
            }
            else if (filters.salePrice_gte === 500000 && filters.salePrice_lte === 1000000) {
               return '500.000 đến 1.000.000';
            }
            else if (filters.salePrice_gte === 1000000 && filters.salePrice_lte === 100000000) {
               return 'Trên 1.000.000';
            }
            else {
               return `${formatCurrency(filters.salePrice_gte)} to ${formatCurrency(filters.salePrice_lte)}`
            }
         },
         isActive: () => true,
         isVisible: (filters) => Object.keys(filters).includes('salePrice_gte') && Object.keys(filters).includes('salePrice_lte'),
         isRemovable: true,
         onRemove: (filters) => {
            const newFilters = { ...filters };
            delete newFilters.salePrice_gte;
            delete newFilters.salePrice_lte;
            return newFilters;
         },
         onToggle: null,
      },
      {
         id: 4,
         label: (filters) => `${filters.star} star`,
         isActive: () => true,
         isVisible: (filters) => Object.keys(filters).includes('star'),
         isRemovable: true,
         onRemove: (filters) => {
            const newFilters = { ...filters };
            delete newFilters.star;
            return newFilters;
         },
         onToggle: null,
      },
      {
         id: 5,
         label: (filters) => {

            return brands
               .filter(x => x.id === filters.brandId)
               .map((item) => { return item.name });
         },
         isActive: () => true,
         isVisible: (filters) => Object.keys(filters).includes('brandId'),
         isRemovable: true,
         onRemove: (filters) => {
            const newFilters = { ...filters };
            delete newFilters.brandId;
            return newFilters;
         },
         onToggle: null,
      }
   ];

   const visibleFilters = useMemo(() => {
      return list_filters.filter(x => x.isVisible(filters));
   }, [filters]);

   return (
      <Box component="ul" className={classes.list_filters}>
         {
            visibleFilters.map(x => (
               <li key={x.id}>
                  <Chip
                     size="small"
                     label={x.label(filters)}
                     color="primary"
                     variant={!x.isRemovable ? 'default' : 'outlined'}
                     clickable={!x.isRemovable}
                     onClick={x.isRemovable ? null : () => {
                        if (!onChange) return;
                        const newFilters = x.onToggle(filters);
                        onChange(newFilters);
                     }}
                     onDelete={x.isRemovable ?
                        () => {
                           if (!onChange) return;
                           const newFilters = x.onRemove(filters);
                           onChange(newFilters);
                        }
                        : null}
                  />
               </li>
            ))
         }
      </Box>
   );
}

export default FilterView;