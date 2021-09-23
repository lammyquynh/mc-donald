import './CardItem.css'
import { getData, putData } from '../../utils/callApi';
import actions, { getActionSuccess } from '../../redux/actions';
import { useDispatch } from 'react-redux';

const CardItem = ({ item }) => {
    const dispatch = useDispatch();
    const handleClick = (orderid, status) => {
        putData('order', {
            key: 1234,
            orderId: orderid,
            status: status == 'WAITING' ? 'PROGRESSING' : 'COMPLETE'
        }, null, null, (data) => {
            console.log('ataa', data);
            if (data.success = 'true')
                getData('order', {
                    status: status.toUpperCase(),
                    key: 1234
                }, (data) => {
                    dispatch({
                        type: getActionSuccess(actions.GET_ORDER),
                        data: data
                    })
                });
        })
    }
    return (
        <div className="card">
            <div className="card__body">
                <img src={item?.status == "WAITING" ? "https://image.flaticon.com/icons/png/512/2722/2722167.png"
                    : item?.status == "PROGRESSING" ? "https://image.pngaaa.com/73/350073-middle.png"
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoabJpUUuz5GjRXaCtlTq2u9DIK8joOyR2MA&usqp=CAU"} className="card__image"></img>
                <h2 className="card__title">{item?.userPhone}</h2>
                <p className="card__description">{item?.foodName}</p>
            </div>
            <button disabled={item?.status == "COMPLETE"} className={item?.status == "COMPLETE" ? "card__btn__enable" : "card__btn"}
                onClick={() => handleClick(item?.orderId, item?.status)}>
                {item?.status == "WAITING" ? "Waiting -> Progressing" :
                    item?.status == "PROGRESSING" ? "Progressing -> Complete" : "Completed"}
            </button>
        </div>
    )
}

export default CardItem;