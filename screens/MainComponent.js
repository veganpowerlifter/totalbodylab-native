import {useState} from 'react';
import { COACHES } from '../shared/coaches';
import DirectoryScreen from  './DirectoryScreen';

const Main = () => {
    const [coaches, setCoaches] = useState(COACHES);

    return <DirectoryScreen coaches={coaches} />;
}

export default Main;
