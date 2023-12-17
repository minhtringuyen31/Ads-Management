import { Grid, Typography } from '@mui/material';
import {
  GoogleMap,
  Marker,
  Polyline,
  useJsApiLoader,
} from '@react-google-maps/api';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { gridSpacing } from 'store/constant';
import MapContext from 'store/dashboard/map-context';
import MainCard from 'ui-component/cards/MainCard';

const MapBox = (props) => {
  const mapCtx = useContext(MapContext);

  const data = [
    [106.6814074, 10.7655393],
    [106.6816127, 10.7654858],
    [106.6820697, 10.764324],
    [106.6833177, 10.7611911],
    [106.6839847, 10.7594831],
    [106.6852056, 10.7564511],
    [106.6854964, 10.7558466],
    [106.6857407, 10.7555201],
    [106.6861537, 10.7550061],
    [106.6862846, 10.754823],
    [106.6863816, 10.7546826],
    [106.6864864, 10.7545082],
    [106.6865531, 10.7543875],
    [106.6866224, 10.754253],
    [106.6866884, 10.7541102],
    [106.6867502, 10.7539664],
    [106.686802, 10.7538337],
    [106.6868475, 10.7537119],
    [106.6869967, 10.7532468],
    [106.6878741, 10.7541309],
    [106.6890914, 10.7553575],
    [106.6904469, 10.7565556],
    [106.6913135, 10.7573215],
    [106.6918549, 10.7577288],
    [106.6922899, 10.7580156],
    [106.6926632, 10.7582833],
    [106.6953006, 10.7598331],
    [106.6958792, 10.7603001],
    [106.6963877, 10.7608836],
    [106.6969099, 10.7615755],
    [106.6970706, 10.7617884],
    [106.6972244, 10.7620035],
    [106.6979731, 10.7630508],
    [106.697996, 10.7630828],
    [106.6985136, 10.7635987],
    [106.6991821, 10.7640546],
    [106.6998327, 10.7643925],
    [106.7000133, 10.7644863],
    [106.7003419, 10.7646921],
    [106.7009309, 10.7650611],
    [106.7013079, 10.7653316],
    [106.7014421, 10.7654864],
    [106.7014694, 10.765518],
    [106.7020213, 10.7664016],
    [106.7024737, 10.7670405],
    [106.702854, 10.76748],
    [106.7032405, 10.767757],
    [106.7035406, 10.7679427],
    [106.7039172, 10.768133],
    [106.7043784, 10.7683295],
    [106.7051741, 10.7687464],
    [106.7064395, 10.7690846],
    [106.7083887, 10.7694189],
    [106.7081041, 10.7706501],
    [106.7079952, 10.771889],
    [106.7079956, 10.7729456],
    [106.7080516, 10.7742237],
    [106.7081684, 10.7754673],
    [106.7084479, 10.7769206],
    [106.7088877, 10.7783879],
    [106.7093961, 10.7796504],
    [106.7101249, 10.7810494],
    [106.7109907, 10.7824209],
    [106.7129581, 10.7842144],
    [106.7149636, 10.7856262],
    [106.7135146, 10.7871179],
    [106.7129467, 10.7874978],
    [106.7123762, 10.7876225],
    [106.7118759, 10.7877139],
    [106.7113755, 10.787694],
    [106.7104274, 10.78756],
    [106.7096844, 10.787484],
    [106.7092099, 10.7875365],
    [106.7089703, 10.7876077],
    [106.708727, 10.7877518],
    [106.708266, 10.7881485],
    [106.7079512, 10.7885031],
    [106.7077387, 10.7887963],
    [106.707618, 10.7890035],
    [106.7075247, 10.7892194],
    [106.707287, 10.7900121],
    [106.7069502, 10.7909776],
    [106.7068481, 10.7911877],
    [106.7067238, 10.7913608],
    [106.7065674, 10.7915009],
    [106.7063725, 10.7916519],
    [106.706107, 10.7918405],
    [106.7058508, 10.791992],
    [106.7055456, 10.7921198],
    [106.7049052, 10.7923393],
    [106.704088, 10.7925643],
    [106.7032122, 10.7927802],
    [106.7023483, 10.7929778],
    [106.7014587, 10.793154],
    [106.7004888, 10.7933411],
    [106.6998536, 10.7934671],
    [106.6994158, 10.7935269],
    [106.6990041, 10.7935623],
    [106.6978741, 10.7936035],
    [106.697547, 10.793633],
    [106.6970529, 10.7936647],
    [106.6967705, 10.793655],
    [106.6959952, 10.7935123],
    [106.695646, 10.7934743],
    [106.69522, 10.7934345],
    [106.6950206, 10.7934546],
    [106.6948515, 10.7935112],
    [106.6946965, 10.7936121],
    [106.6946043, 10.7937444],
    [106.6945432, 10.7939072],
    [106.694543, 10.7941361],
    [106.6945489, 10.7943478],
    [106.6945368, 10.7945495],
    [106.694505, 10.7946929],
    [106.6944483, 10.794811],
    [106.6943564, 10.7948981],
    [106.6942276, 10.7949547],
    [106.6940367, 10.7949753],
    [106.6937304, 10.7949633],
    [106.6929253, 10.794839],
    [106.6927172, 10.794847],
    [106.6925297, 10.7949066],
    [106.6923324, 10.7950235],
    [106.691528, 10.7955806],
    [106.6912865, 10.795706],
    [106.6910467, 10.7957646],
    [106.6908006, 10.7957928],
    [106.6905383, 10.7957864],
    [106.6893887, 10.7956248],
    [106.6890853, 10.7955669],
    [106.6887751, 10.7954689],
    [106.6877807, 10.7949321],
    [106.6875889, 10.7948706],
    [106.6873877, 10.7948627],
    [106.687202, 10.7949107],
    [106.6870605, 10.7949901],
    [106.6869427, 10.7951322],
    [106.6868504, 10.7952926],
    [106.6865603, 10.7959327],
    [106.6862439, 10.7965729],
    [106.6861233, 10.7967384],
    [106.6859486, 10.7968624],
    [106.6857755, 10.7969297],
    [106.6856013, 10.7969493],
    [106.685433, 10.7969315],
    [106.6852732, 10.7968688],
    [106.6851077, 10.7967511],
    [106.6849599, 10.7965626],
    [106.684886, 10.7963733],
    [106.6848646, 10.7961678],
    [106.684874, 10.7959517],
    [106.6850197, 10.794876],
    [106.6850667, 10.7946235],
    [106.6851211, 10.7944282],
    [106.6852103, 10.7942599],
    [106.685342, 10.7941097],
    [106.6860434, 10.7935205],
    [106.6862255, 10.7933609],
    [106.6863497, 10.7932013],
    [106.6863946, 10.7930891],
    [106.6863951, 10.7929757],
    [106.6863607, 10.79284],
    [106.6862779, 10.792689],
    [106.6861391, 10.7924956],
    [106.688343, 10.7907571],
    [106.6887139, 10.7904614],
    [106.6919813, 10.7878903],
    [106.6980689, 10.7828692],
    [106.6978265, 10.7826343],
    [106.6969534, 10.7817113],
    [106.6961332, 10.7808307],
    [106.6958597, 10.7805286],
    [106.6949544, 10.7795562],
    [106.6930056, 10.7774171],
    [106.6917156, 10.7760091],
    [106.6916489, 10.775968],
    [106.6894253, 10.7736121],
    [106.6872118, 10.7712513],
    [106.6850096, 10.7689294],
    [106.6844015, 10.7682771],
    [106.6843154, 10.7682012],
    [106.6818143, 10.7658002],
    [106.6815467, 10.765666],
    [106.6814831, 10.7656303],
    [106.6814074, 10.7655393],
  ];

  const path = data.map((coord) => ({ lat: coord[1], lng: coord[0] }));

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyA98VCnr7mnpaKlZcq0RN6JoWlz1PmdKV8',
    libraries: ['places'],
  });

  const handleOpenLocationDetailClick = (id) => {
    mapCtx.setLocationDetail(id);
  };

  const setCenterLocation = () => {
    let latitude = 0;
    let longtitude = 0;

    props.data.locations.forEach((item, index) => {
      latitude += item.latitude;
      longtitude += item.longtitude;
    });

    mapCtx.setZoom({
      lat: latitude / props.data.locations.length,
      lng: longtitude / props.data.locations.length,
      zoom: 15,
    });
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <MainCard>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Grid container alignItems='center' justifyContent='space-between'>
            <Grid item>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant='h3'>Bản đồ</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            borderRadius: '20px',
          }}
        >
          <div style={{ width: '100%', height: '70vh' }}>
            <GoogleMap
              center={{ lat: mapCtx.location.lat, lng: mapCtx.location.lng }}
              zoom={mapCtx.location.zoom}
              mapContainerStyle={{ width: '100%', height: '100%' }}
              options={{
                zoomControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
              }}
              onLoad={setCenterLocation}
            >
              <Polyline
                path={path}
                options={{
                  strokeColor: '#FF0000 ',
                  strokeOpacity: 1.0,
                  strokeWeight: 2,
                }}
              />
              {props.data.locations.map((location) => (
                <Marker
                  key={location.id}
                  position={{
                    lat: location.latitude,
                    lng: location.longtitude,
                  }}
                  icon={{
                    path: window.google.maps.SymbolPath.CIRCLE,
                    scale: 12,
                    fillColor: `${location.isSolvedAll ? 'blue' : 'red'}`,
                    fillOpacity: 1,
                    strokeWeight: 0,
                  }}
                  label={{
                    text: 'QC',
                    color: 'white',
                  }}
                  onClick={() => handleOpenLocationDetailClick(location.id)}
                />
              ))}
            </GoogleMap>
          </div>
        </Grid>
      </Grid>
    </MainCard>
  );
};

MapBox.propTypes = {
  data: PropTypes.shape({
    locations: PropTypes.arrayOf(
      PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number,
        zoom: PropTypes.number,
      })
    ),
  }),
  togglePosition: PropTypes.object,
  onOpenDetail: PropTypes.func,
};

export default MapBox;
