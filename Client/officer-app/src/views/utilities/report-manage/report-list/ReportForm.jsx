import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Button, FormHelperText, Grid } from '@mui/material';
import axios from 'axios';
import { Formik } from 'formik';
import { rootApi } from 'lib/api';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import { GetUser } from 'store/auth/auth-config';
import * as Yup from 'yup';

const ReportForm = (props) => {
  const navigator = useNavigate();
  const handleSubmitForm = async (
    values,
    { setStatus, setErrors, setSubmitting }
  ) => {
    try {
      const user = GetUser();
      await axios.put(`${rootApi}/report/${props.reportId}`, {
        operation: {
          user: user._id,
          content: values.editorContent,
        },
        status: 'completed',
      });
      setStatus({ success: true });
      setSubmitting(false);
      navigator('/utils/report/list');
    } catch (error) {
      setStatus({ success: false });
      setSubmitting(false);
      setErrors({ submit: error.message });
    }
  };

  return (
    <div style={{ width: '100%', height: '80vh' }}>
      <Formik
        initialValues={{
          editorContent: '',
        }}
        onSubmit={handleSubmitForm}
        validationSchema={Yup.object().shape({
          editorContent: Yup.string().required('Vui lòng nhập nội dung'),
        })}
      >
        {({
          values,
          errors,
          handleChange,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          touched,
        }) => (
          <form onSubmit={handleSubmit}>
            <CKEditor
              editor={ClassicEditor}
              data={
                props.operation ? props.operation.content : values.editorContent
              }
              onChange={(event, editor) => {
                const data = editor.getData();
                setFieldValue('editorContent', data);
              }}
              disabled={props.reportStatus === 'completed'}
            />
            {touched.editorContent && errors.editorContent && (
              <FormHelperText error id='standard-weight-helper-text--bottom'>
                {errors.editorContent}
              </FormHelperText>
            )}
            <Grid container justifyContent='center' mt={3}>
              <Button
                variant='contained'
                color='primary'
                type='submit'
                disabled={props.reportStatus === 'completed' || isSubmitting}
              >
                Gửi phản hồi
              </Button>
            </Grid>
          </form>
        )}
      </Formik>
    </div>
  );
};

ReportForm.propTypes = {
  operation: PropTypes.object,
  reportStatus: PropTypes.string,
  reportId: PropTypes.string,
};

export default ReportForm;
