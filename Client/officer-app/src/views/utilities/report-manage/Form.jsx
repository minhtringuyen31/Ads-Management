import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Button, Grid } from '@mui/material';

const Form = (props) => {
  return (
    <div style={{ width: '100%', height: '80vh' }}>
      <CKEditor
        editor={ClassicEditor}
        style={{ width: '100%', height: '70vh' }}
      />
      <br />
      <Grid container spacing={1} justifyContent='center' alignItems='center'>
        <Button
          variant='contained'
          color='primary'
          sx={{
            backgroundColor: '#1976d2',
            '&:hover': {
              backgroundColor: '#115293',
            },
            padding: '10px',
            fontSize: '16px',
            fontWeight: 'bold',
            borderRadius: '5px',
            height: '30px',
          }}
        >
          Gửi phản hồi
        </Button>
      </Grid>
    </div>
  );
};

export default Form;
