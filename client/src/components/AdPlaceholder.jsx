import bannerAd from '../../../assets/adbanner.jpg';


const AdPlaceholder = ({
  size = '728x90',
  label = 'Banner Ad',
  }) => {
  return (
    <div style={{ margin: '20px 0' }}>
      <img
        src={bannerAd}
        alt={label}
        style={{
          width: size === '728x90' ? '728px' : '300px',
          height: size === '728x90' ? '90px' : '250px',
          objectFit: 'cover',
          borderRadius: '8px',
          display: 'block',
          margin: '0 auto',
        }}
      />
    </div>
  );
};

export default AdPlaceholder;
