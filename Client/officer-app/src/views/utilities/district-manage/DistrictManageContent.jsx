import { Grid } from '@mui/material';
import { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import DistrictList from './district/DistrictList';
import AddModal from './models/AddModal';
import DeleteModal from './models/DeleteModal';
import EditModal from './models/EditModal';
import WardList from './ward/WardList';

const DistrictManageContent = () => {
  const [triggleList, setTriggleList] = useState(false);

  const [openAdd, setOpenAdd] = useState({
    districtId: '',
    open: false,
    type: '',
  });

  const [openEdit, setOpenEdit] = useState({
    id: '',
    districtId: '',
    open: false,
    label: '',
    type: '',
  });

  const [openDelete, setOpenDelete] = useState({
    id: '',
    open: false,
    type: '',
  });

  const handleAddOpen = (type, id) => {
    setOpenAdd({
      districtId: id,
      open: true,
      type: type,
    });
  };

  const handleAddClose = () => {
    setOpenAdd({
      districtId: '',
      open: false,
      type: '',
    });
  };

  const handleEditOpen = (id, label, type, districtId) => {
    setOpenEdit({
      id: id,
      districtId: districtId,
      open: true,
      label: label,
      type: type,
    });
  };

  const handleEditClose = () => {
    setOpenEdit({
      id: '',
      districtId: '',
      open: false,
      label: '',
      type: '',
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

  const handleTriggleList = () => {
    setTriggleList(!triggleList);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={6}>
        <MainCard>
          <DistrictList
            triggleList={triggleList}
            openAddModel={handleAddOpen}
            openEditModel={handleEditOpen}
            openDeleteModel={handleDeleteOpen}
          />
        </MainCard>
      </Grid>
      <Grid item xs={12} lg={6}>
        <MainCard>
          <WardList
            triggleList={triggleList}
            openAddModel={handleAddOpen}
            openEditModel={handleEditOpen}
            openDeleteModel={handleDeleteOpen}
          />
        </MainCard>
      </Grid>
      <AddModal
        open={openAdd.open}
        handleAddClose={handleAddClose}
        type={openAdd.type}
        districtId={openAdd.districtId}
        handleTriggleList={handleTriggleList}
      />
      <EditModal
        open={openEdit.open}
        handleEditClose={handleEditClose}
        type={openEdit.type}
        districtId={openEdit.districtId}
        id={openEdit.id}
        label={openEdit.label}
        handleTriggleList={handleTriggleList}
      />
      <DeleteModal
        open={openDelete.open}
        handleDeleteClose={handleDeleteClose}
        type={openDelete.type}
        id={openDelete.id}
        handleTriggleList={handleTriggleList}
      />
    </Grid>
  );
};

export default DistrictManageContent;
