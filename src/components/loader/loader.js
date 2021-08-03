import { Player } from '@lottiefiles/react-lottie-player';
import loader from '../../lotties/loader';

export const Loader = () => {

    return(
        <div className="loader-container">
            <Player autoplay loop src={loader} style={{ height: '300px', width: '300px' }}></Player>
        </div>
    )
}