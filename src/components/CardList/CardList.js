import React, { useEffect, useState } from 'react';
import actions, { getActionSuccess } from '../../redux/actions';
import { getData } from '../../utils/callApi';
import CardItem from '../CardItem/CardItem';
import { useDispatch, useSelector } from 'react-redux';
import './CardList.css'
const CardList = ({ status }) => {
    const dispatch = useDispatch();
    const getOrderReducer = useSelector((state) => state.getOrderReducer);
    console.log('render')
    useEffect(() => {
        getData('order', {
            status: status.toUpperCase(),
            key: 1234
        }, (data) => {
            dispatch({
                type: getActionSuccess(actions.GET_ORDER),
                data: data
            })
        });

        //value of state is used here therefore must be passed as a dependency
    }, [status])
    return (
        <div className="wrapper">
            {getOrderReducer.data?.map((item, index) => <CardItem key={index} item={item} />)}
        </div>
    )
}

export default CardList;