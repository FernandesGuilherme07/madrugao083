
import Lottie from 'react-lottie';
import deliveryDnimation from "./deliveryAnimation.json"
import { observer } from 'mobx-react-lite';

type Props = {
    isStopped: boolean;
    isPaused: boolean;
}

export const LoadingDelivery = observer(({isStopped, isPaused}: Props) => {

    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: deliveryDnimation,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };

    return <div className='loading'>
       <Lottie options={defaultOptions}
              height={400}
              width={400}
              isStopped={isStopped}
              isPaused={isPaused}/>
    </div>
})