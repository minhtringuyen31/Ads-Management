import PropTypes from 'prop-types';
import { useCallback, useMemo, useReducer } from 'react';
import DistrictContext from './district-context';

const defaultDistrictState = {
  districtId: null,
  districtName: null,
};

const districtReducer = (state, action) => {
  switch (action.type) {
    case 'SELECT':
      return {
        districtId: action.data.id,
        districtName: action.data.name,
      };
    case 'REMOVE':
      return {
        districtId: null,
        districtName: null,
      };
    default:
      return defaultDistrictState;
  }
};

const DistrictProvider = (props) => {
  const [districtState, dispatchDistrictAction] = useReducer(
    districtReducer,
    defaultDistrictState
  );

  const setDistrictIdData = useCallback(
    (data) => {
      dispatchDistrictAction({ type: 'SELECT', data: data });
    },
    [dispatchDistrictAction]
  );

  const removeDistrictIdData = useCallback(() => {
    dispatchDistrictAction({ type: 'REMOVE' });
  }, [dispatchDistrictAction]);

  const districtContextValue = useMemo(
    () => ({
      districtId: districtState.districtId,
      districtName: districtState.districtName,
      setDistrictId: setDistrictIdData,
      removeDistrictId: removeDistrictIdData,
    }),
    [
      districtState.districtId,
      districtState.districtName,
      setDistrictIdData,
      removeDistrictIdData,
    ]
  );

  return (
    <DistrictContext.Provider value={districtContextValue}>
      {props.children}
    </DistrictContext.Provider>
  );
};

DistrictProvider.propTypes = {
  children: PropTypes.node,
};

export default DistrictProvider;
