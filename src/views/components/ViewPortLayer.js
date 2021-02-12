
import styled from '@emotion/styled';

const ViewPortLayer = styled('div')(({ theme, zIndex }) => ({
    zIndex,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    backgroundColor: theme.bodyBgColor // #E6E6E6
}));

export default ViewPortLayer;