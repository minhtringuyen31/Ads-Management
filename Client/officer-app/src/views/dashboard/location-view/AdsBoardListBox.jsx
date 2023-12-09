import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import AdsBoardBox from './AdsBoardBox';

const AdsBoardListBox = (props) => {
  return (
    <Grid
      item
      sx={{
        width: '100%',
        height: '40vh',
        overflow: 'auto',
        '&::-webkit-scrollbar': { display: 'none' },
      }}
    >
      {props.adsBoardsData.map((ads_board) => {
        return <AdsBoardBox key={ads_board.id} data={ads_board} />;
      })}
    </Grid>
  );
};

AdsBoardListBox.propTypes = {
  adsBoardsData: PropTypes.object,
};

export default AdsBoardListBox;
