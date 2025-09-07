
import TestSimple from '../views/test/SimpleTest';
import BananaTest from '../views/test/BananaTest';
import SampleImageTest from '../views/test/SampleImageTest';
import BananaUploadTest from '../views/test/BananaUploadTest';
import ImageCompareTest from '../views/test/ImageCompareTest';
import NanoMechRevealerTest from '../views/test/NanoMechRevealerTest';
import SampleSelectTest from '../views/test/SampleSelectTest';

const route = {
    path: '/',
    children: [
        { path: 'simple', element: <TestSimple /> },
        { path: 'mech-revealer', element: <NanoMechRevealerTest /> },
        { path: 'image-compare', element: <ImageCompareTest /> },
        { path: 'sample-select', element: <SampleSelectTest /> },
        { path: 'banana', element: <BananaTest /> },
        { path: 'sample-image', element: <SampleImageTest /> },
        { path: 'banana-upload', element: <BananaUploadTest /> },
    ]
}

export default route;