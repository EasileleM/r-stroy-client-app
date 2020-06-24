import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import cn from 'classnames';


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Typography, Checkbox, FormControlLabel, Slider, Button, ButtonGroup, Input } from '@material-ui/core';
import { changePageAction } from '../../redux/catalog/actions/changePageAction';
import { applySearchAction } from '../../redux/catalog/actions/applySearchAction';
import { applyFiltersAction } from '../../redux/catalog/actions/applyFiltersAction';
import { AppDispatch, RootState } from '../../redux/types';
import styles from './Filters.module.scss';

export interface FiltersProps {
  className?: string;
}

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = FiltersProps & PropsFromRedux;

export function Filters({
  className,
  filters,
  applyFilters,
  appliedFilters,
  applySearch,
  changePage
}: Props) {
  const [types, setTypes] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 0]);

  const [filtersOpened, setFiltersOpened] = useState(false);
  const [priceOpened, setPriceOpened] = useState(false);

  useEffect(() => {
    setTypes(appliedFilters.types);
    setPriceRange([appliedFilters.lowestPrice, appliedFilters.highestPrice]);
  }, [appliedFilters]);

  const toggleFilters = () => {
    setFiltersOpened(!filtersOpened);
  };

  const togglePrice = () => {
    setPriceOpened(!priceOpened);
  };

  const lowestPriceToString = () => {
    return `От: ${priceRange[0]}руб.`;
  };

  const highestPriceToString = () => {
    return `До: ${priceRange[1]}руб.`;
  };

  const changeFilters = (key, value) => {
    if (key === 'types') {
      const newTypes = [...types];
      const index = newTypes.indexOf(value);
      if (index !== -1) {
        newTypes.splice(index, 1);
      } else {
        newTypes.push(value);
      }
      setTypes(newTypes);
    } else {
      setPriceRange(value);
    }
  };

  const handleApplyFilters = () => {
    applyFilters({
      types,
      highestPrice: priceRange[1],
      lowestPrice: priceRange[0]
    });
  };

  const handleClearQueryArguments = () => {
    const initialFilters = {
      ...filters,
      types: []
    };
    const emptySearch = '';
    applyFilters(initialFilters);
    applySearch(emptySearch);
    changePage(1);
  };

  return (
    <div className={cn(styles.container, className)}>
      <Typography align='center' gutterBottom variant="h5" component="h5">
        Фильтры
      </Typography>
      <ListItem button onClick={toggleFilters}>
        <ListItemText primary="Категории продуктов" />
        {filtersOpened ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={filtersOpened} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {
            filters.types
              .map(type => {
                return (
                  <ListItem key={type}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={types.includes(type)}
                          onChange={() => changeFilters('types', type)}
                          name={type}
                        />
                      }
                      label={type}
                    />
                  </ListItem>
                );
              })
          }
        </List>
      </Collapse>

      <ListItem button onClick={togglePrice}>
        <ListItemText primary="Ценовой диапазон" />
        {priceOpened ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={priceOpened} timeout="auto" unmountOnExit>
        <div className={styles.priceInputs}>
          <Input
            classes={{ root: styles.priceInputs__input }}
            value={lowestPriceToString()}
            disabled
            placeholder='От(руб.)'
          />
          <Input
            classes={{ root: styles.priceInputs__input }}
            value={highestPriceToString()}
            disabled
            placeholder='До(руб.)'
          />
          
          <Slider
            classes={{ root: styles.priceInputs__input }}
            value={priceRange}
            onChange={(e, value) => changeFilters('priceRange', value)}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            max={filters.highestPrice}
            min={filters.lowestPrice}
          />
        </div>
      </Collapse>

      <ButtonGroup
        classes={{ root: styles.buttonGroup }}
        variant="contained"
        color="primary"
        aria-label="contained primary button group"
      >
        <Button onClick={handleApplyFilters}>Применить</Button>
        <Button onClick={handleClearQueryArguments}>Очистить</Button>
      </ButtonGroup>
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  filters: state.catalog.filters,
  appliedFilters: state.catalog.appliedFilters
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  applyFilters: (appliedFilters) => {
    dispatch(applyFiltersAction(appliedFilters));
  },
  applySearch: (searchQuery) => {
    dispatch(applySearchAction(searchQuery));
  },
  changePage: (page) => {
    dispatch(changePageAction(page));
  }
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(Filters);