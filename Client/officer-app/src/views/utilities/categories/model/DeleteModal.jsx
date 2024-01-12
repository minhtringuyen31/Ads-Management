import { Button, Grid, Modal, Typography } from '@mui/material';
import instance from 'axiosConfig/axios-config';
import { rootApi } from 'lib/api';
import MainCard from 'ui-component/cards/MainCard';

const DeleteModal = ({
  open,
  handleDeleteClose,
  type,
  handleTriggleList,
  id,
}) => {
  const handleDeleteSubmit = async () => {
    try {
      if (type === 'adsboardtype') {
        await instance.delete(`${rootApi}/adsboardtype/${id}`);
        handleDeleteClose();
        handleTriggleList();
      } else if (type === 'adstype') {
        await instance.delete(`${rootApi}/adstype/${id}`);
        handleDeleteClose();
        handleTriggleList();
      } else {
        await instance.delete(`${rootApi}/locationtype/${id}`);
        handleDeleteClose();
        handleTriggleList();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal
      open={open}
      onClose={() => handleDeleteClose()}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      BackdropProps={{ style: { opacity: 0.15 } }}
    >
      <MainCard
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 375,
          bgcolor: 'background.paper',
          border: '1px solid #ccc',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography id='modal-modal-title' variant='h3' component='h2'>
              {type === 'adsboardtype'
                ? 'Bạn có chắc chắn muốn xóa loại bảng quảng cáo này?'
                : type === 'adstype'
                ? 'Bạn có chắc chắn muốn xóa loại quảng cáo này?'
                : 'Bạn có chắc chắn muốn xóa loại địa điểm này?'}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={6} display='flex' justifyContent='flex-start'>
                <Button color='success' onClick={() => handleDeleteSubmit()}>
                  Đồng ý
                </Button>
              </Grid>
              <Grid item xs={6} display='flex' justifyContent='flex-end'>
                <Button color='error' onClick={() => handleDeleteClose()}>
                  Hủy
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </MainCard>
    </Modal>
  );
};

export default DeleteModal;
