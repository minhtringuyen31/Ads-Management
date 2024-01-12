import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  Modal,
  OutlinedInput,
  Typography,
} from '@mui/material';
import instance from 'axiosConfig/axios-config';
import { Formik } from 'formik';
import { rootApi } from 'lib/api';
import PropTypes from 'prop-types';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import * as Yup from 'yup';

const EditModal = ({
  open,
  handleEditClose,
  type,
  districtId,
  id,
  label,
  handleTriggleList,
}) => {
  const handleEditSubmit = async (
    value,
    { setStatus, setSubmitting, setErrors, resetForm }
  ) => {
    try {
      if (type === 'district') {
        await instance.put(`${rootApi}/district/${id}`, {
          label: value.label,
        });
        setSubmitting(false);
        handleEditClose();
        resetForm();
        setStatus({ success: true });
        handleTriggleList();
      } else {
        await instance.put(`${rootApi}/ward/${id}`, {
          label: value.label,
          district_id: districtId,
        });
        setSubmitting(false);
        handleEditClose();
        resetForm();
        setStatus({ success: true });
        handleTriggleList();
      }
    } catch (error) {
      setSubmitting(false);
      setStatus({ success: false });
      setErrors({ submit: error.message });
    }
  };
  return (
    <Modal
      open={open}
      onClose={() => handleEditClose()}
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
              {type === 'district'
                ? 'Chỉnh sửa Quận/Huyện'
                : 'Chỉnh sửa Phường/Xã'}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Formik
              initialValues={{
                label: label,
              }}
              validationSchema={Yup.object().shape({
                label: Yup.string()
                  .required(
                    `Vui lòng nhập tên ${
                      type === 'district' ? 'Quận/Huyện' : 'Phường/Xã'
                    }`
                  )
                  .min(2, 'Tên phải có ít nhất 2 ký tự'),
              })}
              onSubmit={handleEditSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel htmlFor='outlined-adornment-label'>
                          {type === 'district' ? 'Quận/Huyện' : 'Phường/Xã'}
                        </InputLabel>
                        <OutlinedInput
                          id='outlined-adornment-password'
                          type='text'
                          value={values.label}
                          name='label'
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.label && Boolean(errors.label)}
                          label={
                            type === 'district' ? 'Quận/Huyện' : 'Phường/Xã'
                          }
                          placeholder={
                            type === 'district' ? 'Quận/Huyện' : 'Phường/Xã'
                          }
                        />
                        {touched.label && Boolean(errors.label) && (
                          <FormHelperText
                            error
                            id='standard-weight-helper-text'
                          >
                            {errors.label}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <AnimateButton>
                        <Button
                          fullWidth
                          size='large'
                          type='submit'
                          variant='contained'
                          disabled={isSubmitting}
                          color='primary'
                        >
                          <Typography
                            fontWeight='bold'
                            fontSize='clamp(1rem, 1.2rem, 1.5rem)'
                          >
                            Chỉnh sửa
                          </Typography>
                        </Button>
                      </AnimateButton>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </MainCard>
    </Modal>
  );
};

EditModal.propTypes = {
  open: PropTypes.bool,
  handleEditClose: PropTypes.func,
  type: PropTypes.string,
  districtId: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
};

export default EditModal;
