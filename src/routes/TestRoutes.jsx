
import TestSimple from '../views/test/SimpleTest';
import BananaTest from '../views/test/BananaTest';
import SampleImageTest from '../views/test/SampleImageTest';
import BananaUploadTest from '../views/test/BananaUploadTest';

const route = {
    path: '/',
    children: [
        { path: 'simple', element: <TestSimple /> },
        { path: 'banana', element: <BananaTest /> },
        { path: 'sample-image', element: <SampleImageTest /> },
        { path: 'banana-upload', element: <BananaUploadTest /> },
    ]
}

export default route;