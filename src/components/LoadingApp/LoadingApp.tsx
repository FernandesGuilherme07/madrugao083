
import Lottie from 'react-lottie';
import LoadingAnimation from "./LoadingAnimation.json"
import { observer } from 'mobx-react-lite';

type Props = {
    isStopped: boolean;
    isPaused: boolean;
}

export const LoadingApp = observer(({isStopped, isPaused}: Props) => {

    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: LoadingAnimation,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };

    return <div style={{zIndex: 999}} className='loading'>
       <Lottie options={defaultOptions}
              height={400}
              width={400}
              isStopped={isStopped}
              isPaused={isPaused}/>
    </div>
})