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
            status: status == 'TODO' ? 'WAITING' : status == 'WAITING' ? 'PROGRESSING' : 'COMPLETE'
        }, null, null, (data) => {
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
                <img src={item?.status == "TODO" ? "https://thumbs.dreamstime.com/b/payment-icon-flat-style-payment-icon-flat-style-hand-holding-money-yellow-background-circle-124180489.jpg" : item?.status == "WAITING" ? "https://image.flaticon.com/icons/png/512/2722/2722167.png"
                    : item?.status == "PROGRESSING" ? "https://image.pngaaa.com/73/350073-middle.png"
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoabJpUUuz5GjRXaCtlTq2u9DIK8joOyR2MA&usqp=CAU"} className="card__image"></img>
                <h2 className="card__title">{item?.userPhone}</h2>
                {item?.arrayFoodName.map((element, index) => {
                    if (element !== ' ') {
                        return <p key={index} className="card__description">{element}</p>
                    }
                })}
            </div>
            <button disabled={item?.status == "COMPLETE"} className={item?.status == "COMPLETE" ? "card__btn__enable" : "card__btn"}
                onClick={() => handleClick(item?.orderId, item?.status)}>
                {item?.status == "TODO" ? item?.total + " VNĐ" : item?.status == "WAITING" ? "Waiting -> Progressing" :
                    item?.status == "PROGRESSING" ? "Progressing -> Complete" : "Completed"}
            </button>
        </div>
    )
}

export default CardItem;