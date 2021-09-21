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
                <img src="https://mcdonalds.vn/uploads/2018/food/rice/MEAL_chickrice.png" className="card__image"></img>
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