import { Grid } from '@mui/material';
import { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import AdsBoardTypeList from './ads_board_type/AdsBoardTypeList';
import AdsTypeList from './ads_type/AdsTypeList';
import LocationTypeList from './location_type/LocationTypeList';
import AddModal from './model/AddModel';
import DeleteModal from './model/DeleteModal';
import EditModal from './model/EditModel';

const CategoryContent = () => {
  const [triggleList, setTriggleList] = useState(false);

  const [openAdd, setOpenAdd] = useState({
    open: false,
    type: '',
  });

  const [openEdit, setOpenEdit] = useState({
    id: '',
    open: false,
    label: '',
    type: '',
  });

  const [openDelete, setOpenDelete] = useState({
    id: '',
    open: false,
    type: '',
  });

  const handleTriggleList = () => {
    setTriggleList(!triggleList);
  };

  const handleAddOpen = (type) => {
    setOpenAdd({
      open: true,
      type,
    });
  };

  const handleAddClose = () => {
    setOpenAdd({
      open: false,
      type: '',
    });
  };

  const handleEditOpen = (type, id, label) => {
    setOpenEdit({
      open: true,
      type,
      id,
      label,
    });
  };

  const handleEditClose = () => {
    setOpenEdit({
      open: false,
      type: '',
      id: '',
      label: '',
    });
  };

  const handleDeleteOpen = (id, type) => {
    setOpenDelete({
      id: id,
      open: true,
      type: type,
    });
  };

  const handleDeleteClose = () => {
    setOpenDelete({
      id: '',
      open: false,
      type: '',
    });
  };

  return (
    <Grid container>
      <Grid item xs={12} lg={12}>
        <MainCard>
          <Grid container>
            <Grid item xs={12} lg={4}>
              <AdsBoardTypeList
                triggleList={triggleList}
                handleAddOpen={handleAddOpen}
                handleEditOpen={handleEditOpen}
                handleDeleteOpen={handleDeleteOpen}
              />
            </Grid>
            <br />
            <Grid item xs={12} lg={4}>
              <AdsTypeList
                triggleList={triggleList}
                handleAddOpen={handleAddOpen}
                handleEditOpen={handleEditOpen}
                handleDeleteOpen={handleDeleteOpen}
              />
            </Grid>
            <br />
            <Grid item xs={12} lg={4}>
              <LocationTypeList
                triggleList={triggleList}
                handleAddOpen={handleAddOpen}
                handleEditOpen={handleEditOpen}
                handleDeleteOpen={handleDeleteOpen}
              />
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
      <AddModal
        open={openAdd.open}
        type={openAdd.type}
        handleAddClose={handleAddClose}
        handleTriggleList={handleTriggleList}
      />
      <EditModal
        open={openEdit.open}
        type={openEdit.type}
        id={openEdit.id}
        label={openEdit.label}
        handleEditClose={handleEditClose}
        handleTriggleList={handleTriggleList}
      />
      <DeleteModal
        open={openDelete.open}
        type={openDelete.type}
        id={openDelete.id}
        handleDeleteClose={handleDeleteClose}
        handleTriggleList={handleTriggleList}
      />
    </Grid>
  );
};

export default CategoryContent;
